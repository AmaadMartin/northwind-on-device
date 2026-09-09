/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Product artwork, drawn as inline SVG.
 *
 * A hardware storefront without product pictures does not read as a storefront,
 * and the demo has to run offline with no network requests at all — which rules
 * out photography. So the catalogue is illustrated instead.
 *
 * Artwork is chosen from the product *name* first and only falls back to the
 * category. Keying on category alone made a search for door parts render five
 * identical handles in a row, which reads as a placeholder rather than a shop.
 *
 * The style is deliberately uniform: one 120x120 viewBox, a shared material
 * palette, no gradients and no shadows. Uniform artwork reads as a catalogue.
 */

/** Material palette shared by every illustration. */
const C = {
  steelLight: '#cfd6de',
  steel: '#9aa5b1',
  steelDark: '#6b7684',
  grip: '#37444f',
  gripLight: '#4a5a68',
  wood: '#d9a066',
  woodDark: '#b97e4a',
  brass: '#d9a441',
  white: '#f7f9fb',
  glass: '#bfe3f5',
};

/** Accent colour per category family, so a grid of results is not monochrome. */
const ACCENTS: Record<string, string> = {
  'Power Tools': '#b45309',
  Drilling: '#b45309',
  'Hand Tools': '#b91c1c',
  Workshop: '#b91c1c',
  Measuring: '#ca8a04',
  Plumbing: '#0e7490',
  'Door Hardware': '#475569',
  Security: '#334155',
  Safety: '#ca8a04',
  Electrical: '#1d4ed8',
  Lighting: '#ca8a04',
  Paint: '#b91c1c',
  Decorating: '#be123c',
  Garden: '#4d7c0f',
  'Gate & Shed': '#a16207',
  Fixings: '#64748b',
  Adhesives: '#0e7490',
  Flooring: '#a16207',
  Timber: '#a16207',
  Tiling: '#0f766e',
  Roofing: '#7c2d12',
  Storage: '#0369a1',
  Household: '#0891b2',
  Weatherproofing: '#0891b2',
  Insulation: '#be185d',
  Aggregates: '#78716c',
  Access: '#ea580c',
};

type Draw = (a: string) => string;

/* ------------------------------ illustrations ----------------------------- */

const drill: Draw = (a) => `
  <path d="M22 44h44a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H22z" fill="${a}"/>
  <path d="M22 44h44a6 6 0 0 1 6 6v6H22z" fill="#fff" opacity=".18"/>
  <path d="M30 76h22l-5 26a5 5 0 0 1-5 4h-4a5 5 0 0 1-5-4z" fill="${C.grip}"/>
  <rect x="28" y="86" width="26" height="12" rx="3" fill="${C.gripLight}"/>
  <rect x="70" y="52" width="16" height="14" rx="3" fill="${C.steelDark}"/>
  <rect x="84" y="55" width="22" height="8" rx="4" fill="${C.steel}"/>
  <circle cx="44" cy="60" r="7" fill="#000" opacity=".13"/>`;

const impactDriver: Draw = (a) => `
  <path d="M28 42h34a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H28z" fill="${a}"/>
  <path d="M28 42h34a6 6 0 0 1 6 6v5H28z" fill="#fff" opacity=".2"/>
  <path d="M34 72h20l-4 28a5 5 0 0 1-5 4h-3a5 5 0 0 1-5-4z" fill="${C.grip}"/>
  <rect x="32" y="84" width="24" height="12" rx="3" fill="${C.gripLight}"/>
  <path d="M68 50h12v18H68z" fill="${C.steelDark}"/>
  <path d="M80 53l14 6-14 6z" fill="${C.steel}"/>`;

const hammer: Draw = (a) => `
  <path d="M34 22h30a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H34z" fill="${C.steel}"/>
  <path d="M34 22h30a6 6 0 0 1 6 6v6H34z" fill="${C.steelLight}"/>
  <path d="M34 22c-10 0-16 6-16 14s6 14 16 14z" fill="${C.steelDark}"/>
  <rect x="46" y="50" width="12" height="56" rx="5" fill="${C.wood}"/>
  <rect x="46" y="76" width="12" height="30" rx="5" fill="${a}"/>`;

const wrench: Draw = (a) => `
  <path d="M74 18a22 22 0 0 0-20 30L20 82a9 9 0 0 0 13 13l34-34a22 22 0 0 0 27-31l-14 14-12-3-3-12z"
        fill="${C.steel}"/>
  <path d="M74 18a22 22 0 0 0-20 30l6 6 30-30-4-3-12z" fill="${C.steelLight}" opacity=".75"/>
  <circle cx="28" cy="88" r="5" fill="${a}"/>`;

