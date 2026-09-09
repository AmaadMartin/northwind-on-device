/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * The Northwind Hardware catalogue.
 *
 * Fictional shop, fictional products. The first five entries are curated for
 * the demo: the words a shopper would naturally use do not appear in the
 * product name, so a text search cannot find them.
 */

import type { Product, Review } from './types.js';

export const PRODUCTS: Product[] = [
 {
  "sku": "NW-1000",
  "name": "Hinge Pin Doorstop, Satin Nickel",
  "category": "Door Hardware",
  "aisle": "12",
  "description": "Fits over an existing hinge pin to arrest a swinging door before it strikes the wall. Adjustable rubber buffer absorbs the impact so the door closes quietly instead of banging. No drilling required.",
  "priceCents": 1499,
  "rating": 4.8,
  "reviewCount": 213
 },
 {
  "sku": "NW-1001",
  "name": "Ceramic Disc Tap Cartridge 40mm",
  "category": "Plumbing",
  "aisle": "07",
  "description": "Replacement cartridge for mixer taps that continue to let water past when fully turned off. Ceramic discs seal against grit and lime that wear out older rubber seals, curing a persistent drip.",
  "priceCents": 4999,
  "rating": 3.7,
  "reviewCount": 285
 },
 {
  "sku": "NW-1002",
  "name": "Cabin Hook and Eye, 100mm Galvanised",
  "category": "Gate & Shed",
  "aisle": "14",
  "description": "Holds a shed or gate leaf firmly against its frame so wind cannot swing it open. Galvanised finish resists rust outdoors. Supplied with matching screws.",
  "priceCents": 499,
  "rating": 4.1,
  "reviewCount": 40
 },
 {
  "sku": "NW-1003",
  "name": "Self-Adhesive Wall Repair Patch 150mm",
  "category": "Decorating",
  "aisle": "03",
  "description": "Aluminium mesh patch that bridges a hole in plasterboard so filler has something to key into. Sticks directly over the damage; skim, sand and paint.",
  "priceCents": 2999,
  "rating": 3.9,
  "reviewCount": 55
 },
 {
  "sku": "NW-1004",
  "name": "Brush Door Sweep, 838mm Aluminium",
  "category": "Weatherproofing",
  "aisle": "09",
  "description": "Screws to the bottom rail of an external door and seals the gap to the threshold. Stops cold air, dust and insects entering underneath and cuts heating loss.",
  "priceCents": 1999,
  "rating": 4.1,
  "reviewCount": 134
 },
 {
  "sku": "NW-1005",
  "name": "Claw Hammer 16oz Fibreglass",
  "category": "Hand Tools",
  "aisle": "01",
  "description": "Forged steel head on a shock-absorbing fibreglass shaft.",
  "priceCents": 499,
  "rating": 4.3,
  "reviewCount": 41
 },
 {
  "sku": "NW-1006",
  "name": "Combination Spanner Set, 8 Piece",
  "category": "Hand Tools",
  "aisle": "01",
  "description": "Metric spanners 8mm to 19mm in a roll-up pouch.",
  "priceCents": 12999,
  "rating": 4.3,
  "reviewCount": 125
 },
 {
  "sku": "NW-1007",
  "name": "Ratcheting Screwdriver, 12 Bit",
  "category": "Hand Tools",
  "aisle": "01",
  "description": "Reversible ratchet handle with bits stored in the grip.",
  "priceCents": 4999,
  "rating": 4.4,
  "reviewCount": 42
 },
 {
  "sku": "NW-1008",
  "name": "Adjustable Wrench 250mm",
  "category": "Hand Tools",
  "aisle": "01",
  "description": "Wide-opening jaw with a knurled thumbwheel.",
  "priceCents": 3499,
  "rating": 4.4,
  "reviewCount": 36
 },
 {
  "sku": "NW-1009",
  "name": "Retractable Tape Measure 8m",
  "category": "Measuring",
  "aisle": "02",
  "description": "Nylon-coated blade with a magnetic hook and belt clip.",
  "priceCents": 899,
  "rating": 3.7,
  "reviewCount": 79
 },
 {
  "sku": "NW-1010",
  "name": "Spirit Level 600mm",
  "category": "Measuring",
  "aisle": "02",
  "description": "Milled aluminium body with horizontal and vertical vials.",
  "priceCents": 1299,
  "rating": 4.1,
  "reviewCount": 287
 },
 {
  "sku": "NW-1011",
  "name": "Digital Vernier Caliper 150mm",
  "category": "Measuring",
  "aisle": "02",
  "description": "Stainless jaws, metric and imperial, with a data hold button.",
  "priceCents": 499,
  "rating": 4.3,
  "reviewCount": 297
 },
 {
  "sku": "NW-1012",
  "name": "Chalk Line Reel and Blue Chalk",
  "category": "Measuring",
  "aisle": "02",
  "description": "Sealed reel with a folding crank and 30m of braided line.",
  "priceCents": 12999,
  "rating": 4.5,
  "reviewCount": 63
 },
 {
  "sku": "NW-1013",
  "name": "Cordless Combi Drill 18V",
  "category": "Power Tools",
  "aisle": "04",
  "description": "Two-speed gearbox with hammer action for masonry.",
  "priceCents": 3499,
  "rating": 4.3,
  "reviewCount": 107
 },
 {
  "sku": "NW-1014",
  "name": "Impact Driver 18V Brushless",
  "category": "Power Tools",
  "aisle": "04",
  "description": "High torque driver for long fixings into timber.",
  "priceCents": 1499,
  "rating": 3.7,
  "reviewCount": 43
 },
 {
  "sku": "NW-1015",
  "name": "Random Orbit Sander 125mm",
  "category": "Power Tools",
  "aisle": "04",
  "description": "Hook-and-loop pad with dust extraction port.",
  "priceCents": 3499,
  "rating": 3.7,
  "reviewCount": 116
 },
 {
  "sku": "NW-1016",
  "name": "Circular Saw 190mm",
  "category": "Power Tools",
  "aisle": "04",
  "description": "Bevel adjustment to 45 degrees with a rip fence.",
  "priceCents": 2499,
  "rating": 4.5,
  "reviewCount": 229
 },
 {
  "sku": "NW-1017",
  "name": "Jigsaw with Pendulum Action",
  "category": "Power Tools",
  "aisle": "04",
  "description": "Tool-free blade change and variable speed.",
  "priceCents": 8999,
  "rating": 4.0,
  "reviewCount": 310
 },
 {
  "sku": "NW-1018",
  "name": "Angle Grinder 115mm",
  "category": "Power Tools",
  "aisle": "04",
  "description": "Restart protection and a side handle.",
  "priceCents": 2499,
  "rating": 4.1,
  "reviewCount": 138
 },
 {
  "sku": "NW-1019",
  "name": "Masonry Drill Bit Set, 5 Piece",
  "category": "Drilling",
  "aisle": "04",
  "description": "Carbide tips for brick, block and concrete.",
  "priceCents": 8999,
  "rating": 3.8,
  "reviewCount": 135
 },
 {
  "sku": "NW-1020",
  "name": "Wood Auger Bit Set, 6 Piece",
  "category": "Drilling",
  "aisle": "04",
  "description": "Self-feeding screw point for fast boring in timber.",
  "priceCents": 499,
  "rating": 4.3,
  "reviewCount": 279
 },
 {
  "sku": "NW-1021",
  "name": "Wall Plugs, Brown, 100 Pack",
  "category": "Fixings",
  "aisle": "05",
  "description": "Expansion plugs for 6mm holes in brick and block.",
  "priceCents": 2499,
  "rating": 4.7,
  "reviewCount": 240
 },
 {
  "sku": "NW-1022",
  "name": "Wood Screws 4x40mm, 200 Pack",
  "category": "Fixings",
  "aisle": "05",
  "description": "Countersunk pozi head with a partial thread.",
  "priceCents": 1299,
  "rating": 4.4,
  "reviewCount": 48
 },
 {
  "sku": "NW-1023",
  "name": "Heavy Duty Frame Fixings, 10 Pack",
  "category": "Fixings",
  "aisle": "05",
  "description": "Through-fixing for door and window frames into masonry.",
  "priceCents": 499,
  "rating": 4.3,
  "reviewCount": 95
 },
 {
  "sku": "NW-1024",
  "name": "Plasterboard Fixings, 25 Pack",
  "category": "Fixings",
  "aisle": "05",
  "description": "Self-drilling anchors for hollow walls.",
  "priceCents": 8999,
  "rating": 4.0,
  "reviewCount": 261
 },
 {
  "sku": "NW-1025",
  "name": "Cable Ties 200mm, Black, 100 Pack",
  "category": "Fixings",
  "aisle": "05",
  "description": "UV-stable nylon for outdoor cable runs.",
  "priceCents": 1999,
  "rating": 3.7,
  "reviewCount": 50
 },
 {
  "sku": "NW-1026",
  "name": "Gaffer Tape 50mm x 50m",
  "category": "Adhesives",
  "aisle": "06",
  "description": "Cloth-backed tape that tears by hand and leaves little residue.",
  "priceCents": 8999,
  "rating": 4.3,
  "reviewCount": 171
 },
 {
  "sku": "NW-1027",
  "name": "Clear Silicone Sealant 300ml",
  "category": "Adhesives",
  "aisle": "06",
  "description": "Mould-resistant sealant for baths, sinks and shower trays.",
  "priceCents": 1499,
  "rating": 4.5,
  "reviewCount": 315
 },
 {
  "sku": "NW-1028",
  "name": "Expanding Foam Filler 500ml",
  "category": "Adhesives",
  "aisle": "06",
  "description": "Fills large voids around pipework and cavities.",
  "priceCents": 2499,
  "rating": 4.4,
  "reviewCount": 244
 },
 {
  "sku": "NW-1029",
  "name": "Wood Glue, Interior, 500ml",
  "category": "Adhesives",
  "aisle": "06",
  "description": "PVA adhesive with a 20 minute open time.",
  "priceCents": 499,
  "rating": 4.7,
  "reviewCount": 149
 },
 {
  "sku": "NW-1030",
  "name": "Two Part Epoxy Adhesive 24ml",
  "category": "Adhesives",
  "aisle": "06",
  "description": "Bonds metal, ceramic and most rigid plastics.",
  "priceCents": 2499,
  "rating": 4.5,
  "reviewCount": 44
 },
 {
  "sku": "NW-1031",
  "name": "Basin Waste Trap, Bottle Type",
  "category": "Plumbing",
  "aisle": "07",
  "description": "Removable bowl for clearing blockages without tools.",
  "priceCents": 349,
  "rating": 4.6,
  "reviewCount": 169
 },
 {
  "sku": "NW-1032",
  "name": "PTFE Thread Seal Tape 12m",
  "category": "Plumbing",
  "aisle": "07",
  "description": "Wraps threaded joints to stop weeping at the fitting.",
  "priceCents": 4999,
  "rating": 4.4,
  "reviewCount": 239
 },
 {
  "sku": "NW-1033",
  "name": "Flexible Tap Connector 300mm",
  "category": "Plumbing",
  "aisle": "07",
  "description": "Braided hose linking a tap tail to a supply pipe.",
  "priceCents": 1299,
  "rating": 4.5,
  "reviewCount": 188
 },
 {
  "sku": "NW-1034",
  "name": "Radiator Bleed Key, Brass",
  "category": "Plumbing",
  "aisle": "07",
  "description": "Square drive key for releasing trapped air.",
  "priceCents": 349,
  "rating": 4.8,
  "reviewCount": 192
 },
 {
  "sku": "NW-1035",
  "name": "Toilet Flush Valve, Dual",
  "category": "Plumbing",
  "aisle": "07",
  "description": "Replacement valve for cisterns with two-button flush.",
  "priceCents": 699,
  "rating": 4.4,
  "reviewCount": 263
 },
 {
  "sku": "NW-1036",
  "name": "Sink Plunger, Rubber Cup",
  "category": "Plumbing",
  "aisle": "07",
  "description": "Creates suction to shift blockages in sinks and baths.",
  "priceCents": 349,
  "rating": 3.9,
  "reviewCount": 158
 },
 {
  "sku": "NW-1037",
  "name": "Drain Auger 3m",
  "category": "Plumbing",
  "aisle": "07",
  "description": "Hand-cranked spiral for clearing hair and grease.",
  "priceCents": 699,
  "rating": 4.6,
  "reviewCount": 214
 },
 {
  "sku": "NW-1038",
  "name": "Immersion Heater Element 27 inch",
  "category": "Plumbing",
  "aisle": "07",
  "description": "Incoloy element with a thermostat pocket.",
  "priceCents": 1999,
  "rating": 4.8,
  "reviewCount": 265
 },
 {
  "sku": "NW-1039",
  "name": "Loft Insulation Roll 200mm",
  "category": "Insulation",
  "aisle": "08",
  "description": "Mineral wool roll covering 5.5 square metres.",
  "priceCents": 499,
  "rating": 3.8,
  "reviewCount": 216
 },
 {
  "sku": "NW-1040",
  "name": "Pipe Lagging 22mm x 2m",
  "category": "Insulation",
  "aisle": "08",
  "description": "Split foam sleeve that slips over exposed pipework.",
  "priceCents": 2999,
  "rating": 4.0,
  "reviewCount": 81
 },
 {
  "sku": "NW-1041",
  "name": "Draught Excluder Tape 10m",
  "category": "Weatherproofing",
  "aisle": "09",
  "description": "Self-adhesive foam strip for window and door rebates.",
  "priceCents": 12999,
  "rating": 4.2,
  "reviewCount": 292
 },
 {
  "sku": "NW-1042",
  "name": "Letterbox Draught Seal",
  "category": "Weatherproofing",
  "aisle": "09",
  "description": "Twin brush seal that screws over an existing letter plate.",
  "priceCents": 1299,
  "rating": 4.5,
  "reviewCount": 194
 },
 {
  "sku": "NW-1043",
  "name": "Keyhole Cover, Chrome",
  "category": "Weatherproofing",
  "aisle": "09",
  "description": "Sprung escutcheon that closes over a cylinder keyway.",
  "priceCents": 4999,
  "rating": 4.7,
  "reviewCount": 129
 },
 {
  "sku": "NW-1044",
  "name": "Chimney Balloon 300mm",
  "category": "Weatherproofing",
  "aisle": "09",
  "description": "Inflatable block for an unused flue.",
  "priceCents": 699,
  "rating": 3.7,
  "reviewCount": 88
 },
 {
  "sku": "NW-1045",
  "name": "Secondary Glazing Film Kit",
  "category": "Weatherproofing",
  "aisle": "09",
  "description": "Shrink film and tape creating a still air gap at the glass.",
  "priceCents": 899,
  "rating": 4.5,
  "reviewCount": 17
 },
 {
  "sku": "NW-1046",
  "name": "Exterior Wood Paint 2.5L, White",
  "category": "Paint",
  "aisle": "10",
  "description": "Flexible satin finish for joinery and cladding.",
  "priceCents": 2499,
  "rating": 4.7,
  "reviewCount": 104
 },
 {
  "sku": "NW-1047",
  "name": "Masonry Paint 5L, Magnolia",
  "category": "Paint",
  "aisle": "10",
  "description": "Water-repellent coating for render and pebbledash.",
  "priceCents": 1299,
  "rating": 4.0,
  "reviewCount": 85
 },
 {
  "sku": "NW-1048",
  "name": "Undercoat 750ml, White",
  "category": "Paint",
  "aisle": "10",
  "description": "Opaque base coat for bare and primed woodwork.",
  "priceCents": 1999,
  "rating": 4.3,
  "reviewCount": 300
 },
 {
  "sku": "NW-1049",
  "name": "Paint Roller and Tray Set 9 inch",
  "category": "Decorating",
  "aisle": "03",
  "description": "Medium pile sleeve, frame and tray.",
  "priceCents": 1499,
  "rating": 4.8,
  "reviewCount": 274
 },
 {
  "sku": "NW-1050",
  "name": "Synthetic Paint Brush Set, 5 Piece",
  "category": "Decorating",
  "aisle": "03",
  "description": "Angled and flat brushes for water-based paints.",
  "priceCents": 3499,
  "rating": 4.5,
  "reviewCount": 38
 },
 {
  "sku": "NW-1051",
  "name": "Decorators Caulk 300ml, White",
  "category": "Decorating",
  "aisle": "03",
  "description": "Flexible filler for the joint between skirting and wall.",
  "priceCents": 2499,
  "rating": 4.8,
  "reviewCount": 297
 },
 {
  "sku": "NW-1052",
  "name": "Ready Mixed Filler 600g",
  "category": "Decorating",
  "aisle": "03",
  "description": "Fine surface filler for nail holes and hairline cracks.",
  "priceCents": 1999,
  "rating": 4.1,
  "reviewCount": 212
 },
 {
  "sku": "NW-1053",
  "name": "Sandpaper Assorted Grit, 10 Sheets",
  "category": "Decorating",
  "aisle": "03",
  "description": "Aluminium oxide sheets from 80 to 240 grit.",
  "priceCents": 499,
  "rating": 4.2,
  "reviewCount": 216
 },
 {
  "sku": "NW-1054",
  "name": "Dust Sheet, Cotton Twill 12x9ft",
  "category": "Decorating",
  "aisle": "03",
  "description": "Absorbent sheet that will not slide on hard floors.",
  "priceCents": 349,
  "rating": 3.8,
  "reviewCount": 117
 },
 {
  "sku": "NW-1055",
  "name": "Masking Tape 25mm x 50m",
  "category": "Decorating",
  "aisle": "03",
  "description": "Low tack tape for clean paint edges.",
  "priceCents": 2499,
  "rating": 3.8,
  "reviewCount": 185
 },
 {
  "sku": "NW-1056",
  "name": "Wallpaper Paste, 5 Roll Sachet",
  "category": "Decorating",
  "aisle": "03",
  "description": "All-purpose adhesive with a fungicide.",
  "priceCents": 3499,
  "rating": 3.7,
  "reviewCount": 11
 },
 {
  "sku": "NW-1057",
  "name": "Cylinder Lock, Euro Profile 35/45",
  "category": "Security",
  "aisle": "11",
  "description": "Anti-snap cylinder supplied with three keys.",
  "priceCents": 3499,
  "rating": 3.8,
  "reviewCount": 62
 },
 {
  "sku": "NW-1058",
  "name": "Mortice Deadlock, 5 Lever",
  "category": "Security",
  "aisle": "11",
  "description": "British Standard lock for external timber doors.",
  "priceCents": 1499,
  "rating": 4.4,
  "reviewCount": 47
 },
 {
  "sku": "NW-1059",
  "name": "Door Chain, Satin Chrome",
  "category": "Security",
  "aisle": "11",
  "description": "Restrictor allowing a door to open a short distance.",
  "priceCents": 12999,
  "rating": 3.9,
  "reviewCount": 203
 },
 {
  "sku": "NW-1060",
  "name": "Window Restrictor Cable Kit",
  "category": "Security",
  "aisle": "11",
  "description": "Limits opening while allowing ventilation.",
  "priceCents": 699,
  "rating": 4.4,
  "reviewCount": 188
 },
 {
  "sku": "NW-1061",
  "name": "Padlock, Weatherproof 50mm",
  "category": "Security",
  "aisle": "11",
  "description": "Brass body with a shrouded hardened shackle.",
  "priceCents": 3499,
  "rating": 4.1,
  "reviewCount": 73
 },
 {
  "sku": "NW-1062",
  "name": "Key Safe, Wall Mounted",
  "category": "Security",
  "aisle": "11",
  "description": "Combination box for spare keys, bolts to masonry.",
  "priceCents": 499,
  "rating": 4.7,
  "reviewCount": 249
 },
 {
  "sku": "NW-1063",
  "name": "Door Viewer, 200 Degree",
  "category": "Security",
  "aisle": "11",
  "description": "Wide angle spy hole for doors up to 58mm thick.",
  "priceCents": 2499,
  "rating": 4.2,
  "reviewCount": 54
 },
 {
  "sku": "NW-1064",
  "name": "Butt Hinges 75mm, Pair",
  "category": "Door Hardware",
  "aisle": "12",
  "description": "Steel hinges for internal doors, screws included.",
  "priceCents": 699,
  "rating": 3.7,
  "reviewCount": 186
 },
 {
  "sku": "NW-1065",
  "name": "Lever Door Handles, Pair, Chrome",
  "category": "Door Hardware",
  "aisle": "12",
  "description": "Sprung levers on rose backplates.",
  "priceCents": 6999,
  "rating": 3.9,
  "reviewCount": 93
 },
 {
  "sku": "NW-1066",
  "name": "Overhead Door Closer, Adjustable",
  "category": "Door Hardware",
  "aisle": "12",
  "description": "Controls closing speed and latching action.",
  "priceCents": 2999,
  "rating": 3.6,
  "reviewCount": 281
 },
 {
  "sku": "NW-1067",
  "name": "Letter Plate, 254mm Brass",
  "category": "Door Hardware",
  "aisle": "12",
  "description": "Sprung flap with an internal draught seal.",
  "priceCents": 1499,
  "rating": 3.8,
  "reviewCount": 289
 },
 {
  "sku": "NW-1068",
  "name": "Door Numerals 0 to 9, Chrome",
  "category": "Door Hardware",
  "aisle": "12",
  "description": "Self-adhesive and screw fixing options.",
  "priceCents": 349,
  "rating": 4.6,
  "reviewCount": 163
 },
 {
  "sku": "NW-1069",
  "name": "Rubber Door Wedge",
  "category": "Door Hardware",
  "aisle": "12",
  "description": "Holds a door open on smooth and carpeted floors.",
  "priceCents": 4999,
  "rating": 4.7,
  "reviewCount": 144
 },
 {
  "sku": "NW-1070",
  "name": "Shed Padbolt 150mm",
  "category": "Gate & Shed",
  "aisle": "14",
  "description": "Galvanised bolt taking a padlock through the staple.",
  "priceCents": 2999,
  "rating": 4.1,
  "reviewCount": 96
 },
 {
  "sku": "NW-1071",
  "name": "Gate Hinges, Tee Pattern 300mm",
  "category": "Gate & Shed",
  "aisle": "14",
  "description": "Heavy pattern hinges for timber gates.",
  "priceCents": 1499,
  "rating": 4.6,
  "reviewCount": 283
 },
 {
  "sku": "NW-1072",
  "name": "Fence Post Spike 75mm",
  "category": "Gate & Shed",
  "aisle": "14",
  "description": "Driven spike supporting a post without concrete.",
  "priceCents": 2999,
  "rating": 4.6,
  "reviewCount": 179
 },
 {
  "sku": "NW-1073",
  "name": "Roofing Felt Adhesive 2.5L",
  "category": "Roofing",
  "aisle": "15",
  "description": "Cold-applied bitumen for lapping felt.",
  "priceCents": 4999,
  "rating": 3.9,
  "reviewCount": 110
 },
 {
  "sku": "NW-1074",
  "name": "Guttering Union Bracket 112mm",
  "category": "Roofing",
  "aisle": "15",
  "description": "Joins two lengths of half round gutter.",
  "priceCents": 8999,
  "rating": 3.9,
  "reviewCount": 216
 },
 {
  "sku": "NW-1075",
  "name": "Downpipe Shoe 68mm",
  "category": "Roofing",
  "aisle": "15",
  "description": "Directs rainwater away from the wall base.",
  "priceCents": 6999,
  "rating": 4.6,
  "reviewCount": 113
 },
 {
  "sku": "NW-1076",
  "name": "Roof Tile Clips, 50 Pack",
  "category": "Roofing",
  "aisle": "15",
  "description": "Stainless clips resisting wind uplift.",
  "priceCents": 2999,
  "rating": 4.2,
  "reviewCount": 25
 },
 {
  "sku": "NW-1077",
  "name": "Extension Lead 4 Gang 5m",
  "category": "Electrical",
  "aisle": "16",
  "description": "Surge protected with individually switched sockets.",
  "priceCents": 349,
  "rating": 4.6,
  "reviewCount": 252
 },
 {
  "sku": "NW-1078",
  "name": "LED Bulb E27 9W Warm White",
  "category": "Electrical",
  "aisle": "16",
  "description": "Non-dimmable, 806 lumens, 15000 hour life.",
  "priceCents": 1299,
  "rating": 3.9,
  "reviewCount": 187
 },
 {
  "sku": "NW-1079",
  "name": "Outdoor PIR Floodlight 20W",
  "category": "Electrical",
  "aisle": "16",
  "description": "Adjustable detection range and dusk sensor.",
  "priceCents": 2499,
  "rating": 4.7,
  "reviewCount": 189
 },
 {
  "sku": "NW-1080",
  "name": "Smoke Alarm, Optical, 10 Year",
  "category": "Electrical",
  "aisle": "16",
  "description": "Sealed lithium cell with a hush button.",
  "priceCents": 1499,
  "rating": 3.7,
  "reviewCount": 63
 },
 {
  "sku": "NW-1081",
  "name": "Carbon Monoxide Alarm",
  "category": "Electrical",
  "aisle": "16",
  "description": "Digital display with a seven year sensor.",
  "priceCents": 899,
  "rating": 4.2,
  "reviewCount": 183
 },
 {
  "sku": "NW-1082",
  "name": "Cable Clips 6mm, 100 Pack",
  "category": "Electrical",
  "aisle": "16",
  "description": "Masonry nails for round two core cable.",
  "priceCents": 899,
  "rating": 4.2,
  "reviewCount": 11
 },
 {
  "sku": "NW-1083",
  "name": "Junction Box 30A, 4 Terminal",
  "category": "Electrical",
  "aisle": "16",
  "description": "Screw terminals in a fire retardant enclosure.",
  "priceCents": 2499,
  "rating": 4.8,
  "reviewCount": 187
 },
 {
  "sku": "NW-1084",
  "name": "Socket Tester with Loop Impedance",
  "category": "Electrical",
  "aisle": "16",
  "description": "Indicates wiring faults in a standard outlet.",
  "priceCents": 8999,
  "rating": 4.4,
  "reviewCount": 72
 },
 {
  "sku": "NW-1085",
  "name": "Voltage Tester Screwdriver",
  "category": "Electrical",
  "aisle": "16",
  "description": "Neon indicator for live conductor checks.",
  "priceCents": 1999,
  "rating": 4.6,
  "reviewCount": 113
 },
 {
  "sku": "NW-1086",
  "name": "Step Ladder 4 Tread, Aluminium",
  "category": "Access",
  "aisle": "17",
  "description": "Non-slip treads with a moulded top platform.",
  "priceCents": 2499,
  "rating": 4.8,
  "reviewCount": 233
 },
 {
  "sku": "NW-1087",
  "name": "Extension Ladder 3.0m",
  "category": "Access",
  "aisle": "17",
  "description": "Two section ladder with stabiliser bar.",
  "priceCents": 8999,
  "rating": 4.4,
  "reviewCount": 55
 },
 {
  "sku": "NW-1088",
  "name": "Work Platform, Folding",
  "category": "Access",
  "aisle": "17",
  "description": "Raises a person one step for decorating.",
  "priceCents": 8999,
  "rating": 4.8,
  "reviewCount": 213
 },
 {
  "sku": "NW-1089",
  "name": "Safety Goggles, Anti-Fog",
  "category": "Safety",
  "aisle": "18",
  "description": "Wraparound lens over prescription glasses.",
  "priceCents": 2499,
  "rating": 4.1,
  "reviewCount": 54
 },
 {
  "sku": "NW-1090",
  "name": "Ear Defenders, Folding",
  "category": "Safety",
  "aisle": "18",
  "description": "28dB attenuation with padded cups.",
  "priceCents": 6999,
  "rating": 3.8,
  "reviewCount": 76
 },
 {
  "sku": "NW-1091",
  "name": "Dust Mask FFP2, 10 Pack",
  "category": "Safety",
  "aisle": "18",
  "description": "Moulded cup with an exhalation valve.",
  "priceCents": 349,
  "rating": 3.8,
  "reviewCount": 249
 },
 {
  "sku": "NW-1092",
  "name": "Work Gloves, Cut Resistant",
  "category": "Safety",
  "aisle": "18",
  "description": "Nitrile coated palm with a knitted back.",
  "priceCents": 8999,
  "rating": 4.5,
  "reviewCount": 316
 },
 {
  "sku": "NW-1093",
  "name": "Knee Pads, Gel Filled",
  "category": "Safety",
  "aisle": "18",
  "description": "Adjustable straps that will not mark floors.",
  "priceCents": 2499,
  "rating": 4.5,
  "reviewCount": 190
 },
 {
  "sku": "NW-1094",
  "name": "First Aid Kit, Workplace",
  "category": "Safety",
  "aisle": "18",
  "description": "Contents to the recommended workplace list.",
  "priceCents": 699,
  "rating": 4.3,
  "reviewCount": 78
 },
 {
  "sku": "NW-1095",
  "name": "Fire Blanket 1m x 1m",
  "category": "Safety",
  "aisle": "18",
  "description": "Quick release tabs in a wall mounted pouch.",
  "priceCents": 349,
  "rating": 3.6,
  "reviewCount": 63
 },
 {
  "sku": "NW-1096",
  "name": "Wheelbarrow 85L, Pneumatic Tyre",
  "category": "Garden",
  "aisle": "19",
  "description": "Galvanised pan on a tubular steel frame.",
  "priceCents": 2999,
  "rating": 4.6,
  "reviewCount": 82
 },
 {
  "sku": "NW-1097",
  "name": "Garden Spade, Stainless",
  "category": "Garden",
  "aisle": "19",
  "description": "Mirror polished head on an ash shaft.",
  "priceCents": 1999,
  "rating": 4.9,
  "reviewCount": 110
 },
 {
  "sku": "NW-1098",
  "name": "Secateurs, Bypass",
  "category": "Garden",
  "aisle": "19",
  "description": "Hardened blade with a sap groove.",
  "priceCents": 12999,
  "rating": 4.7,
  "reviewCount": 25
 },
 {
  "sku": "NW-1099",
  "name": "Garden Hose 15m with Fittings",
  "category": "Garden",
  "aisle": "19",
  "description": "Three layer hose resistant to kinking.",
  "priceCents": 1299,
  "rating": 3.9,
  "reviewCount": 267
 },
 {
  "sku": "NW-1100",
  "name": "Watering Can 10L",
  "category": "Garden",
  "aisle": "19",
  "description": "Detachable brass rose.",
  "priceCents": 899,
  "rating": 4.6,
  "reviewCount": 177
 },
 {
  "sku": "NW-1101",
  "name": "Compost Bin 220L",
  "category": "Garden",
  "aisle": "19",
  "description": "Slatted sides with a lift-off lid.",
  "priceCents": 1299,
  "rating": 4.3,
  "reviewCount": 78
 },
 {
  "sku": "NW-1102",
  "name": "Weed Membrane 1m x 10m",
  "category": "Garden",
  "aisle": "19",
  "description": "Permeable fabric that suppresses growth.",
  "priceCents": 349,
  "rating": 4.8,
  "reviewCount": 192
 },
 {
  "sku": "NW-1103",
  "name": "Slug Traps, Pack of 4",
  "category": "Garden",
  "aisle": "19",
  "description": "Refillable traps that avoid pellets.",
  "priceCents": 2499,
  "rating": 4.5,
  "reviewCount": 275
 },
 {
  "sku": "NW-1104",
  "name": "Bird Feeder, Seed Tube",
  "category": "Garden",
  "aisle": "19",
  "description": "Steel mesh tube with two feeding ports.",
  "priceCents": 1999,
  "rating": 4.7,
  "reviewCount": 267
 },
 {
  "sku": "NW-1105",
  "name": "Storage Box 60L with Lid",
  "category": "Storage",
  "aisle": "20",
  "description": "Stackable polypropylene with clip handles.",
  "priceCents": 699,
  "rating": 4.3,
  "reviewCount": 279
 },
 {
  "sku": "NW-1106",
  "name": "Shelving Unit 5 Tier, Boltless",
  "category": "Storage",
  "aisle": "20",
  "description": "Adjustable shelves rated to 175kg each.",
  "priceCents": 2999,
  "rating": 3.6,
  "reviewCount": 236
 },
 {
  "sku": "NW-1107",
  "name": "Tool Bag 16 inch",
  "category": "Storage",
  "aisle": "20",
  "description": "Reinforced base with internal pockets.",
  "priceCents": 8999,
  "rating": 3.8,
  "reviewCount": 13
 },
 {
  "sku": "NW-1108",
  "name": "Toolbox, Cantilever 3 Tray",
  "category": "Storage",
  "aisle": "20",
  "description": "Metal latches and a folding handle.",
  "priceCents": 8999,
  "rating": 4.6,
  "reviewCount": 99
 },
 {
  "sku": "NW-1109",
  "name": "Screw Organiser, 24 Compartment",
  "category": "Storage",
  "aisle": "20",
  "description": "Removable dividers in a clear lid case.",
  "priceCents": 699,
  "rating": 4.2,
  "reviewCount": 72
 },
 {
  "sku": "NW-1110",
  "name": "Garage Hooks, Heavy Duty, 4 Pack",
  "category": "Storage",
  "aisle": "20",
  "description": "Vinyl coated hooks for bikes and ladders.",
  "priceCents": 2999,
  "rating": 3.7,
  "reviewCount": 276
 },
 {
  "sku": "NW-1111",
  "name": "Vacuum Cleaner Bags, 5 Pack",
  "category": "Household",
  "aisle": "21",
  "description": "Fits most upright cleaners.",
  "priceCents": 2999,
  "rating": 4.3,
  "reviewCount": 65
 },
 {
  "sku": "NW-1112",
  "name": "Descaler for Kettles 500ml",
  "category": "Household",
  "aisle": "21",
  "description": "Removes limescale without scrubbing.",
  "priceCents": 2999,
  "rating": 3.7,
  "reviewCount": 108
 },
 {
  "sku": "NW-1113",
  "name": "Mould and Mildew Remover 750ml",
  "category": "Household",
  "aisle": "21",
  "description": "Foaming spray for sealant and grout.",
  "priceCents": 1299,
  "rating": 3.7,
  "reviewCount": 61
 },
 {
  "sku": "NW-1114",
  "name": "Drain Unblocker 1L",
  "category": "Household",
  "aisle": "21",
  "description": "Thickened formula that sinks through standing water.",
  "priceCents": 2999,
  "rating": 4.2,
  "reviewCount": 25
 },
 {
  "sku": "NW-1115",
  "name": "Multi Surface Cleaner 5L",
  "category": "Household",
  "aisle": "21",
  "description": "Concentrate diluted for floors and worktops.",
  "priceCents": 8999,
  "rating": 4.8,
  "reviewCount": 43
 },
 {
  "sku": "NW-1116",
  "name": "Microfibre Cloths, 10 Pack",
  "category": "Household",
  "aisle": "21",
  "description": "Lint free, machine washable.",
  "priceCents": 2499,
  "rating": 4.0,
  "reviewCount": 269
 },
 {
  "sku": "NW-1117",
  "name": "Rubbish Sacks, Heavy Duty, 20",
  "category": "Household",
  "aisle": "21",
  "description": "Gusseted sacks for building waste.",
  "priceCents": 3499,
  "rating": 4.3,
  "reviewCount": 152
 },
 {
  "sku": "NW-1118",
  "name": "Laminate Flooring 8mm, per pack",
  "category": "Flooring",
  "aisle": "22",
  "description": "Click fit boards covering 2.2 square metres.",
  "priceCents": 2499,
  "rating": 4.3,
  "reviewCount": 255
 },
 {
  "sku": "NW-1119",
  "name": "Underlay Roll 5mm, 15sqm",
  "category": "Flooring",
  "aisle": "22",
  "description": "Foam underlay with a moisture barrier.",
  "priceCents": 2999,
  "rating": 4.8,
  "reviewCount": 278
 },
 {
  "sku": "NW-1120",
  "name": "Carpet Gripper Rods, 10 Pack",
  "category": "Flooring",
  "aisle": "22",
  "description": "Pre-nailed battens for timber subfloors.",
  "priceCents": 1299,
  "rating": 4.8,
  "reviewCount": 114
 },
 {
  "sku": "NW-1121",
  "name": "Floor Levelling Compound 20kg",
  "category": "Flooring",
  "aisle": "22",
  "description": "Self smoothing over concrete and screed.",
  "priceCents": 12999,
  "rating": 4.2,
  "reviewCount": 224
 },
 {
  "sku": "NW-1122",
  "name": "Threshold Strip, Brass 900mm",
  "category": "Flooring",
  "aisle": "22",
  "description": "Covers the joint between two floor finishes.",
  "priceCents": 499,
  "rating": 4.1,
  "reviewCount": 172
 },
 {
  "sku": "NW-1123",
  "name": "Wall Tiles, Gloss White 200x250",
  "category": "Tiling",
  "aisle": "23",
  "description": "Ceramic tiles covering 1 square metre per pack.",
  "priceCents": 499,
  "rating": 4.5,
  "reviewCount": 230
 },
 {
  "sku": "NW-1124",
  "name": "Tile Adhesive, Ready Mixed 5kg",
  "category": "Tiling",
  "aisle": "23",
  "description": "Non-slip paste for walls in dry areas.",
  "priceCents": 499,
  "rating": 3.9,
  "reviewCount": 166
 },
 {
  "sku": "NW-1125",
  "name": "Tile Grout, White 5kg",
  "category": "Tiling",
  "aisle": "23",
  "description": "Water repellent grout for joints to 6mm.",
  "priceCents": 8999,
  "rating": 3.8,
  "reviewCount": 90
 },
 {
  "sku": "NW-1126",
  "name": "Tile Cutter, Manual 400mm",
  "category": "Tiling",
  "aisle": "23",
  "description": "Scoring wheel with a breaking arm.",
  "priceCents": 6999,
  "rating": 4.4,
  "reviewCount": 198
 },
 {
  "sku": "NW-1127",
  "name": "Tile Spacers 2mm, 500 Pack",
  "category": "Tiling",
  "aisle": "23",
  "description": "Cross spacers that can be left in place.",
  "priceCents": 699,
  "rating": 3.9,
  "reviewCount": 81
 },
 {
  "sku": "NW-1128",
  "name": "Timber Batten 38x63mm, 2.4m",
  "category": "Timber",
  "aisle": "24",
  "description": "Planed softwood for framing and battening.",
  "priceCents": 2499,
  "rating": 3.9,
  "reviewCount": 59
 },
 {
  "sku": "NW-1129",
  "name": "MDF Sheet 6mm, 1220x607mm",
  "category": "Timber",
  "aisle": "24",
  "description": "Smooth faced board for shelving and panels.",
  "priceCents": 1999,
  "rating": 4.8,
  "reviewCount": 94
 },
 {
  "sku": "NW-1130",
  "name": "Plywood Sheet 12mm, 1220x607mm",
  "category": "Timber",
  "aisle": "24",
  "description": "Structural grade for flooring repairs.",
  "priceCents": 4999,
  "rating": 4.7,
  "reviewCount": 93
 },
 {
  "sku": "NW-1131",
  "name": "Skirting Board, Torus 120mm, 2.4m",
  "category": "Timber",
  "aisle": "24",
  "description": "Primed softwood ready for topcoat.",
  "priceCents": 6999,
  "rating": 4.2,
  "reviewCount": 274
 },
 {
  "sku": "NW-1132",
  "name": "Dowel Rod 12mm, 1m",
  "category": "Timber",
  "aisle": "24",
  "description": "Hardwood rod for joints and rails.",
  "priceCents": 1999,
  "rating": 4.0,
  "reviewCount": 111
 },
 {
  "sku": "NW-1133",
  "name": "Sand, Building, 25kg",
  "category": "Aggregates",
  "aisle": "25",
  "description": "Sharp sand for mortar and screeds.",
  "priceCents": 1499,
  "rating": 4.0,
  "reviewCount": 198
 },
 {
  "sku": "NW-1134",
  "name": "Cement, 25kg",
  "category": "Aggregates",
  "aisle": "25",
  "description": "General purpose Portland cement.",
  "priceCents": 349,
  "rating": 4.0,
  "reviewCount": 245
 },
 {
  "sku": "NW-1135",
  "name": "Postcrete 20kg",
  "category": "Aggregates",
  "aisle": "25",
  "description": "Rapid setting mix for fence posts.",
  "priceCents": 2499,
  "rating": 4.5,
  "reviewCount": 207
 },
 {
  "sku": "NW-1136",
  "name": "Gravel, Pea Shingle 20kg",
  "category": "Aggregates",
  "aisle": "25",
  "description": "Decorative aggregate for paths and borders.",
  "priceCents": 1499,
  "rating": 4.3,
  "reviewCount": 162
 },
 {
  "sku": "NW-1137",
  "name": "Workbench, Folding",
  "category": "Workshop",
  "aisle": "26",
  "description": "Clamping top with adjustable pegs.",
  "priceCents": 2999,
  "rating": 4.8,
  "reviewCount": 68
 },
 {
  "sku": "NW-1138",
  "name": "Bench Vice 100mm",
  "category": "Workshop",
  "aisle": "26",
  "description": "Cast iron jaws with an anvil face.",
  "priceCents": 8999,
  "rating": 3.9,
  "reviewCount": 64
 },
 {
  "sku": "NW-1139",
  "name": "G Clamp 150mm",
  "category": "Workshop",
  "aisle": "26",
  "description": "Drop forged frame with a swivel shoe.",
  "priceCents": 499,
  "rating": 3.9,
  "reviewCount": 31
 },
 {
  "sku": "NW-1140",
  "name": "Hacksaw and Blades",
  "category": "Workshop",
  "aisle": "26",
  "description": "Tensioned frame with three spare blades.",
  "priceCents": 8999,
  "rating": 3.8,
  "reviewCount": 77
 },
 {
  "sku": "NW-1141",
  "name": "Files, Assorted, 5 Piece",
  "category": "Workshop",
  "aisle": "26",
  "description": "Flat, half round, round, square and triangular.",
  "priceCents": 12999,
  "rating": 4.1,
  "reviewCount": 143
 },
 {
  "sku": "NW-1142",
  "name": "Wire Brush, Three Row",
  "category": "Workshop",
  "aisle": "26",
  "description": "Steel bristles for rust and scale removal.",
  "priceCents": 1999,
  "rating": 3.8,
  "reviewCount": 274
 },
 {
  "sku": "NW-1143",
  "name": "Soldering Iron 30W",
  "category": "Workshop",
  "aisle": "26",
  "description": "Interchangeable tips with a stand.",
  "priceCents": 3499,
  "rating": 4.2,
  "reviewCount": 178
 },
 {
  "sku": "NW-1144",
  "name": "Multimeter, Digital",
  "category": "Workshop",
  "aisle": "26",
  "description": "Measures voltage, current, resistance and continuity.",
  "priceCents": 499,
  "rating": 4.0,
  "reviewCount": 104
 },
 {
  "sku": "NW-1145",
  "name": "Head Torch, Rechargeable",
  "category": "Lighting",
  "aisle": "27",
  "description": "Three modes with a red night setting.",
  "priceCents": 1999,
  "rating": 4.8,
  "reviewCount": 148
 },
 {
  "sku": "NW-1146",
  "name": "Inspection Lamp, Magnetic",
  "category": "Lighting",
  "aisle": "27",
  "description": "Slim COB strip with a hanging hook.",
  "priceCents": 349,
  "rating": 4.4,
  "reviewCount": 144
 },
 {
  "sku": "NW-1147",
  "name": "Work Light, Tripod 50W",
  "category": "Lighting",
  "aisle": "27",
  "description": "Adjustable height with a rugged housing.",
  "priceCents": 499,
  "rating": 4.4,
  "reviewCount": 124
 }
]
;

