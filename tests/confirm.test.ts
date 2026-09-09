/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Proves the model cannot cause a side effect.
 *
 * core.test.ts checks this through the assembled assistant. This file checks the
 * mechanism directly: it registers a write tool whose `execute` body would be
 * loud if it ever ran, and asserts ADK never reaches it while the plugin is
 * installed. That is the guarantee the demo makes, so it gets its own test.
 */
import { ChromePromptApiLlm, stripAdkIdentityPreamble } from '../src/model/chrome-prompt-llm.js';
import { FakeLanguageModel, configureFake } from '../src/model/fake-language-model.js';
import { LlmAgent, FunctionTool, Runner, InMemorySessionService } from '@google/adk';
import { ConfirmWritesPlugin } from '../src/core/confirm-plugin.js';
import { WRITE_TOOLS } from '../src/core/assistant.js';

configureFake({ latencyMs: 0 });
let pass = 0, fail = 0;
const check = (n: string, c: boolean, d = '') => {
  c ? (pass++, console.log('  PASS  ' + n)) : (fail++, console.log('  FAIL  ' + n + ' -- ' + d));
};

const searched: string[] = [];
/** Anything landing here means a write escaped the plugin. */
const executed: unknown[] = [];

const searchProducts = new FunctionTool({
  name: 'searchProducts',
  description: 'Search the Northwind catalogue.',
  parameters: {
    type: 'object',
    properties: { query: { type: 'string' } },
    required: ['query'],
  } as never,
  execute: async (args: { query: string }) => {
    searched.push(args.query);
    return JSON.stringify({ matches: [{ sku: 'NW-1013', name: 'Hinge Pin Doorstop' }] });
  },
});

const addToBasket = new FunctionTool({
  name: 'addToBasket',
  description: 'Prepare to add a product to the basket.',
  parameters: {
    type: 'object',
    properties: { sku: { type: 'string' }, quantity: { type: 'integer' } },
    required: ['sku', 'quantity'],
  } as never,
  execute: async (args: unknown) => {
    executed.push(args);
    return JSON.stringify({ ok: true });
  },
});

const plugin = new ConfirmWritesPlugin(WRITE_TOOLS);
const model = new ChromePromptApiLlm({
  languageModel: FakeLanguageModel,
  normalizeSystemPrompt: stripAdkIdentityPreamble,
});
const agent = new LlmAgent({
  name: 'northwind_assistant',
  model,
  instruction: 'You help shoppers. Search first, then act.',
  tools: [searchProducts, addToBasket],
});
const sessions = new InMemorySessionService();
const runner = new Runner({ appName: 'nw', agent, sessionService: sessions, plugins: [plugin] });
const s = await sessions.createSession({ appName: 'nw', userId: 'u' });

for await (const ev of runner.runAsync({
  userId: 'u',
  sessionId: s.id,
  newMessage: { role: 'user', parts: [{ text: 'add the door slamming thing to my basket' }] },
  runConfig: { maxLlmCalls: 8 } as never,
})) {
  if (ev.errorMessage) throw new Error(ev.errorMessage);
}

console.log('\npropose, do not execute');
check('addToBasket is registered as a write tool', WRITE_TOOLS.has('addToBasket'));
check('the read-only tool ran', searched.length > 0, JSON.stringify(searched));
check('the write tool body never ran', executed.length === 0, JSON.stringify(executed));
check('the write was captured as a proposal', plugin.proposals.length === 1,
  JSON.stringify(plugin.proposals));
check('the proposal records the tool and args',
  plugin.proposals[0]?.tool === 'addToBasket' && !!plugin.proposals[0]?.args?.sku,
  JSON.stringify(plugin.proposals[0]));

// The shopper clicks the button: the application calls the tool directly.
const p = plugin.take()[0];
await addToBasket.runAsync({ args: p.args, toolContext: undefined as never });
check('confirming actually performs the write', executed.length === 1);
check('taking the proposals clears them', plugin.proposals.length === 0);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