const screwdriver: Draw = (a) => `
  <rect x="50" y="14" width="20" height="44" rx="9" fill="${a}"/>
  <rect x="50" y="14" width="20" height="14" rx="8" fill="#fff" opacity=".22"/>
  <rect x="55" y="58" width="10" height="8" fill="${C.steelDark}"/>
  <rect x="56" y="66" width="8" height="34" fill="${C.steel}"/>
  <path d="M56 100h8v8h-8z" fill="${C.steelLight}"/>`;

const saw: Draw = (a) => `
  <circle cx="66" cy="56" r="30" fill="${C.steelLight}"/>
  <circle cx="66" cy="56" r="30" fill="none" stroke="${C.steel}" stroke-width="3"
          stroke-dasharray="6 7"/>
  <circle cx="66" cy="56" r="8" fill="${C.steelDark}"/>
  <path d="M18 62h44v18H26a8 8 0 0 1-8-8z" fill="${a}"/>
  <rect x="20" y="80" width="30" height="12" rx="5" fill="${C.grip}"/>`;

const grinder: Draw = (a) => `
  <rect x="16" y="48" width="52" height="26" rx="12" fill="${a}"/>
  <rect x="16" y="48" width="52" height="9" rx="5" fill="#fff" opacity=".2"/>
  <circle cx="82" cy="61" r="26" fill="${C.steelLight}"/>
  <circle cx="82" cy="61" r="26" fill="none" stroke="${C.steel}" stroke-width="3"/>
  <circle cx="82" cy="61" r="7" fill="${C.steelDark}"/>
  <rect x="24" y="74" width="26" height="10" rx="5" fill="${C.grip}"/>`;

