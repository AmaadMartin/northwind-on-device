/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Prompts and response schemas.
 *
 * Two rules govern this file, both consequences of running on a small on-device
 * model:
 *
 *   1. Every call is a short, bounded, local judgement. Never "rank these
 *      hundred products" — always "here is one item, score it".
 *   2. Every call is schema-constrained. Free-form output is never parsed.
 *
 * Scores are an integer enum rather than a 0..1 float on purpose: small models
 * pick reliably from four labels and calibrate floats badly.
 */

/* ------------------------------ stage 1 ------------------------------ */

export const EXPAND_SYSTEM = [
  "You turn a shopper's description of a problem into search terms for a",
  'hardware shop catalogue.',
  '',
  'Shoppers describe symptoms, not products. They do not know trade names.',
  'Produce the words a catalogue would actually use.',
  '',
  'For example "my door slams" should also produce "doorstop", "hinge",',
  '"closer", "buffer", "cushion". "my tap drips" should also produce "washer",',
  '"cartridge", "seal", "valve", "faucet".',
  '',
  'Reply with JSON only.',
].join('\n');

export const EXPAND_SCHEMA = {
  type: 'object',
  properties: {
    keywords: { type: 'array', items: { type: 'string' }, maxItems: 12 },
    intent: { type: 'string', maxLength: 60 },
  },
  required: ['keywords', 'intent'],
} as const;

export function expandUserPrompt(query: string): string {
  return `SHOPPER SAID: ${query}\n\nGive up to 12 catalogue keywords and a short intent phrase.`;
}

/* ------------------------------ stage 3 ------------------------------ */

export const RERANK_SYSTEM = [
  "You decide whether one catalogue item solves the shopper's problem.",
  '',
  'Scoring:',
  '  3 = this is exactly what they need',
  '  2 = this would work, or is clearly related',
  '  1 = same area of the shop but probably not it',
  '  0 = unrelated',
  '',
  'Shoppers describe symptoms, not product names. Judge by what the item does,',
  'not by matching words. A "hinge pin doorstop" is a 3 for "the thing that',
  'stops my door slamming".',
  '',
  'In "why", say in at most 12 words what this item does for them. Never repeat',
  'their words back. Reply with JSON only.',
].join('\n');

export const RERANK_SCHEMA = {
  type: 'object',
  properties: {
    score: { type: 'integer', enum: [0, 1, 2, 3] },
    why: { type: 'string', maxLength: 80 },
  },
  required: ['score', 'why'],
} as const;

/** Item text is truncated hard; the context window is small and this runs per item. */
export const MAX_ITEM_CHARS = 700;

export function rerankUserPrompt(args: {
  query: string;
  intent: string;
  title: string;
  url: string;
  text: string;
}): string {
  const body = (args.text || '').slice(0, MAX_ITEM_CHARS);
  return [
    `SHOPPER SAID: ${args.query}`,
    `LOOKING FOR: ${args.intent}`,
    '',
    `ITEM: ${args.title}`,
    `DETAILS: ${body || '(no details available)'}`,
    '',
    'Score this item.',
  ].join('\n');
}

/* --------------------------- review scanning --------------------------- */

export const REVIEW_SYSTEM = [
  "You decide whether one customer review answers a shopper's question about a",
  'product.',
  '',
  'Return:',
  '  relevant  true only if the review actually speaks to the question',
  "  sentiment positive, negative or mixed, from the reviewer's point of view",
  '  quote     the exact sentence from the review that answers it',
  '',
  'The quote must be copied word for word from the review. Do not paraphrase',
  'and do not invent. If nothing in the review answers the question, set',
  'relevant to false and leave quote empty.',
  '',
  'Reply with JSON only.',
].join('\n');

export const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    relevant: { type: 'boolean' },
    sentiment: { type: 'string', enum: ['positive', 'negative', 'mixed', 'none'] },
    quote: { type: 'string', maxLength: 200 },
  },
  required: ['relevant', 'sentiment', 'quote'],
} as const;

export function reviewUserPrompt(args: {
  question: string;
  stars: number;
  text: string;
}): string {
  return [
    `QUESTION: ${args.question}`,
    '',
    `REVIEW (${args.stars} stars): ${args.text.slice(0, MAX_ITEM_CHARS)}`,
    '',
    'Does this review answer the question?',
  ].join('\n');
}

/* ------------------------------- PII ---------------------------------- */

export const PII_SYSTEM = [
  'You find personal information in text a customer is about to send to a shop.',
  '',
  'Report only what is actually present. Copy each finding word for word from',
  'the text. Do not paraphrase, normalise or invent anything.',
  '',
  'Look for names of people and street addresses. Ignore product names, shop',
  'names and order numbers.',
  '',
  'If there is nothing personal, return an empty list. Reply with JSON only.',
].join('\n');

export const PII_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      maxItems: 8,
      items: {
        type: 'object',
        properties: {
          kind: {
            type: 'string',
            enum: ['name', 'address', 'card', 'email', 'phone', 'other'],
          },
          text: { type: 'string', maxLength: 120 },
        },
        required: ['kind', 'text'],
      },
    },
  },
  required: ['findings'],
} as const;

export function piiUserPrompt(text: string): string {
  return `TEXT:\n${text.slice(0, 1200)}\n\nList the personal information it contains.`;
}

/* --------------------------- the assistant ---------------------------- */

export const ASSISTANT_SYSTEM = [
  'You are the Northwind Hardware shopping assistant.',
  '',
  'Rules:',
  '- To find anything, call searchProducts. Never guess what the shop stocks.',
  '- Call exactly one tool at a time.',
  '- Before adding anything to the basket, search first so you have real SKUs.',
  '- Keep replies to one or two short sentences.',
  '- You cannot complete a purchase. You prepare it and the shopper confirms.',
].join('\n');
