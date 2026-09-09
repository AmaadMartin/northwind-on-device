/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Answering a question from the reviews already on the page.
 *
 * The design rule here is the important one: **cite the reviews, do not
 * summarise them.** A summary is generation, and a small model will eventually
 * write a confident sentence about a product that is not true. Instead every
 * number below is counted in code and every claim is a verbatim quote that was
 * checked against its source review.
 *
 * The funnel is the same one the product search uses, for the same reason. A
 * product with 214 reviews is 214 inference calls if you are naive about it.
 * BM25 narrows to a handful first; only those reach the model.
 */

import { LlmAgent, ParallelAgent, Runner, InMemorySessionService } from '@google/adk';
import type { BaseLlm, Event } from '@google/adk';
import type { Schema } from '@google/genai';
import { Bm25Index } from './bm25.js';
import { REVIEW_SCHEMA, REVIEW_SYSTEM, reviewUserPrompt } from './prompts.js';
import { safeJson } from './pipeline.js';
import { reviewToDoc, type ExpandedQuery, type Review } from './types.js';

const APP_NAME = 'northwind-reviews';
const USER_ID = 'shopper';

export interface ReviewFinding {
  review: Review;
  sentiment: 'positive' | 'negative' | 'mixed';
  /** Verbatim, and verified to occur in `review.text`. */
  quote: string;
}

export interface ReviewAnswer {
  question: string;
  /** How many reviews the model was asked about. */
  examined: number;
  /** How many reviews exist in total. */
  total: number;
  findings: ReviewFinding[];
  counts: { positive: number; negative: number; mixed: number };
  ms: number;
}

export interface ReviewScanOptions {
  model: BaseLlm;
  /** How many reviews reach the model. Bounds worst-case latency. */
  candidateLimit?: number;
}

let agentSeq = 0;

export class ReviewScanner {
  private readonly index = new Bm25Index();
  private readonly sessions = new InMemorySessionService();
  private reviews: Review[] = [];

  constructor(private readonly opts: ReviewScanOptions) {}

  setReviews(reviews: Review[]) {
    this.reviews = reviews;
    this.index.rebuild(reviews.map(reviewToDoc));
  }

  /**
   * Scores the most promising reviews against the question and returns only
   * quotes that genuinely appear in their review.
   */
  async ask(question: string, signal?: AbortSignal): Promise<ReviewAnswer> {
    const started = performance.now();
    const limit = this.opts.candidateLimit ?? 10;

    // No model in this stage. The question's own words are usually the right
    // filter for reviews, because reviewers use plain language too.
    const expanded: ExpandedQuery = {
      original: question,
      keywords: [],
      intent: question,
    };
    const candidates = this.index.prefilter(expanded, limit);
    const byId = new Map(this.reviews.map((r) => [r.id, r]));

    if (!candidates.length) {
      return {
        question,
        examined: 0,
        total: this.reviews.length,
        findings: [],
        counts: { positive: 0, negative: 0, mixed: 0 },
        ms: performance.now() - started,
      };
    }

    const byAgentName = new Map<string, Review>();
    const children = candidates.map((c) => {
      const review = byId.get(c.doc.id)!;
      const name = `review_${review.id}_${agentSeq++}`;
      byAgentName.set(name, review);
      const prompt = reviewUserPrompt({
        question,
        stars: review.stars,
        text: review.text,
      });
      return new LlmAgent({
        name,
        model: this.opts.model,
        // Identical instruction across children so the adapter reuses one warm
        // session and clones it, instead of creating one per review.
        instruction: REVIEW_SYSTEM,
        includeContents: 'none',
        beforeModelCallback: ({ request }) => {
          request.contents = [{ role: 'user', parts: [{ text: prompt }] }];
          return undefined;
        },
        outputSchema: REVIEW_SCHEMA as unknown as Schema,
        outputKey: name,
      });
    });

    const fanout = new ParallelAgent({
      name: 'review_fanout',
      subAgents: children,
      description: 'Judges each candidate review independently.',
    });
    const runner = new Runner({
      appName: APP_NAME,
      agent: fanout,
      sessionService: this.sessions,
    });
    const session = await this.sessions.createSession({
      appName: APP_NAME,
      userId: USER_ID,
    });

    const findings: ReviewFinding[] = [];
    const seen = new Set<string>();

    for await (const event of runner.runAsync({
      userId: USER_ID,
      sessionId: session.id,
      newMessage: { role: 'user', parts: [{ text: 'Judge the review.' }] },
      runConfig: signal ? ({ signal } as never) : undefined,
    })) {
      const finding = this.findingFromEvent(event, byAgentName, seen);
      if (finding) findings.push(finding);
    }

    // Two reviewers writing the same sentence is not two pieces of evidence.
    const seenQuotes = new Set<string>();
    const unique = findings.filter((f) => {
      const key = f.quote.toLowerCase().replace(/\s+/g, ' ').trim();
      if (seenQuotes.has(key)) return false;
      seenQuotes.add(key);
      return true;
    });
    findings.length = 0;
    findings.push(...unique);

    const counts = { positive: 0, negative: 0, mixed: 0 };
    for (const f of findings) counts[f.sentiment]++;

    return {
      question,
      examined: candidates.length,
      total: this.reviews.length,
      findings,
      counts,
      ms: performance.now() - started,
    };
  }

  private findingFromEvent(
    event: Event,
    byAgentName: Map<string, Review>,
    seen: Set<string>,
  ): ReviewFinding | undefined {
    const name = event.author;
    if (!name || seen.has(name)) return undefined;
    const review = byAgentName.get(name);
    if (!review) return undefined;

    const text = (event.content?.parts ?? []).map((p) => p.text ?? '').join('').trim();
    if (!text) return undefined;

    const parsed = safeJson(text);
    if (!parsed) return undefined;
    seen.add(name);

    if (parsed.relevant !== true) return undefined;

    const quote = typeof parsed.quote === 'string' ? parsed.quote.trim() : '';
    // The model was told to copy the sentence verbatim. Trust nothing: if the
    // quote is not in the review, the model paraphrased or invented it, and the
    // finding is dropped rather than shown.
    if (!quote || !containsQuote(review.text, quote)) return undefined;

    const sentiment =
      parsed.sentiment === 'positive' || parsed.sentiment === 'negative'
        ? parsed.sentiment
        : 'mixed';

    return { review, sentiment, quote };
  }
}

/**
 * Whitespace-tolerant containment check.
 *
 * A model will often return a quote with different spacing or a trailing full
 * stop. That is still a faithful quote, so normalise both sides before
 * comparing rather than rejecting it.
 */
export function containsQuote(source: string, quote: string): boolean {
  const norm = (s: string) =>
    s.toLowerCase().replace(/[\s\u00a0]+/g, ' ').replace(/[.,!?;:]+$/g, '').trim();
  return norm(source).includes(norm(quote));
}