const drillbit: Draw = (a) => `
  <rect x="40" y="14" width="10" height="90" rx="3" fill="${C.steel}"/>
  <rect x="62" y="24" width="10" height="80" rx="3" fill="${C.steelDark}"/>
  <rect x="84" y="34" width="9" height="70" rx="3" fill="${C.steel}"/>
  <path d="M40 30h10M40 44h10M40 58h10M62 40h10M62 54h10M84 50h9M84 64h9"
        stroke="${a}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;

const tape: Draw = (a) => `
  <circle cx="60" cy="60" r="40" fill="${a}"/>
  <circle cx="60" cy="60" r="16" fill="${C.white}"/>
  <path d="M60 20a40 40 0 0 1 34 19l-14 8a24 24 0 0 0-20-11z" fill="#fff" opacity=".24"/>`;

const measure: Draw = (a) => `
  <rect x="18" y="40" width="84" height="42" rx="10" fill="${a}"/>
  <rect x="18" y="40" width="84" height="13" rx="7" fill="#fff" opacity=".2"/>
  <circle cx="46" cy="61" r="14" fill="${C.white}"/>
  <circle cx="46" cy="61" r="5" fill="${C.steel}"/>
  <rect x="70" y="82" width="30" height="12" rx="3" fill="${C.steelLight}"/>
  <path d="M76 82v6M84 82v9M92 82v6" stroke="${C.steelDark}" stroke-width="2"/>`;

const level: Draw = (a) => `
  <rect x="12" y="48" width="96" height="26" rx="6" fill="${a}"/>
  <rect x="12" y="48" width="96" height="9" rx="4" fill="#fff" opacity=".22"/>
  <rect x="46" y="54" width="28" height="14" rx="7" fill="${C.white}"/>
  <circle cx="60" cy="61" r="5" fill="${C.glass}"/>`;

const tap: Draw = (a) => `
  <rect x="30" y="86" width="46" height="10" rx="3" fill="${C.steelDark}"/>
  <rect x="46" y="44" width="14" height="46" fill="${C.steel}"/>
  <path d="M53 44c0-16 12-24 26-24v12c-8 0-14 4-14 12z" fill="${C.steel}"/>
  <rect x="76" y="14" width="16" height="12" rx="4" fill="${a}"/>
  <rect x="36" y="34" width="34" height="12" rx="5" fill="${C.steelLight}"/>
  <path d="M53 96v10" stroke="${C.glass}" stroke-width="5" stroke-linecap="round"/>`;

const plunger: Draw = (a) => `
  <rect x="54" y="12" width="12" height="52" rx="5" fill="${C.wood}"/>
  <path d="M32 64h56v14a24 24 0 0 1-24 22h-8a24 24 0 0 1-24-22z" fill="${a}"/>
  <rect x="30" y="58" width="60" height="12" rx="6" fill="${a}" opacity=".75"/>`;

const pipe: Draw = (a) => `
  <rect x="14" y="46" width="92" height="28" rx="6" fill="${a}"/>
  <rect x="14" y="46" width="92" height="10" rx="5" fill="#fff" opacity=".22"/>
  <rect x="18" y="40" width="16" height="40" rx="4" fill="${C.steelLight}"/>
  <rect x="86" y="40" width="16" height="40" rx="4" fill="${C.steelLight}"/>`;

const handle: Draw = (a) => `
  <rect x="26" y="30" width="20" height="60" rx="8" fill="${C.steelDark}"/>
  <rect x="30" y="34" width="12" height="52" rx="6" fill="${C.steel}"/>
  <circle cx="36" cy="46" r="3" fill="${C.steelLight}"/>
  <circle cx="36" cy="74" r="3" fill="${C.steelLight}"/>
  <path d="M46 54h34a10 10 0 0 1 10 10v4H46z" fill="${a}"/>
  <path d="M46 54h34a10 10 0 0 1 10 10H46z" fill="#fff" opacity=".22"/>`;

const doorstop: Draw = (a) => `
  <path d="M18 84h74l-74 18z" fill="${C.steelLight}"/>
  <path d="M20 62h56a10 10 0 0 1 10 10v12H20z" fill="${a}"/>
  <path d="M20 62h56a10 10 0 0 1 10 10H20z" fill="#fff" opacity=".2"/>
  <rect x="76" y="46" width="12" height="40" rx="6" fill="${C.steel}"/>
  <circle cx="82" cy="42" r="8" fill="${C.steelDark}"/>`;

const wedge: Draw = (a) => `
  <path d="M14 84h92l-92 16z" fill="${C.steelLight}" opacity=".6"/>
  <path d="M16 82 100 44v38z" fill="${a}"/>
  <path d="M16 82 100 44v10L38 82z" fill="#fff" opacity=".22"/>
  <path d="M52 64h34M60 74h30" stroke="#fff" stroke-opacity=".38" stroke-width="4" stroke-linecap="round"/>`;

const closer: Draw = (a) => `
  <rect x="16" y="42" width="62" height="30" rx="8" fill="${a}"/>
  <rect x="16" y="42" width="62" height="10" rx="5" fill="#fff" opacity=".2"/>
  <rect x="78" y="50" width="26" height="10" rx="5" fill="${C.steel}"/>
  <rect x="60" y="72" width="40" height="9" rx="4" fill="${C.steelDark}"
        transform="rotate(18 80 76)"/>
  <circle cx="30" cy="57" r="6" fill="${C.grip}" opacity=".35"/>`;

const hinge: Draw = (a) => `
  <rect x="24" y="22" width="30" height="76" rx="4" fill="${C.steel}"/>
  <rect x="66" y="22" width="30" height="76" rx="4" fill="${C.steelLight}"/>
  <rect x="52" y="18" width="16" height="84" rx="8" fill="${a}"/>
  <circle cx="38" cy="40" r="4" fill="${C.steelDark}"/>
  <circle cx="38" cy="80" r="4" fill="${C.steelDark}"/>
  <circle cx="82" cy="40" r="4" fill="${C.steelDark}"/>
  <circle cx="82" cy="80" r="4" fill="${C.steelDark}"/>`;

const numerals: Draw = (a) => `
  <rect x="20" y="26" width="34" height="34" rx="6" fill="${a}"/>
  <rect x="66" y="26" width="34" height="34" rx="6" fill="${C.steel}"/>
  <rect x="20" y="70" width="34" height="34" rx="6" fill="${C.steel}"/>
  <rect x="66" y="70" width="34" height="34" rx="6" fill="${a}"/>
  <path d="M34 36v14M83 36v14M31 80h12M79 80h12" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;

const chain: Draw = (a) => `
  <rect x="18" y="30" width="18" height="60" rx="5" fill="${C.steelDark}"/>
  <rect x="84" y="30" width="18" height="60" rx="5" fill="${C.steelDark}"/>
  <g fill="none" stroke="${a}" stroke-width="7">
    <ellipse cx="46" cy="60" rx="10" ry="7"/>
    <ellipse cx="62" cy="60" rx="10" ry="7"/>
    <ellipse cx="78" cy="60" rx="10" ry="7"/>
  </g>`;

const viewer: Draw = (a) => `
  <circle cx="60" cy="60" r="36" fill="${C.steel}"/>
  <circle cx="60" cy="60" r="27" fill="${C.steelDark}"/>
  <circle cx="60" cy="60" r="17" fill="${a}"/>
  <circle cx="60" cy="60" r="8" fill="${C.glass}"/>
  <circle cx="53" cy="53" r="3" fill="#fff" opacity=".8"/>`;