/** The hero product for the review-scanning beat. */
export const HERO_SKU = 'NW-1013';

export const REVIEWS: Review[] = [
 {
  "id": "r1",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 151",
  "text": "Used it to build a deck frame over a weekend and it kept up."
 },
 {
  "id": "r2",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 37",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r3",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 180",
  "text": "Belt clip is handy on a ladder."
 },
 {
  "id": "r4",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 160",
  "text": "Fine, but the case has no room for spare bits."
 },
 {
  "id": "r5",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 84",
  "text": "Belt clip is handy on a ladder."
 },
 {
  "id": "r6",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 86",
  "text": "Plenty of power for timber. Screws long fixings without pre-drilling."
 },
 {
  "id": "r7",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 174",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r8",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 117",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r9",
  "sku": "NW-1013",
  "stars": 1,
  "author": "Verified buyer 109",
  "text": "Stopped charging after two months. Disappointed."
 },
 {
  "id": "r10",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 166",
  "text": "Used it to build a deck frame over a weekend and it kept up."
 },
 {
  "id": "r11",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 131",
  "text": "Plenty of power for timber. Screws long fixings without pre-drilling."
 },
 {
  "id": "r12",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 87",
  "text": "Good value in the sale. Would buy again."
 },
 {
  "id": "r13",
  "sku": "NW-1013",
  "stars": 2,
  "author": "Verified buyer 7",
  "text": "Not really up to hard concrete. Fine for brick and block, but I borrowed an SDS for the rest."
 },
 {
  "id": "r14",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 198",
  "text": "Fine, but the case has no room for spare bits."
 },
 {
  "id": "r15",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 175",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r16",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 1",
  "text": "Went through concrete block without complaining. Hammer action is stronger than I expected for the money."
 },
 {
  "id": "r17",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 191",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r18",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 114",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r19",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 163",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r20",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 209",
  "text": "Handles plasterboard and timber without any fuss at all."
 },
 {
  "id": "r21",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 177",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r22",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 98",
  "text": "Used it to build a deck frame over a weekend and it kept up."
 },
 {
  "id": "r23",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 47",
  "text": "Grip is comfortable even with gloves on."
 },
 {
  "id": "r24",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 188",
  "text": "Fine, but the case has no room for spare bits."
 },
 {
  "id": "r25",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 170",
  "text": "Fine, but the case has no room for spare bits."
 },
 {
  "id": "r26",
  "sku": "NW-1013",
  "stars": 2,
  "author": "Verified buyer 157",
  "text": "Mine arrived with a loose side handle. Support sent a replacement quickly."
 },
 {
  "id": "r27",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 68",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r28",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 161",
  "text": "Light enough to use overhead without your arm giving out."
 },
 {
  "id": "r29",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 105",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r30",
  "sku": "NW-1013",
  "stars": 1,
  "author": "Verified buyer 138",
  "text": "Stopped charging after two months. Disappointed."
 },
 {
  "id": "r31",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 186",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r32",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 99",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r33",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 164",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r34",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 173",
  "text": "Chuck grips well. Two speeds are genuinely useful."
 },
 {
  "id": "r35",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 201",
  "text": "Fine, but the case has no room for spare bits."
 },
 {
  "id": "r36",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 56",
  "text": "Plenty of power for timber. Screws long fixings without pre-drilling."
 },
 {
  "id": "r37",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 65",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r38",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 97",
  "text": "Light enough to use overhead without your arm giving out."
 },
 {
  "id": "r39",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 29",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r40",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 8",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r41",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 130",
  "text": "Chuck grips well. Two speeds are genuinely useful."
 },
 {
  "id": "r42",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 141",
  "text": "Sturdy. Dropped it off a step ladder and it survived."
 },
 {
  "id": "r43",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 149",
  "text": "Quieter than the one it replaced."
 },
 {
  "id": "r44",
  "sku": "NW-1013",
  "stars": 2,
  "author": "Verified buyer 83",
  "text": "Mine arrived with a loose side handle. Support sent a replacement quickly."
 },
 {
  "id": "r45",
  "sku": "NW-1013",
  "stars": 1,
  "author": "Verified buyer 23",
  "text": "Stopped charging after two months. Disappointed."
 },
 {
  "id": "r46",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 32",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r47",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 96",
  "text": "My partner borrowed it and now wants their own."
 },
 {
  "id": "r48",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 145",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r49",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 128",
  "text": "Handles plasterboard and timber without any fuss at all."
 },
 {
  "id": "r50",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 204",
  "text": "Used it to build a deck frame over a weekend and it kept up."
 },
 {
  "id": "r51",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 38",
  "text": "Battery lasts a full afternoon of flat pack assembly."
 },
 {
  "id": "r52",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 81",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r53",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 25",
  "text": "Grip is comfortable even with gloves on."
 },
 {
  "id": "r54",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 14",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r55",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 61",
  "text": "Belt clip is handy on a ladder."
 },
 {
  "id": "r56",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 125",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r57",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 58",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r58",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 71",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r59",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 200",
  "text": "Adequate. Nothing remarkable but nothing wrong either."
 },
 {
  "id": "r60",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 213",
  "text": "Plenty of power for timber. Screws long fixings without pre-drilling."
 },
 {
  "id": "r61",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 202",
  "text": "Chuck grips well. Two speeds are genuinely useful."
 },
 {
  "id": "r62",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 17",
  "text": "My partner borrowed it and now wants their own."
 },
 {
  "id": "r63",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 207",
  "text": "Chuck grips well. Two speeds are genuinely useful."
 },
 {
  "id": "r64",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 52",
  "text": "Battery lasts a full afternoon of flat pack assembly."
 },
 {
  "id": "r65",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 42",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r66",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 31",
  "text": "Chuck grips well. Two speeds are genuinely useful."
 },
 {
  "id": "r67",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 179",
  "text": "Grip is comfortable even with gloves on."
 },
 {
  "id": "r68",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 193",
  "text": "Perfectly decent, though the battery gauge only has three bars."
 },
 {
  "id": "r69",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 44",
  "text": "Grip is comfortable even with gloves on."
 },
 {
  "id": "r70",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 129",
  "text": "Replaced a fifteen year old drill and the difference in torque is obvious."
 },
 {
  "id": "r71",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 90",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r72",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 26",
  "text": "Drilled tile without cracking it on the low speed setting."
 },
 {
  "id": "r73",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 137",
  "text": "Drilled tile without cracking it on the low speed setting."
 },
 {
  "id": "r74",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 39",
  "text": "Grip is comfortable even with gloves on."
 },
 {
  "id": "r75",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 48",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r76",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 210",
  "text": "Plenty of power for timber. Screws long fixings without pre-drilling."
 },
 {
  "id": "r77",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 103",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r78",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 63",
  "text": "Fine, but the case has no room for spare bits."
 },
 {
  "id": "r79",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 79",
  "text": "Handles plasterboard and timber without any fuss at all."
 },
 {
  "id": "r80",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 118",
  "text": "Well balanced and not too heavy for a full day."
 },
 {
  "id": "r81",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 104",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r82",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 30",
  "text": "Light enough to use overhead without your arm giving out."
 },
 {
  "id": "r83",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 3",
  "text": "Fine in concrete if you use a decent masonry bit. The supplied ones gave up quickly."
 },
 {
  "id": "r84",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 196",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r85",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 169",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r86",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 77",
  "text": "Quieter than the one it replaced."
 },
 {
  "id": "r87",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 40",
  "text": "Used it to build a deck frame over a weekend and it kept up."
 },
 {
  "id": "r88",
  "sku": "NW-1013",
  "stars": 2,
  "author": "Verified buyer 120",
  "text": "Mine arrived with a loose side handle. Support sent a replacement quickly."
 },
 {
  "id": "r89",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 192",
  "text": "Grip is comfortable even with gloves on."
 },
 {
  "id": "r90",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 67",
  "text": "Plenty of power for timber. Screws long fixings without pre-drilling."
 },
 {
  "id": "r91",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 107",
  "text": "Handles plasterboard and timber without any fuss at all."
 },
 {
  "id": "r92",
  "sku": "NW-1013",
  "stars": 1,
  "author": "Verified buyer 70",
  "text": "Stopped charging after two months. Disappointed."
 },
 {
  "id": "r93",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 60",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r94",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 57",
  "text": "Grip is comfortable even with gloves on."
 },
 {
  "id": "r95",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 182",
  "text": "Light enough to use overhead without your arm giving out."
 },
 {
  "id": "r96",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 119",
  "text": "Torque settings are clearly marked which helps when driving into soft board."
 },
 {
  "id": "r97",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 89",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r98",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 195",
  "text": "Grip is comfortable even with gloves on."
 },
 {
  "id": "r99",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 50",
  "text": "Good value in the sale. Would buy again."
 },
 {
  "id": "r100",
  "sku": "NW-1013",
  "stars": 2,
  "author": "Verified buyer 43",
  "text": "Second battery would not hold charge from new."
 },
 {
  "id": "r101",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 94",
  "text": "Used it to build a deck frame over a weekend and it kept up."
 },
 {
  "id": "r102",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 194",
  "text": "Perfectly decent, though the battery gauge only has three bars."
 },
 {
  "id": "r103",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 183",
  "text": "Used it to build a deck frame over a weekend and it kept up."
 },
 {
  "id": "r104",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 15",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r105",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 139",
  "text": "Does the job but the LED is positioned so your hand shadows the hole."
 },
 {
  "id": "r106",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 133",
  "text": "Replaced a fifteen year old drill and the difference in torque is obvious."
 },
 {
  "id": "r107",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 11",
  "text": "My partner borrowed it and now wants their own."
 },
 {
  "id": "r108",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 189",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r109",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 78",
  "text": "Sturdy. Dropped it off a step ladder and it survived."
 },
 {
  "id": "r110",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 127",
  "text": "Well balanced and not too heavy for a full day."
 },
 {
  "id": "r111",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 75",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r112",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 113",
  "text": "Quieter than the one it replaced."
 },
 {
  "id": "r113",
  "sku": "NW-1013",
  "stars": 2,
  "author": "Verified buyer 214",
  "text": "Second battery would not hold charge from new."
 },
 {
  "id": "r114",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 154",
  "text": "Quieter than the one it replaced."
 },
 {
  "id": "r115",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 140",
  "text": "Torque settings are clearly marked which helps when driving into soft board."
 },
 {
  "id": "r116",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 2",
  "text": "Drilled sixteen holes into a concrete lintel to hang a rail and it never bogged down."
 },
 {
  "id": "r117",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 74",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r118",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 167",
  "text": "My partner borrowed it and now wants their own."
 },
 {
  "id": "r119",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 111",
  "text": "Best tool I have bought this year."
 },
 {
  "id": "r120",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 4",
  "text": "Handled concrete pavers well. Noisy, but that is hammer drills for you."
 },
 {
  "id": "r121",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 102",
  "text": "Torque settings are clearly marked which helps when driving into soft board."
 },
 {
  "id": "r122",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 121",
  "text": "Belt clip is handy on a ladder."
 },
 {
  "id": "r123",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 54",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r124",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 110",
  "text": "Used it to build a deck frame over a weekend and it kept up."
 },
 {
  "id": "r125",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 112",
  "text": "Used it to build a deck frame over a weekend and it kept up."
 },
 {
  "id": "r126",
  "sku": "NW-1013",
  "stars": 1,
  "author": "Verified buyer 199",
  "text": "Stopped charging after two months. Disappointed."
 },
 {
  "id": "r127",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 135",
  "text": "Battery lasts a full afternoon of flat pack assembly."
 },
 {
  "id": "r128",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 148",
  "text": "Chuck grips well. Two speeds are genuinely useful."
 },
 {
  "id": "r129",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 22",
  "text": "Good value in the sale. Would buy again."
 },
 {
  "id": "r130",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 91",
  "text": "Fine, but the case has no room for spare bits."
 },
 {
  "id": "r131",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 88",
  "text": "Light enough to use overhead without your arm giving out."
 },
 {
  "id": "r132",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 159",
  "text": "Drilled tile without cracking it on the low speed setting."
 },
 {
  "id": "r133",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 165",
  "text": "Does the job but the LED is positioned so your hand shadows the hole."
 },
 {
  "id": "r134",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 211",
  "text": "Adequate. Nothing remarkable but nothing wrong either."
 },
 {
  "id": "r135",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 205",
  "text": "Does the job but the LED is positioned so your hand shadows the hole."
 },
 {
  "id": "r136",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 143",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r137",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 208",
  "text": "Light enough to use overhead without your arm giving out."
 },
 {
  "id": "r138",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 35",
  "text": "Came fully charged which was a nice touch."
 },
 {
  "id": "r139",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 82",
  "text": "Best tool I have bought this year."
 },
 {
  "id": "r140",
  "sku": "NW-1013",
  "stars": 2,
  "author": "Verified buyer 146",
  "text": "Second battery would not hold charge from new."
 },
 {
  "id": "r141",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 171",
  "text": "Replaced a fifteen year old drill and the difference in torque is obvious."
 },
 {
  "id": "r142",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 206",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r143",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 20",
  "text": "Does the job but the LED is positioned so your hand shadows the hole."
 },
 {
  "id": "r144",
  "sku": "NW-1013",
  "stars": 2,
  "author": "Verified buyer 6",
  "text": "Struggled on old concrete, I had to pre-drill with a smaller bit first."
 },
 {
  "id": "r145",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 152",
  "text": "Replaced a fifteen year old drill and the difference in torque is obvious."
 },
 {
  "id": "r146",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 80",
  "text": "Adequate. Nothing remarkable but nothing wrong either."
 },
 {
  "id": "r147",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 92",
  "text": "Well balanced and not too heavy for a full day."
 },
 {
  "id": "r148",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 122",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r149",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 172",
  "text": "Battery lasts a full afternoon of flat pack assembly."
 },
 {
  "id": "r150",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 9",
  "text": "My partner borrowed it and now wants their own."
 },
 {
  "id": "r151",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 156",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r152",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 150",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r153",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 187",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r154",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 85",
  "text": "Well balanced and not too heavy for a full day."
 },
 {
  "id": "r155",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 116",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r156",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 36",
  "text": "Best tool I have bought this year."
 },
 {
  "id": "r157",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 93",
  "text": "Replaced a fifteen year old drill and the difference in torque is obvious."
 },
 {
  "id": "r158",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 24",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r159",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 34",
  "text": "Drilled tile without cracking it on the low speed setting."
 },
 {
  "id": "r160",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 147",
  "text": "Well balanced and not too heavy for a full day."
 },
 {
  "id": "r161",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 136",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r162",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 95",
  "text": "Replaced a fifteen year old drill and the difference in torque is obvious."
 },
 {
  "id": "r163",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 73",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r164",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 46",
  "text": "Does the job but the LED is positioned so your hand shadows the hole."
 },
 {
  "id": "r165",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 12",
  "text": "Handles plasterboard and timber without any fuss at all."
 },
 {
  "id": "r166",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 16",
  "text": "Good value in the sale. Would buy again."
 },
 {
  "id": "r167",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 64",
  "text": "Adequate. Nothing remarkable but nothing wrong either."
 },
 {
  "id": "r168",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 115",
  "text": "Fine, but the case has no room for spare bits."
 },
 {
  "id": "r169",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 106",
  "text": "Handles plasterboard and timber without any fuss at all."
 },
 {
  "id": "r170",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 69",
  "text": "Light enough to use overhead without your arm giving out."
 },
 {
  "id": "r171",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 184",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r172",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 5",
  "text": "Put up a heavy gate into a concrete post with this. No trouble at all."
 },
 {
  "id": "r173",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 53",
  "text": "Battery lasts a full afternoon of flat pack assembly."
 },
 {
  "id": "r174",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 55",
  "text": "Came fully charged which was a nice touch."
 },
 {
  "id": "r175",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 72",
  "text": "Torque settings are clearly marked which helps when driving into soft board."
 },
 {
  "id": "r176",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 19",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r177",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 178",
  "text": "Well balanced and not too heavy for a full day."
 },
 {
  "id": "r178",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 158",
  "text": "My partner borrowed it and now wants their own."
 },
 {
  "id": "r179",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 168",
  "text": "Grip is comfortable even with gloves on."
 },
 {
  "id": "r180",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 144",
  "text": "Good value in the sale. Would buy again."
 },
 {
  "id": "r181",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 123",
  "text": "Light enough to use overhead without your arm giving out."
 },
 {
  "id": "r182",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 59",
  "text": "Well balanced and not too heavy for a full day."
 },
 {
  "id": "r183",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 33",
  "text": "Sturdy. Dropped it off a step ladder and it survived."
 },
 {
  "id": "r184",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 18",
  "text": "Fine, but the case has no room for spare bits."
 },
 {
  "id": "r185",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 185",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r186",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 45",
  "text": "Put up shelves, a curtain pole and a coat rack in one go."
 },
 {
  "id": "r187",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 134",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r188",
  "sku": "NW-1013",
  "stars": 2,
  "author": "Verified buyer 76",
  "text": "Mine arrived with a loose side handle. Support sent a replacement quickly."
 },
 {
  "id": "r189",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 126",
  "text": "Quieter than the one it replaced."
 },
 {
  "id": "r190",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 153",
  "text": "Used it to build a deck frame over a weekend and it kept up."
 },
 {
  "id": "r191",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 203",
  "text": "My partner borrowed it and now wants their own."
 },
 {
  "id": "r192",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 197",
  "text": "Chuck grips well. Two speeds are genuinely useful."
 },
 {
  "id": "r193",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 101",
  "text": "My partner borrowed it and now wants their own."
 },
 {
  "id": "r194",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 181",
  "text": "Adequate. Nothing remarkable but nothing wrong either."
 },
 {
  "id": "r195",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 212",
  "text": "Grip is comfortable even with gloves on."
 },
 {
  "id": "r196",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 62",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r197",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 66",
  "text": "Good value in the sale. Would buy again."
 },
 {
  "id": "r198",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 132",
  "text": "Best tool I have bought this year."
 },
 {
  "id": "r199",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 10",
  "text": "Sturdy. Dropped it off a step ladder and it survived."
 },
 {
  "id": "r200",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 28",
  "text": "Replaced a fifteen year old drill and the difference in torque is obvious."
 },
 {
  "id": "r201",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 27",
  "text": "Does the job but the LED is positioned so your hand shadows the hole."
 },
 {
  "id": "r202",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 13",
  "text": "Well balanced and not too heavy for a full day."
 },
 {
  "id": "r203",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 108",
  "text": "Battery lasts a full afternoon of flat pack assembly."
 },
 {
  "id": "r204",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 21",
  "text": "Drilled tile without cracking it on the low speed setting."
 },
 {
  "id": "r205",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 155",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r206",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 124",
  "text": "Belt clip is handy on a ladder."
 },
 {
  "id": "r207",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 100",
  "text": "Good weight, sits nicely in the hand and the clutch is easy to set."
 },
 {
  "id": "r208",
  "sku": "NW-1013",
  "stars": 2,
  "author": "Verified buyer 176",
  "text": "Mine arrived with a loose side handle. Support sent a replacement quickly."
 },
 {
  "id": "r209",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 51",
  "text": "Charger is quick. Case is flimsy but the drill itself is solid."
 },
 {
  "id": "r210",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 142",
  "text": "Bought one for work and another for home. No complaints from either."
 },
 {
  "id": "r211",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 162",
  "text": "Came fully charged which was a nice touch."
 },
 {
  "id": "r212",
  "sku": "NW-1013",
  "stars": 4,
  "author": "Verified buyer 190",
  "text": "Plenty of power for timber. Screws long fixings without pre-drilling."
 },
 {
  "id": "r213",
  "sku": "NW-1013",
  "stars": 5,
  "author": "Verified buyer 41",
  "text": "The reverse is instant which saves a lot of fiddling."
 },
 {
  "id": "r214",
  "sku": "NW-1013",
  "stars": 3,
  "author": "Verified buyer 49",
  "text": "Adequate. Nothing remarkable but nothing wrong either."
 }
]
;

export function productBySku(sku: string): Product | undefined {
  return PRODUCTS.find((p) => p.sku === sku);
}

export function reviewsForSku(sku: string): Review[] {
  return REVIEWS.filter((r) => r.sku === sku);
}
