/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Shared types for the Northwind retrieval pipeline.
 *
 * The pipeline is deliberately domain-agnostic: it ranks `SearchDoc`s. In
 * TabFind those documents were browser tabs. Here they are products, and on the
 * product page they are reviews. Neither `bm25.ts` nor `pipeline.ts` changed to
 * make that work.
 */

/** Anything the pipeline can rank. */
export interface SearchDoc {
  id: string;
  /** The headline a person reads. Weighted heavily by the lexical filter. */
  title: string;
  /** Where the document lives. Its words are weak signal. */
  url: string;
  /** Body text. Truncated hard before it reaches the model. */
  text: string;
  /** Optional one-line description produced during indexing. */
  gist?: string;
  indexedAt: number;
}

/** A product in the Northwind catalogue. */
export interface Product {
  sku: string;
  name: string;
  category: string;
  description: string;
  priceCents: number;
  aisle: string;
  rating: number;
  reviewCount: number;
}

/** A customer review of a product. */
export interface Review {
  id: string;
  sku: string;
  stars: number;
  author: string;
  text: string;
}

/** Output of stage 1, query understanding. */
export interface ExpandedQuery {
  original: string;
  keywords: string[];
  intent: string;
}

/** A candidate surviving the lexical prefilter. */
export interface Candidate {
  doc: SearchDoc;
  lexicalScore: number;
}

/** A reranked, user-visible result. */
export interface RankedResult {
  doc: SearchDoc;
  /** 0 unrelated, 1 weak, 2 good, 3 exact. */
  score: number;
  why: string;
  lexicalScore: number;
}

/** Progress emitted while a search runs, for the trace panel and the UI. */
export type SearchEvent =
  | { type: 'expanded'; query: ExpandedQuery; ms: number }
  | { type: 'prefiltered'; candidates: Candidate[]; totalIndexed: number; ms: number }
  | { type: 'result'; result: RankedResult; index: number; of: number }
  | { type: 'done'; results: RankedResult[]; ms: number }
  | { type: 'error'; message: string };

/** Maps a product into the shape the pipeline ranks. */
export function productToDoc(p: Product): SearchDoc {
  return {
    id: p.sku,
    title: p.name,
    url: `/p/${p.sku}`,
    text: p.description,
    // Category and aisle stay searchable, but live in `gist` rather than
    // `text`. The reranker quotes from `text`, and "Category: Door Hardware"
    // is a useless thing to show a shopper as the reason for a match.
    gist: `${p.category}. Aisle ${p.aisle}.`,
    indexedAt: Date.now(),
  };
}

/** Maps a review into the shape the pipeline ranks. */
export function reviewToDoc(r: Review): SearchDoc {
  return {
    id: r.id,
    title: `${r.stars} star review by ${r.author}`,
    url: `/p/${r.sku}#${r.id}`,
    text: r.text,
    indexedAt: Date.now(),
  };
}