const padlock: Draw = (a) => `
  <path d="M40 52V40a20 20 0 0 1 40 0v12" fill="none" stroke="${C.steel}" stroke-width="10"/>
  <rect x="26" y="52" width="68" height="52" rx="10" fill="${a}"/>
  <rect x="26" y="52" width="68" height="16" rx="8" fill="#fff" opacity=".18"/>
  <circle cx="60" cy="74" r="8" fill="${C.white}" opacity=".92"/>
  <rect x="56" y="78" width="8" height="14" rx="4" fill="${C.white}" opacity=".92"/>`;

const cylLock: Draw = (a) => `
  <rect x="18" y="46" width="84" height="30" rx="15" fill="${C.steel}"/>
  <circle cx="36" cy="61" r="15" fill="${a}"/>
  <circle cx="36" cy="61" r="6" fill="${C.white}"/>
  <path d="M60 56h34v10H60z" fill="${C.steelDark}"/>
  <path d="M88 50h10v22H88z" fill="${C.steelLight}"/>`;

const hook: Draw = (a) => `
  <rect x="18" y="40" width="26" height="12" rx="5" fill="${C.steelDark}"/>
  <path d="M44 46h30a18 18 0 0 1 0 36 12 12 0 0 1 0-24" fill="none" stroke="${a}" stroke-width="9"
        stroke-linecap="round"/>
  <circle cx="24" cy="46" r="5" fill="${C.steel}"/>`;

const bulb: Draw = (a) => `
  <path d="M60 14a30 30 0 0 0-18 54v10h36V68a30 30 0 0 0-18-54z" fill="${a}" opacity=".88"/>
  <path d="M60 14a30 30 0 0 0-18 54h10a22 22 0 0 1 8-46z" fill="#fff" opacity=".35"/>
  <rect x="42" y="80" width="36" height="9" rx="3" fill="${C.steel}"/>
  <rect x="42" y="91" width="36" height="9" rx="3" fill="${C.steelDark}"/>`;

const plug: Draw = (a) => `
  <rect x="18" y="40" width="84" height="44" rx="10" fill="${a}"/>
  <rect x="18" y="40" width="84" height="14" rx="8" fill="#fff" opacity=".18"/>
  <rect x="30" y="58" width="14" height="16" rx="3" fill="${C.white}"/>
  <rect x="53" y="58" width="14" height="16" rx="3" fill="${C.white}"/>
  <rect x="76" y="58" width="14" height="16" rx="3" fill="${C.white}"/>`;

const alarm: Draw = (a) => `
  <circle cx="60" cy="60" r="42" fill="${C.white}"/>
  <circle cx="60" cy="60" r="42" fill="none" stroke="${C.steelLight}" stroke-width="4"/>
  <circle cx="60" cy="60" r="14" fill="${a}"/>
  <g fill="${C.steelLight}">
    <circle cx="60" cy="30" r="3.5"/><circle cx="60" cy="90" r="3.5"/>
    <circle cx="30" cy="60" r="3.5"/><circle cx="90" cy="60" r="3.5"/>
    <circle cx="39" cy="39" r="3.5"/><circle cx="81" cy="81" r="3.5"/>
    <circle cx="81" cy="39" r="3.5"/><circle cx="39" cy="81" r="3.5"/>
  </g>`;

const torch: Draw = (a) => `
  <rect x="20" y="48" width="52" height="26" rx="8" fill="${a}"/>
  <path d="M72 44l26-10v52l-26-10z" fill="${C.steelLight}"/>
  <rect x="20" y="48" width="52" height="9" rx="4" fill="#fff" opacity=".22"/>
  <circle cx="34" cy="61" r="5" fill="${C.grip}" opacity=".4"/>`;

const roller: Draw = (a) => `
  <rect x="24" y="26" width="62" height="24" rx="8" fill="${a}"/>
  <rect x="24" y="26" width="62" height="9" rx="4" fill="#fff" opacity=".25"/>
  <path d="M55 50v14H40v10" fill="none" stroke="${C.steel}" stroke-width="6" stroke-linecap="round"/>
  <rect x="32" y="74" width="16" height="34" rx="7" fill="${C.grip}"/>`;

const brush: Draw = (a) => `
  <rect x="46" y="12" width="20" height="40" rx="5" fill="${C.wood}"/>
  <rect x="42" y="50" width="28" height="14" rx="4" fill="${C.steelLight}"/>
  <path d="M40 64h32v30a6 6 0 0 1-6 6H46a6 6 0 0 1-6-6z" fill="${a}"/>
  <path d="M46 70v24M56 70v24M66 70v24" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>`;

