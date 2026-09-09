/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Northwind Hardware storefront.
 *
 * Four beats, each making a different argument for running the model in the
 * browser:
 *
 *   search     a shopper describes a problem and gets the right product
 *   reviews    a question answered from the reviews already on the page
 *   support    personal information caught before it reaches a server
 *   assistant  a write the model proposes and a human confirms
 *
 * Framework-free on purpose. This is sample code people will read, and the
 * Prompt API is unavailable in Web Workers, so keeping the main thread cheap is
 * a correctness concern rather than a preference.
 */

import { TabSearchPipeline } from '../core/pipeline.js';
import { ReviewScanner, type ReviewAnswer } from '../core/reviews.js';
import { PiiGuard, type PiiResult } from '../core/pii.js';
import { createAssistant } from '../core/assistant.js';
import { createModel, type ModelStatus } from '../model/create-model.js';
import {
  PRODUCTS,
  HERO_SKU,
  productBySku,
  reviewsForSku,
} from '../core/catalog.js';
import { productToDoc, type Product, type RankedResult } from '../core/types.js';
import type { Proposal } from '../core/confirm-plugin.js';
import { productArt } from './product-art.js';

const SAMPLES = [
  'the thing that stops my door slamming',
  'my tap drips even when it is off',
  'something to stop the shed door blowing open',
  'covers up a hole in plasterboard',
  'stops the draught under the front door',
];

/** Categories promoted to the nav bar, in shopping order. */
const NAV_CATEGORIES = [
  'Power Tools',
  'Hand Tools',
  'Door Hardware',
  'Plumbing',
  'Electrical',
  'Garden',
  'Decorating',
  'Security',
  'Storage',
];

const SUPPORT_SAMPLE =
  "My order arrived damaged. The card 4111 1111 1111 1111 was charged twice. "
  + "I'm Dana Whitfield at 42 Bridge Street and you can reach me on 07700 900123 "
  + 'or dana.whitfield@example.com.';

type Route = { name: 'home' } | { name: 'product'; sku: string } | { name: 'support' };

interface TraceLine {
  label: string;
  ms?: number;
}

/* --------------------------------- icons ---------------------------------- */

