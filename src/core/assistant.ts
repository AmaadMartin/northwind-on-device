/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * The Northwind shopping assistant.
 *
 * Natural language decides *what* to do. A human decides *whether it runs*.
 *
 * Read-only tools execute normally, because there is nothing to undo. Write
 * tools never execute: `ConfirmWritesPlugin` intercepts them in
 * `beforeToolCallback`, records the call as a proposal, and hands ADK an
 * "awaiting confirmation" result so the agent can finish its turn and say what
 * it prepared. The application performs the write only after the shopper clicks.
 */

import { LlmAgent, FunctionTool, Runner, InMemorySessionService } from '@google/adk';
import type { BaseLlm } from '@google/adk';
import { ConfirmWritesPlugin, type Proposal } from './confirm-plugin.js';
import { ASSISTANT_SYSTEM } from './prompts.js';
import type { TabSearchPipeline } from './pipeline.js';
import { productBySku } from './catalog.js';
import type { Product } from './types.js';

const APP_NAME = 'northwind-assistant';
const USER_ID = 'shopper';

/** Tools that change something. These are proposed, never executed. */
export const WRITE_TOOLS = new Set(['addToBasket']);

export interface AssistantDeps {
  model: BaseLlm;
  pipeline: TabSearchPipeline;
  /** Performs the write once the shopper confirms. */
  addToBasket: (sku: string, quantity: number) => void;
  maxLlmCalls?: number;
}

export interface AssistantTurn {
  text: string;
  toolCalls: Array<{ name: string; args: Record<string, unknown> }>;
  /** Prepared writes awaiting a click. */
  proposals: Proposal[];
  /** Products the assistant found on this turn, for the UI to render. */
  found: Product[];
}

export function createAssistant(deps: AssistantDeps) {
  const plugin = new ConfirmWritesPlugin(WRITE_TOOLS);
  const toolCalls: AssistantTurn['toolCalls'] = [];
  let found: Product[] = [];

  const searchProducts = new FunctionTool({
    name: 'searchProducts',
    description:
      'Search the Northwind catalogue by what the shopper is trying to do. '
      + 'Use this whenever they describe a problem or a product. Returns SKUs.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: "The shopper's words." },
      },
      required: ['query'],
    } as never,
    execute: async (args: { query: string }) => {
      toolCalls.push({ name: 'searchProducts', args });
      const results: Product[] = [];
      for await (const ev of deps.pipeline.search(args.query)) {
        if (ev.type === 'done') {
          for (const r of ev.results.slice(0, 5)) {
            const p = productBySku(r.doc.id);
            if (p) results.push(p);
          }
        }
      }
      found = results;
      // Only what the model needs to act. Descriptions would blow the context
      // window for no benefit.
      return JSON.stringify({
        matches: results.map((p) => ({
          sku: p.sku,
          name: p.name,
          price: (p.priceCents / 100).toFixed(2),
        })),
      });
    },
  });

  const checkAisle = new FunctionTool({
    name: 'checkAisle',
    description: 'Say which aisle a product is in. Needs a SKU from searchProducts.',
    parameters: {
      type: 'object',
      properties: { sku: { type: 'string' } },
      required: ['sku'],
    } as never,
    execute: async (args: { sku: string }) => {
      toolCalls.push({ name: 'checkAisle', args });
      const p = productBySku(args.sku);
      return JSON.stringify(p ? { aisle: p.aisle } : { error: 'unknown sku' });
    },
  });

  const addToBasket = new FunctionTool({
    name: 'addToBasket',
    description:
      'Prepare to add a product to the basket. Needs a SKU from searchProducts. '
      + 'The shopper must confirm before this takes effect.',
    parameters: {
      type: 'object',
      properties: {
        sku: { type: 'string' },
        quantity: { type: 'integer' },
      },
      required: ['sku', 'quantity'],
    } as never,
    // Never reached while the plugin is registered. Kept correct anyway, so the
    // tool is still valid if someone removes the plugin.
    execute: async (args: { sku: string; quantity: number }) => {
      deps.addToBasket(args.sku, args.quantity);
      return JSON.stringify({ added: args.sku });
    },
  });

  const agent = new LlmAgent({
    name: 'northwind_assistant',
    model: deps.model,
    instruction: ASSISTANT_SYSTEM,
    tools: [searchProducts, checkAisle, addToBasket],
  });

  const sessions = new InMemorySessionService();
  const runner = new Runner({
    appName: APP_NAME,
    agent,
    sessionService: sessions,
    plugins: [plugin],
  });
  let sessionId: string | undefined;

  return {
    plugin,

    async send(message: string, signal?: AbortSignal): Promise<AssistantTurn> {
      toolCalls.length = 0;
      found = [];
      if (!sessionId) {
        const s = await sessions.createSession({ appName: APP_NAME, userId: USER_ID });
        sessionId = s.id;
      }

      let text = '';
      let hitLimit = false;
      try {
        for await (const event of runner.runAsync({
          userId: USER_ID,
          sessionId,
          newMessage: { role: 'user', parts: [{ text: message }] },
          runConfig: {
            // ADK defaults to 500. That is reasonable for a fast cloud model and
            // wrong for on-device inference, where a small model that fails to
            // notice it is finished will loop for minutes.
            maxLlmCalls: deps.maxLlmCalls ?? 8,
            ...(signal ? { signal } : {}),
          } as never,
        })) {
          if (event.errorMessage) throw new Error(event.errorMessage);
          if (event.author === 'northwind_assistant') {
            const t = (event.content?.parts ?? []).map((p) => p.text ?? '').join('');
            if (t) text = t;
          }
        }
      } catch (err) {
        if (!/max number of llm calls/i.test((err as Error).message ?? '')) throw err;
        hitLimit = true;
      }

      const proposals = plugin.take();
      if (!text) {
        text = hitLimit
          ? 'I stopped after a few steps. Here is what I found.'
          : proposals.length
            ? 'Ready when you are.'
            : 'I could not work out what you need.';
      }

      return { text: text.trim(), toolCalls: [...toolCalls], proposals, found };
    },

    /** Called when the shopper clicks a confirmation button. */
    confirm(proposal: Proposal): boolean {
      if (proposal.tool !== 'addToBasket') return false;
      const sku = String(proposal.args.sku ?? '');
      const qty = Number(proposal.args.quantity ?? 1);
      if (!productBySku(sku)) return false;
      deps.addToBasket(sku, Number.isFinite(qty) && qty > 0 ? Math.min(qty, 20) : 1);
      return true;
    },

    reset() {
      sessionId = undefined;
    },
  };
}