const paintCan: Draw = (a) => `
  <rect x="30" y="38" width="60" height="62" rx="6" fill="${C.steelLight}"/>
  <rect x="30" y="38" width="60" height="14" rx="5" fill="${C.steel}"/>
  <rect x="34" y="58" width="52" height="30" rx="4" fill="${a}"/>
  <path d="M34 30c8-8 44-8 52 0" fill="none" stroke="${C.steelDark}" stroke-width="4" stroke-linecap="round"/>`;

const tube: Draw = (a) => `
  <rect x="42" y="30" width="36" height="70" rx="7" fill="${a}"/>
  <rect x="42" y="30" width="36" height="16" rx="7" fill="#fff" opacity=".2"/>
  <rect x="50" y="14" width="20" height="18" rx="5" fill="${C.steelDark}"/>
  <path d="M55 6h10v10h-10z" fill="${C.steel}"/>
  <rect x="48" y="58" width="24" height="8" rx="4" fill="#fff" opacity=".55"/>`;

const bottle: Draw = (a) => `
  <rect x="50" y="10" width="20" height="18" rx="4" fill="${C.steelDark}"/>
  <path d="M44 28h32l8 16v52a8 8 0 0 1-8 8H44a8 8 0 0 1-8-8V44z" fill="${a}"/>
  <rect x="40" y="56" width="40" height="26" rx="4" fill="#fff" opacity=".8"/>`;

const spade: Draw = (a) => `
  <rect x="54" y="16" width="12" height="52" rx="5" fill="${C.wood}"/>
  <path d="M44 12h32v10H44z" fill="${a}"/>
  <path d="M40 66h40v20a20 20 0 0 1-40 0z" fill="${C.steel}"/>
  <path d="M40 66h40v8H40z" fill="${C.steelLight}"/>`;

const can: Draw = (a) => `
  <path d="M28 48h48v46a8 8 0 0 1-8 8H36a8 8 0 0 1-8-8z" fill="${a}"/>
  <path d="M76 56l24-14v14l-24 8z" fill="${a}" opacity=".8"/>
  <path d="M36 48a16 16 0 0 1 32 0" fill="none" stroke="${C.steelDark}" stroke-width="5"/>`;

const hose: Draw = (a) => `
  <g fill="none" stroke="${a}" stroke-width="11" stroke-linecap="round">
    <path d="M30 88a24 24 0 0 1 0-48 20 20 0 0 1 0 40"/>
  </g>
  <circle cx="60" cy="60" r="26" fill="none" stroke="${a}" stroke-width="11"/>
  <rect x="86" y="52" width="22" height="10" rx="5" fill="${C.brass}"/>`;

const screw: Draw = (a) => `
  <path d="M46 18h28l-4 16H50z" fill="${a}"/>
  <path d="M50 34h20l-3 22h-14z" fill="${C.steel}"/>
  <path d="M53 56h14l-7 50z" fill="${C.steelLight}"/>
  <path d="M50 40h20M51 48h18M53 58h14M55 68h10M56 78h8"
        stroke="${C.steelDark}" stroke-width="3" stroke-linecap="round" opacity=".55"/>`;

const pack: Draw = (a) => `
  <path d="M26 30h68v66a8 8 0 0 1-8 8H34a8 8 0 0 1-8-8z" fill="${C.white}"/>
  <path d="M26 30h68v66a8 8 0 0 1-8 8H34a8 8 0 0 1-8-8z" fill="none" stroke="${C.steelLight}" stroke-width="3"/>
  <path d="M26 30h68v20H26z" fill="${a}"/>
  <g fill="${a}" opacity=".8">
    <circle cx="44" cy="66" r="7"/><circle cx="62" cy="66" r="7"/><circle cx="80" cy="66" r="7"/>
    <circle cx="44" cy="86" r="7"/><circle cx="62" cy="86" r="7"/><circle cx="80" cy="86" r="7"/>
  </g>`;

const sheet: Draw = (a) => `
  <path d="M18 34h84v58H18z" fill="${C.wood}"/>
  <path d="M18 34h84v12H18z" fill="${C.woodDark}"/>
  <path d="M18 34l84 58" stroke="${a}" stroke-width="3" opacity=".3"/>
  <path d="M18 92h84" stroke="${C.woodDark}" stroke-width="5"/>`;

