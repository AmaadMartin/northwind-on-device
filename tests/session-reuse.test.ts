/**
 * Proves the warm-base-session optimisation: a fan-out over N candidates should
 * cost a small constant number of LanguageModel.create() calls, not one per
 * product. create() is the expensive call on device; prompt() is not.
 */
import { ChromePromptApiLlm } from '../src/model/chrome-prompt-llm.js';
import { FakeLanguageModelSession, configureFake } from '../src/model/fake-language-model.js';
import { TabSearchPipeline } from '../src/core/pipeline.js';
import { PRODUCTS } from '../src/core/catalog.js';
import { productToDoc } from '../src/core/types.js';

configureFake({ latencyMs: 0 });

let creates = 0;
let clones = 0;

class CountingSession extends FakeLanguageModelSession {
  override async clone(o: any = {}) {
    clones++;
    const s = new CountingSession((this as any).createOptions, {});
    return s as any;
  }
}
const CountingLanguageModel = {
  async availability() { return 'available' as Availability; },
  async create(options: any = {}) { creates++; return new CountingSession(options, {}); },
} as unknown as typeof LanguageModel;

import { stripAdkIdentityPreamble } from '../src/model/chrome-prompt-llm.js';
const model = new ChromePromptApiLlm({ languageModel: CountingLanguageModel, normalizeSystemPrompt: stripAdkIdentityPreamble });
const pipeline = new TabSearchPipeline({ model, candidateLimit: 10 });
pipeline.setDocs(PRODUCTS.map(productToDoc));

let candidates = 0;
for await (const ev of pipeline.search('the thing that stops my door slamming')) {
  if (ev.type === 'prefiltered') candidates = ev.candidates.length;
}

console.log(`candidates reranked : ${candidates}`);
console.log(`LanguageModel.create: ${creates}`);
console.log(`session.clone       : ${clones}`);

const ok = creates <= 3 && clones >= candidates;
console.log(ok
  ? `\nPASS  ${creates} session creations for ${candidates} candidates (reused via clone)`
  : `\nFAIL  expected <=3 creates and >=${candidates} clones`);
process.exit(ok ? 0 : 1);