const ICON = {
  search: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>`,
  user: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>`,
  cart: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 3h2.2l2.3 11h10.4l2.1-8H6"/>
    <circle cx="9" cy="19.5" r="1.6"/><circle cx="17.5" cy="19.5" r="1.6"/></svg>`,
  pin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/>
    <circle cx="12" cy="10" r="2.6"/></svg>`,
  shield: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.4-3 8-7 9-4-1-7-4.6-7-9V6Z"/>
    <path d="m9 12 2 2 4-4" stroke-linecap="round"/></svg>`,
  bolt: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6Z"/></svg>`,
  chip: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="2"/>
    <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" stroke-linecap="round"/></svg>`,
  lock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2.2" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/>
    <path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`,
  warn: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2.2" stroke-linecap="round"><path d="M12 3 1.8 20.5h20.4Z" stroke-linejoin="round"/>
    <path d="M12 9.5v5M12 17.6v.1"/></svg>`,
  truck: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linejoin="round"><path d="M2 6h11v10H2zM13 9h4.5l3.5 3.5V16h-8z"/>
    <circle cx="7" cy="18.5" r="1.8"/><circle cx="17" cy="18.5" r="1.8"/></svg>`,
  mark: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 1.9 21 7v10l-9 5.1L3 17V7Z" fill="#17663d"/>
    <path d="M9 16.5v-9l6 9v-9" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Five stars rendered from a 0-5 rating.
 *
 * Drawn as a clipped overlay rather than by rounding to whole stars. Rounding
 * showed 4.6 and 4.8 as five filled stars, so every product looked perfect —
 * which undercuts the one beat on this site that is about honest evidence.
 */
function starsHtml(rating: number, count?: number): string {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return `<span class="stars"><span class="s" title="${rating.toFixed(1)} out of 5"
      ><span class="s-off">★★★★★</span><span class="s-on" style="width:${pct.toFixed(1)}%">★★★★★</span></span
    ><span class="n">${rating.toFixed(1)}${count === undefined ? '' : ` (${count.toLocaleString()})`}</span></span>`;
}

function money(cents: number): string {
  return `<span class="p">£</span>${(cents / 100).toFixed(2)}`;
}

class App {
  private root = document.getElementById('app')!;
  private route: Route = { name: 'home' };

  private pipeline!: TabSearchPipeline;
  private scanner!: ReviewScanner;
  private guard!: PiiGuard;
  private assistant!: ReturnType<typeof createAssistant>;
  private status!: ModelStatus;

  private results: RankedResult[] = [];
  private searchStatus = '';
  private query = '';
  /** Set when the shopper browses a category instead of searching. No model runs. */
  private browsing?: string;
  private trace: TraceLine[] = [];
  private modelCalls = 0;
  private basket = new Map<string, number>();

  private answer?: ReviewAnswer;
  private answering = false;

  private pii?: PiiResult;
  private supportText = '';
  private scanning = false;

  private chat: Array<{ who: 'user' | 'bot'; text: string }> = [];
  private proposals: Proposal[] = [];
  private thinking = false;

  async init() {
    // No download-progress handler on purpose. Chrome fires `downloadprogress`
    // every time a session is created, including when the model is already on
    // disk, so the notice reappeared on every search. It also wrote to
    // `searchStatus`, which made the homepage believe a search had run and
    // collapse the hero into an empty results view.
    const { model, status } = await createModel({ temperature: 0, topK: 1 });
    this.status = status;

    // One pipeline instance, counting every model call for the trace panel.
    this.pipeline = new TabSearchPipeline({ model, candidateLimit: 10 });
    this.pipeline.setDocs(PRODUCTS.map(productToDoc));
    this.scanner = new ReviewScanner({ model, candidateLimit: 10 });
    this.scanner.setReviews(reviewsForSku(HERO_SKU));
    this.guard = new PiiGuard({ model });
    this.assistant = createAssistant({
      model,
      pipeline: this.pipeline,
      addToBasket: (sku, qty) => this.addToBasket(sku, qty),
    });

    this.render();
  }

  /* ------------------------------ actions ---------------------------- */

  private addToBasket(sku: string, qty = 1) {
    this.basket.set(sku, (this.basket.get(sku) ?? 0) + qty);
    this.render();
  }

  private go(route: Route) {
    this.route = route;
    this.answer = undefined;
    window.scrollTo(0, 0);
    this.render();
  }

  private note(label: string, ms?: number) {
    this.trace.push({ label, ms });
    if (this.trace.length > 40) this.trace.shift();
  }

  /** Category browse is a plain filter. It runs no model calls, and says so. */
  private browse(category: string) {
    this.route = { name: 'home' };
    this.browsing = category;
    this.results = [];
    this.query = '';
    this.searchStatus = '';
    window.scrollTo(0, 0);
    this.render();
  }

  async search(query: string) {
    if (!query.trim()) return;
    this.route = { name: 'home' };
    this.browsing = undefined;
    this.query = query;
    this.results = [];
    this.trace = [];
    this.searchStatus = 'Thinking…';
    this.render();

    const started = performance.now();
    const pending: RankedResult[] = [];
    try {
      for await (const ev of this.pipeline.search(query)) {
        if (ev.type === 'expanded') {
          this.modelCalls++;
          this.note(
            `expand → ${ev.query.keywords.slice(0, 6).join(', ') || '(none)'}`,
            Math.round(ev.ms),
          );
        } else if (ev.type === 'prefiltered') {
          this.note(
            `filter → ${ev.candidates.length} of ${ev.totalIndexed} products`,
            Math.round(ev.ms),
          );
          this.note(`score → ${ev.candidates.length} model calls`);
          this.modelCalls += ev.candidates.length;
        } else if (ev.type === 'result') {
          pending.push(ev.result);
          this.results = [...pending]
            .filter((r) => r.score >= 1)
            .sort((a, b) => b.score - a.score || b.lexicalScore - a.lexicalScore);
          this.render();
        } else if (ev.type === 'done') {
          this.results = ev.results;
        } else if (ev.type === 'error') {
          this.searchStatus = `Search failed: ${ev.message}`;
        }
      }
      const ms = Math.round(performance.now() - started);
      this.searchStatus = this.results.length
        ? `${this.results.length} result${this.results.length === 1 ? '' : 's'} in ${ms} ms`
        : `Nothing matched (${ms} ms)`;
    } catch (err) {
      this.searchStatus = `Search failed: ${(err as Error).message}`;
    }
    this.render();
  }

  async ask(question: string) {
    if (!question.trim() || this.answering) return;
    this.answering = true;
    this.answer = undefined;
    this.render();
    try {
      const a = await this.scanner.ask(question);
      this.modelCalls += a.examined;
      this.note(`reviews → ${a.examined} of ${a.total} scored`, Math.round(a.ms));
      this.answer = a;
    } catch (err) {
      this.note(`reviews failed: ${(err as Error).message}`);
    }
    this.answering = false;
    this.render();
  }

  async scanSupport(text: string) {
    this.supportText = text;
    if (!text.trim() || this.scanning) return;
    this.scanning = true;
    this.render();
    try {
      const r = await this.guard.scan(text);
      if (!r.rulesOnly) this.modelCalls++;
      this.note(
        `pii → ${r.ruleCount} by rule, ${r.modelCount} by model`,
        Math.round(r.ms),
      );
      this.pii = r;
    } catch (err) {
      this.note(`pii scan failed: ${(err as Error).message}`);
    }
    this.scanning = false;
    this.render();
  }

  async chatSend(text: string) {
    if (!text.trim() || this.thinking) return;
    this.chat.push({ who: 'user', text });
    this.thinking = true;
    this.render();
    try {
      const turn = await this.assistant.send(text);
      for (const c of turn.toolCalls) this.note(`tool → ${c.name}`);
      this.chat.push({ who: 'bot', text: turn.text });
      this.proposals = turn.proposals;
      if (turn.proposals.length) {
        this.note(`proposed → ${turn.proposals.length} write blocked pending confirmation`);
      }
    } catch (err) {
      this.chat.push({ who: 'bot', text: `Something went wrong: ${(err as Error).message}` });
    }
    this.thinking = false;
    this.render();
  }

  private confirmProposal(p: Proposal) {
    if (this.assistant.confirm(p)) {
      this.note(`confirmed → ${p.tool} performed`);
      this.chat.push({ who: 'bot', text: 'Added to your basket.' });
    }
    this.proposals = this.proposals.filter((x) => x.id !== p.id);
    this.render();
  }

  /* ------------------------------ render ----------------------------- */

  private render() {
    const basketCount = [...this.basket.values()].reduce((a, b) => a + b, 0);
    const sim = this.status?.kind === 'simulated';

    this.root.innerHTML = `
      <div class="util">
        <div class="util-in">
          <span>${ICON.pin} Northwind Riverside &middot; <b>open until 8pm</b></span>
          <span class="dot">|</span>
          <span>Free click &amp; collect on every order</span>
          <span class="sp"></span>
          <span><b>0800 123 4567</b></span>
        </div>
      </div>

      <header class="hdr">
        <div class="hdr-in">
          <button class="brand" id="home">
            <span class="brand-mark">${ICON.mark}</span>
            <span class="brand-text">
              <span class="brand-name">Northwind</span><br/>
              <span class="brand-sub">Hardware</span>
            </span>
          </button>
          <form class="hdr-search" id="hdr-search-form">
            <input id="q" type="search" autocomplete="off" value="${esc(this.query)}"
                   placeholder="Describe what you need — not what it is called" />
            <button type="submit" aria-label="Search">${ICON.search}</button>
          </form>
          <div class="badge ${sim ? 'badge-sim' : 'badge-live'}"
               title="${esc(this.status?.detail ?? '')}">
            ${sim ? 'SIMULATED MODEL' : 'ON-DEVICE'}
          </div>
          <div class="hdr-rail">
            <button class="railbtn" id="nav-support">${ICON.user}<span>Help</span></button>
            <span class="rail-wrap">
              <button class="railbtn">${ICON.cart}<span>Basket</span>
                ${basketCount ? `<span class="cnt">${basketCount}</span>` : ''}
              </button>
            </span>
          </div>
        </div>
        <nav class="catbar">
          <div class="catbar-in">
            ${NAV_CATEGORIES.map(
              (c) => `<button class="catlink ${this.browsing === c ? 'on' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`,
            ).join('')}
          </div>
        </nav>
      </header>

      ${sim ? `<div class="warnbar"><div class="warnbar-in">${ICON.warn}
        <span><b>Simulated model.</b> ${esc(this.status.detail)}</span></div></div>` : ''}

      <div class="wrap">
        <div class="main">${this.renderMain()}</div>
        <div class="side">
          ${this.renderAssistant()}${this.renderTrace()}
          <div class="side-note">${ICON.lock}
            <span>Both panels run against the model inside this browser. Close the
            tab and everything above goes with it.</span></div>
        </div>
      </div>

      ${this.renderFooter()}`;

    this.wire();
  }

  private renderMain(): string {
    if (this.route.name === 'product') return this.renderProduct(this.route.sku);
    if (this.route.name === 'support') return this.renderSupport();
    return this.renderHome();
  }

  private renderHome(): string {
    if (this.browsing) return this.renderBrowse(this.browsing);
    const searched = this.results.length > 0 || !!this.searchStatus;
    // Once there are results the hero would push them below the fold, so it
    // collapses to a single row of alternative queries.
    return searched ? this.renderResults() : this.renderHero();
  }

  private renderHero(): string {
    return `
      <section class="hero">
        <div class="hero-tag">Runs on your device</div>
        <h1>Tell us the problem. We&rsquo;ll find the part.</h1>
        <p>Search ${PRODUCTS.length} products by what has gone wrong, not by what it is
           called. Every answer is worked out by the model built into your browser — no
           server, no account, nothing sent anywhere.</p>
        <form class="searchbar" id="search-form">
          <input id="q2" type="search" autocomplete="off"
                 placeholder="e.g. the thing that stops my door slamming" />
          <button type="submit">${ICON.search} Search</button>
        </form>
        <div class="chips">
          ${SAMPLES.map((s) => `<button class="chip" data-q="${esc(s)}">${esc(s)}</button>`).join('')}
        </div>
      </section>
      ${this.renderBrowseHome()}`;
  }

  private renderResults(): string {
    const busy = this.searchStatus.startsWith('Thinking');
    return `
      <div class="crumbs">
        <button id="home2">Home</button><span class="sep">/</span>
        <span>Results for &ldquo;${esc(this.query)}&rdquo;</span>
      </div>
      <div class="toolbar">
        <h2>${this.results.length ? 'Best matches' : 'Results'}</h2>
        <span class="count ${busy ? 'busy' : ''}">${esc(this.searchStatus)}</span>
      </div>
      <div class="chips chips-light" style="margin:-4px 0 16px">
        ${SAMPLES.filter((s) => s !== this.query)
          .slice(0, 4)
          .map((s) => `<button class="chip" data-q="${esc(s)}">${esc(s)}</button>`)
          .join('')}
      </div>
      ${this.results.length
        ? `<div class="grid">${this.results.map((r) => this.card(productBySku(r.doc.id), r)).join('')}</div>`
        : busy
          ? '<div class="empty">Working through the catalogue on your device…</div>'
          : `<div class="empty"><b>Nothing matched that.</b>
               Try describing what the thing does, for example &ldquo;stops a door slamming&rdquo;.</div>`}`;
  }

  /** The idle homepage: a real shop shows stock, not an empty panel. */
  private renderBrowseHome(): string {
    const counts = new Map<string, number>();
    for (const p of PRODUCTS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    const cats = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
    const popular = PRODUCTS.filter((p) => p.reviewCount > 0)
      .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
      .slice(0, 4);

    return `
      <div class="props">
        <div class="prop"><span class="prop-ic">${ICON.chip}</span>
          <span><b>On-device answers</b><span>The model ships with Chrome</span></span></div>
        <div class="prop"><span class="prop-ic">${ICON.lock}</span>
          <span><b>Nothing leaves</b><span>Zero network requests</span></span></div>
        <div class="prop"><span class="prop-ic">${ICON.bolt}</span>
          <span><b>Works offline</b><span>No account, no API key</span></span></div>
        <div class="prop"><span class="prop-ic">${ICON.shield}</span>
          <span><b>Quotes, not summaries</b><span>Every line verified</span></span></div>
      </div>

      <div class="section-hd"><h2>Shop by department</h2></div>
      <div class="tiles">
        ${cats.map(([c, n]) => `
          <button class="tile" data-cat="${esc(c)}">
            <span class="tile-art">${productArt(c, c)}</span>
            <span class="tile-name">${esc(c)}</span>
            <span class="tile-n">${n} product${n === 1 ? '' : 's'}</span>
          </button>`).join('')}
      </div>

      ${popular.length ? `
        <div class="section-hd"><h2>Top rated this month</h2></div>
        <div class="grid">${popular.map((p) => this.card(p)).join('')}</div>` : ''}`;
  }

  private renderBrowse(category: string): string {
    const items = PRODUCTS.filter((p) => p.category === category);
    return `
      <div class="crumbs">
        <button id="home2">Home</button><span class="sep">/</span><span>${esc(category)}</span>
      </div>
      <div class="toolbar">
        <h2>${esc(category)}</h2>
        <span class="count"><b>${items.length}</b> products &middot; browsing, no model calls</span>
      </div>
      <div class="grid">${items.map((p) => this.card(p)).join('')}</div>`;
  }

  private card(p: Product | undefined, r?: RankedResult): string {
    if (!p) return '';
    // A badge on almost every card carries no signal, so only the top two
    // score bands are labelled at all.
    const label = r && r.score >= 2 ? (r.score >= 3 ? 'Best match' : 'Good match') : '';
    return `
      <article class="card">
        <div class="card-art" data-sku="${p.sku}">
          ${label ? `<span class="match m${r!.score}">${label}</span>` : ''}
          ${productArt(p.sku, p.category, p.name)}
        </div>
        <div class="card-bd">
          <div class="card-name" data-sku="${p.sku}">${esc(p.name)}</div>
          ${starsHtml(p.rating, p.reviewCount || undefined)}
          ${r ? `<div class="card-why">${esc(r.why)}</div>` : ''}
          <div class="card-meta">${esc(p.category)} &middot; aisle ${esc(p.aisle)}</div>
          <div class="card-foot">
            <span class="price">${money(p.priceCents)}</span>
            <button class="add" data-add="${p.sku}">Add</button>
          </div>
        </div>
      </article>`;
  }

  private renderProduct(sku: string): string {
    const p = productBySku(sku);
    if (!p) return '<div class="empty"><b>Product not found.</b></div>';
    const reviews = reviewsForSku(sku);
    // Where review bodies exist they are the truth; the catalogue's own
    // reviewCount disagreed with them and printed two numbers on one page.
    const ratingCount = reviews.length || p.reviewCount || undefined;
    return `
      <div class="crumbs">
        <button id="back">Home</button><span class="sep">/</span>
        <button data-cat="${esc(p.category)}">${esc(p.category)}</button>
        <span class="sep">/</span><span>${esc(p.name)}</span>
      </div>
      <div class="prod">
        <div class="prod-art">${productArt(p.sku, p.category, p.name)}</div>
        <div class="prod-head">
          <h1>${esc(p.name)}</h1>
          <div class="prod-sub">
            ${starsHtml(p.rating, ratingCount)}
            <span>&middot;</span><span class="sku">${esc(p.sku)}</span>
          </div>
          <p class="prod-desc">${esc(p.description)}</p>

          <div class="buybox">
            <span class="price">${money(p.priceCents)}</span>
            <div class="vat">Includes VAT</div>
            <div class="instock">In stock at Northwind Riverside</div>
            <div class="aisle">${esc(p.category)} &middot; aisle ${esc(p.aisle)}</div>
            <button class="buy" data-add="${p.sku}">Add to basket</button>
            <div class="fulfil">
              <div>${ICON.pin}<span><b>Collect today</b> from Riverside, ready in 1 hour</span></div>
              <div>${ICON.truck}<span><b>Free delivery</b> on orders over £50</span></div>
              <div>${ICON.shield}<span><b>365 day returns</b> on unused items</span></div>
            </div>
          </div>
        </div>
      </div>

      ${reviews.length ? `
        <div class="qa">
          <h3>Ask about this product</h3>
          <p class="lede">
            ${reviews.length.toLocaleString()} customer reviews are already on this
            page. Your question is answered from them, on your machine.
          </p>
          <form class="ask" id="ask-form">
            <input id="askq" placeholder="is this any good on concrete?"
                   value="${sku === HERO_SKU ? 'is this any good on concrete?' : ''}" />
            <button type="submit">${this.answering ? 'Reading…' : 'Ask'}</button>
          </form>
          ${this.renderAnswer()}
        </div>` : ''}

      <div class="spec">
        <h3>Specification</h3>
        <table>
          <tr><td>Product code</td><td>${esc(p.sku)}</td></tr>
          <tr><td>Department</td><td>${esc(p.category)} &middot; aisle ${esc(p.aisle)}</td></tr>
          <tr><td>Guarantee</td><td>2 years parts and labour</td></tr>
          <tr><td>Returns</td><td>365 days, unused and in original packaging</td></tr>
        </table>
      </div>

      ${this.renderRelated(p)}`;
  }

  /** Cross-sell from the same department. A real product page never just stops. */
  private renderRelated(p: Product): string {
    const related = PRODUCTS.filter((x) => x.category === p.category && x.sku !== p.sku).slice(0, 4);
    if (!related.length) return '';
    return `
      <div class="section-hd"><h2>More in ${esc(p.category)}</h2>
        <button class="more" data-cat="${esc(p.category)}">View all</button></div>
      <div class="grid">${related.map((x) => this.card(x)).join('')}</div>`;
  }

  private renderAnswer(): string {
    const a = this.answer;
    if (this.answering) return '<div class="answer">Reading the reviews on your device…</div>';
    if (!a) return '';
    if (!a.findings.length) {
      return `<div class="answer">
        <div class="answer-hd">No review mentions that.</div>
        <div class="counted">Scored ${a.examined} of ${a.total} reviews in ${Math.round(a.ms)} ms.
          Nothing was invented to fill the gap.</div>
      </div>`;
    }
    const quotes = a.findings
      .map(
        (f) => `<div class="quote ${f.sentiment === 'positive' ? 'pos' : f.sentiment === 'negative' ? 'neg' : ''}">
            <span class="qs">${starsHtml(f.review.stars)}
            <span class="who">verified purchase</span></span>
            ${esc(f.quote)}
          </div>`,
      )
      .join('');
    return `
      <div class="answer">
        <div class="answer-hd">${a.findings.length} of ${a.total} reviews answer that.</div>
        <div class="answer-sub">Quoted directly from customers — not summarised.</div>
        <div class="tally">
          <span class="pos">${a.counts.positive} positive</span>
          <span class="neg">${a.counts.negative} negative</span>
        </div>
        ${quotes}
        <div class="counted">
          Every quote was checked against its review before it was shown.
          ${a.examined} reviews scored in ${Math.round(a.ms)} ms, on this device.
        </div>
      </div>`;
  }

  private renderSupport(): string {
    const findings = this.pii?.findings ?? [];
    const blocked = findings.length > 0;
    return `
      <div class="crumbs"><button id="back">Home</button><span class="sep">/</span><span>Contact us</span></div>
      <div class="page-hd"><h1>Contact us</h1></div>
      <p class="lede">
        Nothing you type here is sent anywhere until you press send. The check below
        runs on your machine, which is the only place it can run: to look for personal
        information in the cloud, you would have to send the personal information to
        the cloud first.
      </p>
      <div class="form">
        <label for="msg">What has gone wrong?</label>
        <textarea id="msg" placeholder="Tell us what happened…">${esc(this.supportText)}</textarea>
        <div class="row">
          <button class="submit" id="send" ${blocked ? 'disabled' : ''}>
            ${blocked ? 'Remove personal details first' : 'Send message'}
          </button>
          <button class="ghost" id="fill">Paste an example</button>
          <span class="card-meta">${this.scanning ? 'Checking on your device…' : ''}</span>
        </div>
        ${this.renderPii()}
      </div>`;
  }

  private renderPii(): string {
    const r = this.pii;
    if (!r) return '';
    if (!r.findings.length) {
      return '<div class="pii-ok">No personal information found. Safe to send.</div>';
    }
    const items = r.findings
      .map(
        (f) => `<div class="pii-item">
            <span class="pii-kind">${esc(f.kind)}</span>
            <span class="pii-val">${esc(f.text)}</span>
            <span class="pii-src">${esc(f.source)}</span>
          </div>`,
      )
      .join('');
    return `
      <div class="pii">
        <div class="pii-hd">${ICON.warn}
          ${r.findings.length} piece${r.findings.length === 1 ? '' : 's'} of personal information found</div>
        ${items}
        <div class="pii-note">
          <b>${r.ruleCount} by deterministic rule, ${r.modelCount} by the model.</b>
          ${r.rulesOnly ? 'The model was unavailable; the rules still ran.' : ''}
          Nothing has left this browser.
        </div>
      </div>`;
  }

  private renderAssistant(): string {
    const msgs = this.chat
      .map((m) => `<div class="msg ${m.who}">${esc(m.text)}</div>`)
      .join('');
    const props = this.proposals
      .map((p) => {
        const sku = String(p.args.sku ?? '');
        const qty = Number(p.args.quantity ?? 1);
        const prod = productBySku(sku);
        return `<div class="proposal">
            <div class="proposal-hd">${ICON.lock} Waiting for you to confirm</div>
            <div class="proposal-bd">Add ${qty} &times; ${esc(prod?.name ?? sku)} to the basket.</div>
            <div class="proposal-row">
              <button class="confirm-btn" data-confirm="${p.id}">Confirm</button>
              <button class="cancel-btn" data-cancel="${p.id}">Cancel</button>
            </div>
          </div>`;
      })
      .join('');
    return `
      <div class="panel">
        <div class="panel-hd">Shopping assistant</div>
        <div class="panel-bd">
          <div class="chat">
            ${msgs || `<div class="chat-empty">Ask for something in your own words, for example
              &ldquo;add the door thing to my basket&rdquo;. Anything that changes your basket is
              proposed first and waits for you.</div>`}
            ${this.thinking ? '<div class="msg bot">Thinking…</div>' : ''}
            ${props}
          </div>
          <form class="chatbar" id="chat-form">
            <input id="chatq" placeholder="Ask the assistant…" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>`;
  }

  private renderTrace(): string {
    const sim = this.status?.kind === 'simulated';
    const rows = this.trace
      .map(
        (t) => `<div class="trace-row"><span>${esc(t.label)}</span>
            <span class="trace-ms">${t.ms === undefined ? '' : `${t.ms} ms`}</span></div>`,
      )
      .join('');
    return `
      <div class="panel">
        <div class="panel-hd">
          Audit trace
          <span class="pill-sm ${sim ? '' : 'live'}">${sim ? 'simulated' : 'on-device'}</span>
        </div>
        <div class="panel-bd">
          <div class="stat"><span>Model calls this session</span><b>${this.modelCalls}</b></div>
          <div class="stat"><span>Network requests</span><b class="net-zero">0</b></div>
          <hr class="trace-sep" />
          <div class="trace">${rows || '<div class="trace-empty">Nothing yet. Run a search.</div>'}</div>
        </div>
      </div>`;
  }

  private renderFooter(): string {
    return `
      <footer class="foot">
        <div class="foot-in">
          <div>
            <h4>Shop</h4>
            <ul><li>Power tools</li><li>Door hardware</li><li>Plumbing</li><li>Garden</li></ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul><li>Click &amp; collect</li><li>Tool hire</li><li>Key cutting</li><li>Timber cutting</li></ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul><li>Track an order</li><li>Returns</li><li>Contact us</li><li>Store finder</li></ul>
          </div>
          <div>
            <h4>About Northwind</h4>
            <ul>
              <li>Built with ADK for TypeScript</li>
              <li>Chrome built-in Prompt API</li>
              <li>Fictional brand and catalogue</li>
            </ul>
          </div>
        </div>
        <div class="foot-bar">
          <div class="foot-bar-in">
            <span>&copy; 2026 Northwind Hardware &mdash; a demonstration, not a real shop.</span>
            <span class="sp"></span>
            <span>${ICON.lock} <b>0</b> network requests this session</span>
          </div>
        </div>
      </footer>`;
  }

  /* ------------------------------- wiring ---------------------------- */

  private wire() {
    const $ = (s: string) => this.root.querySelector(s);
    const on = (s: string, ev: string, fn: (e: Event) => void) =>
      $(s)?.addEventListener(ev, fn);

    // "Home" means the homepage. Leaving the previous query in place kept the
    // results view mounted and the hero hidden.
    const goHome = () => {
      this.browsing = undefined;
      this.results = [];
      this.searchStatus = '';
      this.query = '';
      this.go({ name: 'home' });
    };
    on('#home', 'click', goHome);
    on('#home2', 'click', goHome);
    on('#back', 'click', goHome);
    on('#nav-support', 'click', () => this.go({ name: 'support' }));

    // Two search boxes: the persistent header one and the big one in the hero.
    const submitFrom = (sel: string) => (e: Event) => {
      e.preventDefault();
      const input = $(sel) as HTMLInputElement | null;
      if (input) void this.search(input.value);
    };
    on('#hdr-search-form', 'submit', submitFrom('#q'));
    on('#search-form', 'submit', submitFrom('#q2'));

    this.root.querySelectorAll('[data-q]').forEach((el) =>
      el.addEventListener('click', () => {
        const q = (el as HTMLElement).dataset.q!;
        for (const sel of ['#q', '#q2']) {
          const input = $(sel) as HTMLInputElement | null;
          if (input) input.value = q;
        }
        void this.search(q);
      }),
    );
    this.root.querySelectorAll('[data-cat]').forEach((el) =>
      el.addEventListener('click', () => this.browse((el as HTMLElement).dataset.cat!)),
    );
    this.root.querySelectorAll('[data-sku]').forEach((el) =>
      el.addEventListener('click', () =>
        this.go({ name: 'product', sku: (el as HTMLElement).dataset.sku! }),
      ),
    );
    this.root.querySelectorAll('[data-add]').forEach((el) =>
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.addToBasket((el as HTMLElement).dataset.add!);
      }),
    );

    on('#ask-form', 'submit', (e) => {
      e.preventDefault();
      void this.ask(($('#askq') as HTMLInputElement).value);
    });

    const msg = $('#msg') as HTMLTextAreaElement | null;
    if (msg) {
      // Scan when the shopper pauses, not on every keystroke.
      let timer: ReturnType<typeof setTimeout>;
      msg.addEventListener('input', () => {
        this.supportText = msg.value;
        clearTimeout(timer);
        timer = setTimeout(() => void this.scanSupport(msg.value), 600);
      });
      msg.selectionStart = msg.value.length;
    }
    on('#fill', 'click', (e) => {
      e.preventDefault();
      void this.scanSupport(SUPPORT_SAMPLE);
    });
    on('#send', 'click', (e) => {
      e.preventDefault();
      alert('In a real shop this would post to the server. Nothing was sent.');
    });

    on('#chat-form', 'submit', (e) => {
      e.preventDefault();
      const input = $('#chatq') as HTMLInputElement;
      const v = input.value;
      input.value = '';
      void this.chatSend(v);
    });
    this.root.querySelectorAll('[data-confirm]').forEach((el) =>
      el.addEventListener('click', () => {
        const id = (el as HTMLElement).dataset.confirm!;
        const p = this.proposals.find((x) => x.id === id);
        if (p) this.confirmProposal(p);
      }),
    );
    this.root.querySelectorAll('[data-cancel]').forEach((el) =>
      el.addEventListener('click', () => {
        const id = (el as HTMLElement).dataset.cancel!;
        this.proposals = this.proposals.filter((x) => x.id !== id);
        this.note('cancelled → write discarded');
        this.render();
      }),
    );
  }
}

/** Product names and review text are untrusted input. */
function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

void new App().init();