const planks: Draw = (a) => `
  <rect x="16" y="34" width="88" height="18" rx="4" fill="${C.wood}"/>
  <rect x="16" y="56" width="88" height="18" rx="4" fill="${C.woodDark}"/>
  <rect x="16" y="78" width="88" height="18" rx="4" fill="${C.wood}"/>
  <path d="M34 34v18M72 34v18M50 56v18M88 56v18M40 78v18M78 78v18"
        stroke="${a}" stroke-width="2" opacity=".35"/>`;

const tiles: Draw = (a) => `
  <rect x="18" y="26" width="40" height="40" rx="5" fill="${a}"/>
  <rect x="62" y="26" width="40" height="40" rx="5" fill="${a}" opacity=".6"/>
  <rect x="18" y="70" width="40" height="40" rx="5" fill="${a}" opacity=".6"/>
  <rect x="62" y="70" width="40" height="40" rx="5" fill="${a}"/>`;

const box: Draw = (a) => `
  <path d="M20 44h80v52a8 8 0 0 1-8 8H28a8 8 0 0 1-8-8z" fill="${a}"/>
  <path d="M14 28h92v18H14z" fill="${a}" opacity=".72"/>
  <rect x="50" y="56" width="20" height="8" rx="4" fill="${C.white}" opacity=".85"/>`;

const shelf: Draw = (a) => `
  <rect x="20" y="16" width="10" height="90" rx="3" fill="${a}"/>
  <rect x="90" y="16" width="10" height="90" rx="3" fill="${a}"/>
  <rect x="20" y="34" width="80" height="9" rx="3" fill="${C.steelLight}"/>
  <rect x="20" y="58" width="80" height="9" rx="3" fill="${C.steelLight}"/>
  <rect x="20" y="82" width="80" height="9" rx="3" fill="${C.steelLight}"/>`;

const toolbox: Draw = (a) => `
  <path d="M18 50h84v46a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8z" fill="${a}"/>
  <path d="M18 50h84v12H18z" fill="#fff" opacity=".2"/>
  <path d="M44 50V38a16 16 0 0 1 32 0v12" fill="none" stroke="${C.grip}" stroke-width="7"/>
  <rect x="46" y="72" width="28" height="9" rx="4" fill="${C.white}" opacity=".8"/>`;

const hardhat: Draw = (a) => `
  <path d="M24 82a36 36 0 0 1 72 0z" fill="${a}"/>
  <path d="M46 50a14 14 0 0 1 28 0v12H46z" fill="${a}"/>
  <path d="M46 50a14 14 0 0 1 28 0h-6a8 8 0 0 0-16 0z" fill="#fff" opacity=".3"/>
  <rect x="16" y="82" width="88" height="12" rx="6" fill="${C.grip}"/>`;

const goggles: Draw = (a) => `
  <rect x="14" y="42" width="92" height="36" rx="18" fill="${a}"/>
  <circle cx="42" cy="60" r="13" fill="${C.glass}"/>
  <circle cx="78" cy="60" r="13" fill="${C.glass}"/>
  <path d="M6 52h10M104 52h10" stroke="${C.grip}" stroke-width="7" stroke-linecap="round"/>`;

const glove: Draw = (a) => `
  <path d="M36 54V32a7 7 0 0 1 14 0v20h4V26a7 7 0 0 1 14 0v26h4V34a7 7 0 0 1 14 0v40
           a26 26 0 0 1-26 26h-8a22 22 0 0 1-22-22V50a7 7 0 0 1 6-6z" fill="${a}"/>
  <path d="M34 82h52v8H34z" fill="#fff" opacity=".28"/>`;

const seal: Draw = (a) => `
  <rect x="16" y="40" width="88" height="16" rx="8" fill="${a}"/>
  <rect x="16" y="64" width="88" height="16" rx="8" fill="${a}" opacity=".6"/>
  <path d="M16 48h88M16 72h88" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-dasharray="7 7"/>
  <rect x="16" y="88" width="88" height="10" rx="5" fill="${C.steelLight}"/>`;

const roll: Draw = (a) => `
  <rect x="24" y="30" width="72" height="60" rx="10" fill="${a}"/>
  <ellipse cx="24" cy="60" rx="12" ry="30" fill="${a}" opacity=".7"/>
  <ellipse cx="96" cy="60" rx="12" ry="30" fill="${C.white}" opacity=".55"/>
  <path d="M40 44v32M56 44v32M72 44v32" stroke="#fff" stroke-opacity=".3" stroke-width="4"/>`;

