/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Catching personal information before it leaves the browser.
 *
 * This is the one part of the demo a server cannot do. To check text for
 * personal information in the cloud, you must first send the personal
 * information to the cloud. The check has to happen where the text is.
 *
 * The design is deliberately hybrid:
 *
 *   deterministic detectors  ->  card numbers, emails, phone numbers
 *   the model                ->  names, street addresses, anything unstructured
 *
 * Regexes are exact, free and testable. They run whether or not a model is
 * available, so the card number is always caught. The model is used only for
 * what a regex cannot describe, and everything it returns is verified against
 * the source text before it is shown.
 */

import { LlmAgent, Runner, InMemorySessionService } from '@google/adk';
import type { BaseLlm } from '@google/adk';
import type { Schema } from '@google/genai';
import { PII_SCHEMA, PII_SYSTEM, piiUserPrompt } from './prompts.js';
import { safeJson } from './pipeline.js';

export type PiiKind = 'name' | 'address' | 'card' | 'email' | 'phone' | 'other';

export interface PiiFinding {
  kind: PiiKind;
  /** Verbatim text from the input. */
  text: string;
  start: number;
  end: number;
  /** Which half of the hybrid found it. */
  source: 'rule' | 'model';
}

export interface PiiResult {
  findings: PiiFinding[];
  ruleCount: number;
  modelCount: number;
  /** True when the model was unavailable and only the rules ran. */
  rulesOnly: boolean;
  ms: number;
}

/* --------------------------- deterministic --------------------------- */

const EMAIL = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const PHONE = /\b(?:\+\d{1,3}[ -]?)?(?:\(?\d{3,5}\)?[ -]?)\d{3,4}[ -]?\d{3,4}\b/g;
const CARDISH = /\b(?:\d[ -]?){13,19}\b/g;

/** Luhn check. Keeps order numbers and long digit strings out of the results. */
export function isLuhnValid(digits: string): boolean {
  const d = digits.replace(/\D/g, '');
  if (d.length < 13 || d.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = d.charCodeAt(i) - 48;
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

/** Runs the rule-based detectors. Never needs a model. */
export function detectWithRules(input: string): PiiFinding[] {
  const out: PiiFinding[] = [];
  const push = (kind: PiiKind, m: RegExpExecArray) => {
    out.push({
      kind,
      text: m[0],
      start: m.index,
      end: m.index + m[0].length,
      source: 'rule',
    });
  };

  for (const m of input.matchAll(EMAIL)) push('email', m as RegExpExecArray);
  for (const m of input.matchAll(CARDISH)) {
    if (isLuhnValid(m[0])) push('card', m as RegExpExecArray);
  }
  for (const m of input.matchAll(PHONE)) {
    // A card number already claimed these digits.
    const overlaps = out.some((f) => m.index! < f.end && m.index! + m[0].length > f.start);
    if (!overlaps) push('phone', m as RegExpExecArray);
  }
  return out.sort((a, b) => a.start - b.start);
}

/* ------------------------------- hybrid ------------------------------ */

export interface PiiGuardOptions {
  model: BaseLlm;
  /** Skips the model entirely. Used to demonstrate the deterministic floor. */
  rulesOnly?: boolean;
}

export class PiiGuard {
  private readonly sessions = new InMemorySessionService();

  constructor(private readonly opts: PiiGuardOptions) {}

  async scan(input: string, signal?: AbortSignal): Promise<PiiResult> {
    const started = performance.now();
    const rules = detectWithRules(input);

    if (this.opts.rulesOnly || !input.trim()) {
      return {
        findings: rules,
        ruleCount: rules.length,
        modelCount: 0,
        rulesOnly: true,
        ms: performance.now() - started,
      };
    }

    let modelFindings: PiiFinding[] = [];
    let rulesOnly = false;
    try {
      modelFindings = await this.askModel(input, signal);
    } catch {
      // The guard must never fail open on the deterministic half.
      rulesOnly = true;
    }

    const merged = mergeFindings(rules, modelFindings);
    return {
      findings: merged,
      ruleCount: rules.length,
      modelCount: merged.length - rules.length,
      rulesOnly,
      ms: performance.now() - started,
    };
  }

  private async askModel(input: string, signal?: AbortSignal): Promise<PiiFinding[]> {
    const agent = new LlmAgent({
      name: 'pii_guard',
      model: this.opts.model,
      instruction: PII_SYSTEM,
      outputSchema: PII_SCHEMA as unknown as Schema,
    });
    const runner = new Runner({
      appName: 'northwind-pii',
      agent,
      sessionService: this.sessions,
    });
    const session = await this.sessions.createSession({
      appName: 'northwind-pii',
      userId: 'shopper',
    });

    let raw = '';
    for await (const event of runner.runAsync({
      userId: 'shopper',
      sessionId: session.id,
      newMessage: { role: 'user', parts: [{ text: piiUserPrompt(input) }] },
      runConfig: signal ? ({ signal } as never) : undefined,
    })) {
      if (event.errorMessage) throw new Error(event.errorMessage);
      raw += (event.content?.parts ?? []).map((p) => p.text ?? '').join('');
    }

    const parsed = safeJson(raw.trim());
    const list = Array.isArray(parsed?.findings) ? parsed.findings : [];

    const out: PiiFinding[] = [];
    for (const f of list) {
      const text = typeof f?.text === 'string' ? f.text.trim() : '';
      if (!text) continue;
      // Verify the span. A model that paraphrases produces a highlight that
      // points at nothing, which is a bug the audience would see. Two lines
      // removes the whole class.
      const start = input.indexOf(text);
      if (start === -1) continue;
      const kind: PiiKind = ['name', 'address', 'card', 'email', 'phone', 'other']
        .includes(f.kind)
        ? f.kind
        : 'other';
      out.push({ kind, text, start, end: start + text.length, source: 'model' });
    }
    return out;
  }
}

/** Rules win any overlap: they are exact and the model is not. */
export function mergeFindings(rules: PiiFinding[], model: PiiFinding[]): PiiFinding[] {
  const out = [...rules];
  for (const m of model) {
    const overlaps = out.some((r) => m.start < r.end && m.end > r.start);
    if (!overlaps) out.push(m);
  }
  return out.sort((a, b) => a.start - b.start);
}
