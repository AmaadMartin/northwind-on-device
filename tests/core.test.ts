/** End-to-end checks on the Northwind core: search, reviews, PII, assistant. */
import { ChromePromptApiLlm, stripAdkIdentityPreamble } from '../src/model/chrome-prompt-llm.js';
import { FakeLanguageModel, configureFake } from '../src/model/fake-language-model.js';
import { TabSearchPipeline } from '../src/core/pipeline.js';
import { ReviewScanner, containsQuote } from '../src/core/reviews.js';
import { PiiGuard, detectWithRules, isLuhnValid } from '../src/core/pii.js';
import { createAssistant } from '../src/core/assistant.js';
import { PRODUCTS, REVIEWS, HERO_SKU, reviewsForSku, productBySku } from '../src/core/catalog.js';
import { productToDoc } from '../src/core/types.js';

let pass=0, fail=0;
const check=(n:string,c:boolean,d='')=>{c?(pass++,console.log('  PASS  '+n)):(fail++,console.log('  FAIL  '+n+(d?' -- '+d:'')));};

configureFake({ latencyMs: 0 });
const model = new ChromePromptApiLlm({ languageModel: FakeLanguageModel,
  normalizeSystemPrompt: stripAdkIdentityPreamble });

/* ---------------- product search ---------------- */
console.log('\nproduct search (the pipeline is unchanged from TabFind)');
const pipeline = new TabSearchPipeline({ model, candidateLimit: 10 });
pipeline.setDocs(PRODUCTS.map(productToDoc));
check('catalogue indexed', pipeline.indexedCount === PRODUCTS.length, `${pipeline.indexedCount}`);

const CASES: Array<[string,string]> = [
  ['the thing that stops my door slamming','Doorstop'],
  ['my tap drips even when it is off','Cartridge'],
  ['something to stop the shed door blowing open','Cabin Hook'],
  ['covers up a hole in plasterboard','Wall Repair Patch'],
  ['stops the draught under the front door','Door Sweep'],
];
for (const [q, expect] of CASES) {
  let top = '';
  for await (const ev of pipeline.search(q)) if (ev.type==='done') top = ev.results[0]?.doc.title ?? '';
  check(`"${q}"`, top.toLowerCase().includes(expect.toLowerCase()), `got: ${top || 'nothing'}`);
}

/* ---------------- review scan ---------------- */
console.log('\nreview scan (cite, do not summarise)');
const scanner = new ReviewScanner({ model, candidateLimit: 10 });
scanner.setReviews(reviewsForSku(HERO_SKU));
const ans = await scanner.ask('is this any good on concrete?');
check('total review count is real', ans.total === 214, `${ans.total}`);
check('only a handful reach the model', ans.examined <= 10, `${ans.examined}`);
check('found relevant reviews', ans.findings.length > 0, `${ans.findings.length}`);
check('every quote occurs verbatim in its review',
  ans.findings.every(f => containsQuote(f.review.text, f.quote)));
check('counts add up to findings',
  ans.counts.positive + ans.counts.negative + ans.counts.mixed === ans.findings.length);
check('a hallucinated quote would be rejected',
  !containsQuote('the drill is fine', 'it destroyed my wall'));

/* ---------------- PII guard ---------------- */
console.log('\nPII guard (rules + model, spans verified)');
check('luhn accepts a valid test card', isLuhnValid('4111 1111 1111 1111'));
check('luhn rejects an order number', !isLuhnValid('1234567890123'));
const sample = "my card 4111 1111 1111 1111 was charged twice, I'm Dana Whitfield at 42 Bridge Street, call 07700 900123 or dana@example.com";
const rules = detectWithRules(sample);
check('rules catch the card', rules.some(f=>f.kind==='card'));
check('rules catch the email', rules.some(f=>f.kind==='email'));
check('rule spans are exact', rules.every(f => sample.slice(f.start,f.end) === f.text));

const guard = new PiiGuard({ model });
const res = await guard.scan(sample);
check('hybrid finds more than rules alone', res.findings.length > rules.length,
  `${res.findings.length} vs ${rules.length}`);
check('every finding span is exact',
  res.findings.every(f => sample.slice(f.start,f.end) === f.text));
check('the model contributed a name or address',
  res.findings.some(f => f.source==='model' && (f.kind==='name'||f.kind==='address')));
const rulesOnly = await new PiiGuard({ model, rulesOnly: true }).scan(sample);
check('card is still caught with no model at all', rulesOnly.findings.some(f=>f.kind==='card'));

/* ---------------- assistant ---------------- */
console.log('\nassistant (proposes writes, never performs them)');
const basket: Array<{sku:string;qty:number}> = [];
const assistant = createAssistant({ model, pipeline,
  addToBasket: (sku, qty) => basket.push({sku, qty}) });
const turn = await assistant.send('add the thing that stops my door slamming to my basket');
check('it searched', turn.toolCalls.some(t=>t.name==='searchProducts'));
check('nothing was added yet', basket.length === 0, JSON.stringify(basket));
if (turn.proposals.length) {
  check('a write was proposed', true);
  const ok = assistant.confirm(turn.proposals[0]);
  check('confirming performs the write', ok && basket.length === 1, JSON.stringify(basket));
  check('the basket got a real SKU', !!productBySku(basket[0]?.sku ?? ''));
} else {
  check('a write was proposed', false, 'the stand-in did not reach addToBasket');
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