const ladder: Draw = (a) => `
  <rect x="28" y="14" width="10" height="92" rx="4" fill="${a}"/>
  <rect x="82" y="14" width="10" height="92" rx="4" fill="${a}"/>
  <rect x="38" y="30" width="44" height="8" rx="3" fill="${C.steelLight}"/>
  <rect x="38" y="52" width="44" height="8" rx="3" fill="${C.steelLight}"/>
  <rect x="38" y="74" width="44" height="8" rx="3" fill="${C.steelLight}"/>`;

const bag: Draw = (a) => `
  <path d="M32 40h56l8 58a8 8 0 0 1-8 9H32a8 8 0 0 1-8-9z" fill="${a}"/>
  <path d="M32 40h56l3 20H29z" fill="#fff" opacity=".2"/>
  <path d="M40 26h40l4 14H36z" fill="${C.grip}" opacity=".75"/>`;

const bucket: Draw = (a) => `
  <path d="M28 42h64l-7 58a8 8 0 0 1-8 7H43a8 8 0 0 1-8-7z" fill="${a}"/>
  <rect x="24" y="32" width="72" height="12" rx="6" fill="${a}" opacity=".7"/>
  <path d="M36 32a24 24 0 0 1 48 0" fill="none" stroke="${C.steel}" stroke-width="4"/>`;

const barrow: Draw = (a) => `
  <path d="M24 38h68l-12 34H36z" fill="${a}"/>
  <path d="M24 38h68l-3 9H27z" fill="#fff" opacity=".22"/>
  <path d="M36 72l-8 22M80 72l10 16" stroke="${C.steelDark}" stroke-width="6" stroke-linecap="round"/>
  <circle cx="46" cy="92" r="13" fill="${C.grip}"/>
  <circle cx="46" cy="92" r="5" fill="${C.steelLight}"/>`;

const clamp: Draw = (a) => `
  <path d="M28 20h12v80H28z" fill="${a}"/>
  <path d="M28 20h54v12H28zM28 88h54v12H28z" fill="${a}"/>
  <rect x="70" y="52" width="34" height="10" rx="5" fill="${C.steel}"/>
  <circle cx="106" cy="57" r="9" fill="${C.steelDark}"/>`;

const meter: Draw = (a) => `
  <rect x="26" y="18" width="68" height="84" rx="10" fill="${a}"/>
  <rect x="36" y="30" width="48" height="28" rx="5" fill="${C.white}"/>
  <path d="M44 44h32" stroke="${C.grip}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="60" cy="76" r="13" fill="${C.grip}" opacity=".5"/>
  <circle cx="60" cy="76" r="4" fill="${C.white}"/>`;

/* --------------------------- selection by name ---------------------------- */

const ART: Record<string, Draw> = {
  drill, impactDriver, hammer, wrench, screwdriver, saw, grinder, drillbit,
  tape, measure, level, tap, plunger, pipe, handle, doorstop, wedge, closer, hinge,
  numerals, chain, viewer, padlock, cylLock, hook, bulb, plug, alarm, torch,
  roller, brush, paintCan, tube, bottle, spade, can, hose, screw, pack, sheet,
  planks, tiles, box, shelf, toolbox, hardhat, goggles, glove, seal, roll,
  ladder, bag, bucket, barrow, clamp, meter,
};

/**
 * Name keywords, most specific first. The first hit wins, so "door wedge" must
 * be tested before the bare "door" that would otherwise claim it.
 */
const NAME_RULES: Array<[RegExp, string]> = [
  [/door wedge|rubber wedge|\\bwedge\\b/i, 'wedge'],
  [/doorstop/i, 'doorstop'],
  [/door closer|closer/i, 'closer'],
  [/door viewer|viewer|spy/i, 'viewer'],
  [/door chain|restrictor cable/i, 'chain'],
  [/numerals|letter plate|letterbox|keyhole cover/i, 'numerals'],
  [/hinge/i, 'hinge'],
  [/handle|lever/i, 'handle'],
  [/padlock|padbolt|key safe/i, 'padlock'],
  [/cylinder lock|mortice|deadlock/i, 'cylLock'],
  [/hook|bracket/i, 'hook'],

  [/impact driver/i, 'impactDriver'],
  [/combi drill|drill\b/i, 'drill'],
  [/bit set|auger bit|drill bit/i, 'drillbit'],
  [/circular saw|jigsaw|hacksaw|saw\b/i, 'saw'],
  [/grinder|sander/i, 'grinder'],
  [/screwdriver/i, 'screwdriver'],
  [/hammer/i, 'hammer'],
  [/spanner|wrench/i, 'wrench'],
  [/vice|clamp|workbench/i, 'clamp'],
  [/multimeter|tester|caliper/i, 'meter'],
  [/tape measure|measure/i, 'measure'],
  [/spirit level|level/i, 'level'],
  [/chalk line/i, 'measure'],
  [/files|wire brush/i, 'brush'],
  [/soldering/i, 'screwdriver'],

  [/tap cartridge|tap connector|\btap\b/i, 'tap'],
  [/plunger/i, 'plunger'],
  [/pipe|lagging|waste trap|flush valve|drain auger|immersion/i, 'pipe'],
  [/radiator bleed/i, 'wrench'],

  [/wall plug|screws|fixings|cable ties|cable clips|clips|spacers|gripper|dowel/i, 'pack'],
  [/\bscrew\b|organiser/i, 'screw'],
  [/ptfe|gaffer|masking tape|tape\b/i, 'tape'],
  [/sealant|foam filler|glue|epoxy|adhesive|caulk|filler|paste/i, 'tube'],

  [/paint brush|brush set/i, 'brush'],
  [/roller/i, 'roller'],
  [/paint|undercoat/i, 'paintCan'],
  [/sandpaper|dust sheet|membrane|film kit|felt/i, 'sheet'],

  [/bulb|floodlight|lamp|work light/i, 'bulb'],
  [/torch/i, 'torch'],
  [/extension lead|junction box|socket/i, 'plug'],
  [/alarm|detector/i, 'alarm'],

  [/ladder|step ladder|platform/i, 'ladder'],
  [/goggles/i, 'goggles'],
  [/gloves/i, 'glove'],
  [/hard hat|knee pads|ear defenders|dust mask|first aid|fire blanket/i, 'hardhat'],

  [/wheelbarrow/i, 'barrow'],
  [/spade|secateurs|weed/i, 'spade'],
  [/hose/i, 'hose'],
  [/watering can/i, 'can'],
  [/compost bin|slug|bird feeder/i, 'bucket'],

  [/shelving|shelf/i, 'shelf'],
  [/toolbox|tool bag/i, 'toolbox'],
  [/storage box|box\b/i, 'box'],

  [/bags|cloths|sacks/i, 'pack'],
  [/descaler|remover|unblocker|cleaner/i, 'bottle'],

  [/laminate|skirting|batten|flooring/i, 'planks'],
  [/mdf|plywood|sheet/i, 'sheet'],
  [/underlay|insulation roll|roll\b/i, 'roll'],
  [/tile|grout/i, 'tiles'],
  [/sand|cement|postcrete|gravel|compound/i, 'bag'],
  [/draught|excluder|seal|sweep|balloon/i, 'seal'],
  [/guttering|downpipe/i, 'pipe'],
  [/fence post|spike|gate/i, 'hook'],
  [/patch/i, 'sheet'],
];

const BY_CATEGORY: Record<string, Draw> = {
  'Power Tools': drill,
  Drilling: drillbit,
  'Hand Tools': hammer,
  Workshop: wrench,
  Measuring: measure,
  Plumbing: tap,
  'Door Hardware': handle,
  Security: padlock,
  Safety: hardhat,
  Electrical: plug,
  Lighting: bulb,
  Paint: paintCan,
  Decorating: roller,
  Garden: spade,
  'Gate & Shed': hook,
  Fixings: screw,
  Adhesives: tube,
  Flooring: planks,
  Timber: planks,
  Tiling: tiles,
  Roofing: tiles,
  Storage: box,
  Household: bucket,
  Weatherproofing: seal,
  Insulation: roll,
  Aggregates: bag,
  Access: ladder,
};

function pick(name: string, category: string): Draw {
  for (const [re, key] of NAME_RULES) {
    if (re.test(name)) return ART[key] ?? box;
  }
  return BY_CATEGORY[category] ?? box;
}

/** Stable per-product jitter so identical artwork is not pixel-identical. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Returns an inline SVG illustration for a product.
 *
 * Pass the product name to get name-specific artwork; pass just a category (as
 * the department tiles do) and it falls back to the category illustration.
 */
export function productArt(sku: string, category: string, name = '', size = '100%'): string {
  const draw = pick(name, category);
  const accent = ACCENTS[category] ?? '#64748b';
  const rot = (hash(sku) % 7) - 3;
  return `<svg class="art" viewBox="0 0 120 120" width="${size}" height="${size}"
       role="img" aria-label="${category}" focusable="false">
    <g transform="rotate(${rot} 60 60)">${draw(accent)}</g>
  </svg>`;
}

/** The accent colour used for a category, for tinting the tile behind the art. */
export function categoryAccent(category: string): string {
  return ACCENTS[category] ?? '#64748b';
}
