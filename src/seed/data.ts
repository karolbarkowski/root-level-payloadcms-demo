/**
 * Demo catalog content for Root Level, transcribed from the design prototype.
 * The seed runner (./index.ts) turns this into Payload documents.
 */

export interface SeedCategory {
  slug: string
  title: string
  description: string
}

export interface SeedFinish {
  name: string
  swatch: string
}

export interface SeedSize {
  label: string
  mod: number
}

export interface SeedProduct {
  slug: string
  name: string
  category: string // category slug
  basePrice: number
  dimensions: string
  baseSku: string
  isNew: boolean
  shortDescription: string
  description: string[] // paragraphs
  finishes: SeedFinish[]
  sizes: SeedSize[]
}

export interface SeedTag {
  slug: string
  title: string
}

export interface SeedPost {
  slug: string
  title: string
  publishedAt: string // ISO
  tags: string[] // tag slugs
  excerpt: string
  body: string[] // paragraphs
}

export const categories: SeedCategory[] = [
  { slug: 'lighting', title: 'Lighting', description: 'Hand-fitted chandeliers, pendants, lamps, and sconces built to gather light softly.' },
  { slug: 'furniture', title: 'Furniture', description: 'Solid-wood and stone pieces made to be lived with — and passed on.' },
  { slug: 'decor', title: 'Decor', description: 'Quiet objects: hand-thrown ceramics and cast-bronze forms with real heft.' },
  { slug: 'mirrors', title: 'Mirrors', description: 'Full-length and round mirrors framed in slim, hand-finished metal.' },
]

export const tags: SeedTag[] = [
  { slug: 'craft', title: 'Craft' },
  { slug: 'materials', title: 'Materials' },
  { slug: 'at-home', title: 'At Home' },
  { slug: 'design-notes', title: 'Design Notes' },
  { slug: 'behind-the-studio', title: 'Behind the Studio' },
]

export const products: SeedProduct[] = [
  {
    slug: 'aurelia-chandelier',
    name: 'Aurelia Chandelier',
    category: 'lighting',
    basePrice: 2480,
    dimensions: '34"W × 34"D × 41"H',
    baseSku: 'RL-LC-0410',
    isNew: true,
    shortDescription: 'A cascade of hand-fitted glass rods suspended on an antique-brass frame.',
    description: [
      'Aurelia gathers light the way a chandelier should — softly, and from every angle. Each glass rod is cut and polished by hand, then hung in a slow descending spiral.',
      'The frame is solid brass, finished to a warm matte that deepens with age. No two pieces patina quite the same way.',
    ],
    finishes: [
      { name: 'Antique Brass', swatch: '#9C7A45' },
      { name: 'Bronze', swatch: '#6B4E2E' },
      { name: 'Polished Nickel', swatch: '#AEB0AC' },
    ],
    sizes: [
      { label: 'Small', mod: 0 },
      { label: 'Medium', mod: 560 },
      { label: 'Large', mod: 1240 },
    ],
  },
  {
    slug: 'halden-pendant',
    name: 'Halden Pendant',
    category: 'lighting',
    basePrice: 940,
    dimensions: '18"Dia × 22"H',
    baseSku: 'RL-LP-0221',
    isNew: false,
    shortDescription: 'A single blown-glass globe cradled in a slim metal yoke.',
    description: [
      'Halden is quiet by design — one hand-blown globe, one clean line of metal. It reads as a single gesture from across the room.',
      'Hung alone over a bath, or in a run of three above an island, it keeps the same easy presence.',
    ],
    finishes: [
      { name: 'Antique Brass', swatch: '#9C7A45' },
      { name: 'Blackened Steel', swatch: '#2A2724' },
    ],
    sizes: [
      { label: 'Small', mod: 0 },
      { label: 'Large', mod: 220 },
    ],
  },
  {
    slug: 'marlowe-table-lamp',
    name: 'Marlowe Table Lamp',
    category: 'lighting',
    basePrice: 620,
    dimensions: '16"W × 28"H',
    baseSku: 'RL-TL-0188',
    isNew: true,
    shortDescription: 'A turned-wood column under a linen shade, casting warm downward light.',
    description: [
      'Marlowe is a lamp for a bedside or a console — low, warm, and unhurried. The column is turned from a single piece of oak.',
      'The linen shade is sewn in-house and softens the light to something closer to candlelight than a bulb.',
    ],
    finishes: [
      { name: 'Natural Oak', swatch: '#C9A87C' },
      { name: 'Blackened Steel', swatch: '#2A2724' },
    ],
    sizes: [],
  },
  {
    slug: 'cove-wall-sconce',
    name: 'Cove Wall Sconce',
    category: 'lighting',
    basePrice: 380,
    dimensions: '6"W × 14"H',
    baseSku: 'RL-WS-0142',
    isNew: false,
    shortDescription: 'A quiet half-moon of light thrown against the wall.',
    description: [
      'Cove hides its source and shows only the glow — a soft arc of light that grazes the wall on either side.',
      'Mounted in pairs along a hallway, it does the work of a much larger fixture without ever drawing the eye.',
    ],
    finishes: [
      { name: 'Antique Brass', swatch: '#9C7A45' },
      { name: 'Bronze', swatch: '#6B4E2E' },
    ],
    sizes: [],
  },
  {
    slug: 'senna-lounge-chair',
    name: 'Senna Lounge Chair',
    category: 'furniture',
    basePrice: 1980,
    dimensions: '30"W × 34"D × 31"H',
    baseSku: 'RL-LC-0507',
    isNew: false,
    shortDescription: 'Low, deep, and enveloping — shearling over a solid ash frame.',
    description: [
      'Senna is built to be sunk into. The seat is deep, the back reclined just enough, and the whole chair sits low to the floor.',
      'The frame is solid ash; the shearling is full-hide, not a facing. It softens beautifully with use.',
    ],
    finishes: [
      { name: 'Ivory Shearling', swatch: '#E7DFD0' },
      { name: 'Fawn', swatch: '#C9A87C' },
    ],
    sizes: [],
  },
  {
    slug: 'delford-console',
    name: 'Delford Console',
    category: 'furniture',
    basePrice: 2240,
    dimensions: '60"W × 16"D × 32"H',
    baseSku: 'RL-CN-0333',
    isNew: true,
    shortDescription: 'A long oak console with hand-cast bronze pulls.',
    description: [
      'Delford is a workhorse dressed as a gallery piece — a long, low console with two soft-close drawers and an open shelf below.',
      'The pulls are cast one at a time in bronze, each with a slightly different hand-finished face.',
    ],
    finishes: [
      { name: 'Natural Oak', swatch: '#C9A87C' },
      { name: 'Bronze', swatch: '#6B4E2E' },
    ],
    sizes: [],
  },
  {
    slug: 'brannon-coffee-table',
    name: 'Brannon Coffee Table',
    category: 'furniture',
    basePrice: 1460,
    dimensions: '48"W × 28"D × 16"H',
    baseSku: 'RL-CT-0290',
    isNew: false,
    shortDescription: 'Honed travertine floating on a blackened-steel base.',
    description: [
      'Brannon pairs the weight of stone with the lightness of a thin steel frame. The travertine is honed to a matte, chalky finish.',
      'The base is welded and finished by hand, then set slightly inboard so the top appears to float.',
    ],
    finishes: [
      { name: 'Blackened Steel', swatch: '#2A2724' },
      { name: 'Antique Brass', swatch: '#9C7A45' },
    ],
    sizes: [
      { label: 'Small', mod: 0 },
      { label: 'Large', mod: 380 },
    ],
  },
  {
    slug: 'ostend-bench',
    name: 'Ostend Bench',
    category: 'furniture',
    basePrice: 1120,
    dimensions: '54"W × 18"D × 18"H',
    baseSku: 'RL-BN-0261',
    isNew: false,
    shortDescription: 'A single plank of oak resting on tapered legs.',
    description: [
      'Ostend is about as simple as furniture gets — one thick plank, four tapered legs, nothing else.',
      'At the foot of a bed or along an entry wall, it earns its place by staying out of the way.',
    ],
    finishes: [
      { name: 'Natural Oak', swatch: '#C9A87C' },
      { name: 'Blackened Steel', swatch: '#2A2724' },
    ],
    sizes: [
      { label: '54 in', mod: 0 },
      { label: '72 in', mod: 340 },
    ],
  },
  {
    slug: 'vidra-vase',
    name: 'Vidra Vase',
    category: 'decor',
    basePrice: 240,
    dimensions: '8"Dia × 14"H',
    baseSku: 'RL-OB-0119',
    isNew: false,
    shortDescription: 'Matte stoneware with a soft, uneven hand-poured glaze.',
    description: [
      'Vidra is thrown on the wheel and glazed by hand, so the surface breaks and pools in a way no two share.',
      'Full of branches or empty on a shelf, it holds its own as a quiet object.',
    ],
    finishes: [
      { name: 'Alabaster', swatch: '#E7DFD0' },
      { name: 'Sand', swatch: '#C9A87C' },
    ],
    sizes: [
      { label: 'Small', mod: 0 },
      { label: 'Medium', mod: 80 },
      { label: 'Large', mod: 180 },
    ],
  },
  {
    slug: 'torres-bookends',
    name: 'Torres Bookends',
    category: 'decor',
    basePrice: 190,
    dimensions: '5"W × 6"H each',
    baseSku: 'RL-OB-0126',
    isNew: true,
    shortDescription: 'A pair of solid cast-bronze forms with a warm patina.',
    description: [
      'Sold as a pair, Torres bookends are cast solid — they have real heft, and they hold a shelf of books without complaint.',
      'The patina is applied by hand and left to settle, so each face is slightly its own.',
    ],
    finishes: [{ name: 'Bronze', swatch: '#6B4E2E' }],
    sizes: [],
  },
  {
    slug: 'lindus-floor-mirror',
    name: 'Lindus Floor Mirror',
    category: 'mirrors',
    basePrice: 1280,
    dimensions: '32"W × 76"H',
    baseSku: 'RL-MR-0402',
    isNew: false,
    shortDescription: 'A full-length mirror framed in slim antique brass.',
    description: [
      'Lindus leans, rather than hangs — a full-length mirror in a narrow brass frame that reflects far more room than it takes up.',
      'The glass is antiqued just slightly at the edges, softening the reflection without clouding it.',
    ],
    finishes: [
      { name: 'Antique Brass', swatch: '#9C7A45' },
      { name: 'Bronze', swatch: '#6B4E2E' },
    ],
    sizes: [],
  },
  {
    slug: 'fenwick-round-mirror',
    name: 'Fenwick Round Mirror',
    category: 'mirrors',
    basePrice: 680,
    dimensions: '34"Dia',
    baseSku: 'RL-MR-0388',
    isNew: true,
    shortDescription: 'A perfect circle with a hand-finished bronze rim.',
    description: [
      'Fenwick is a clean circle — no bevel, no ornament, just a hand-finished metal rim around a plain round glass.',
      'Over a vanity or a mantel, it reads as an object first and a mirror second.',
    ],
    finishes: [
      { name: 'Bronze', swatch: '#6B4E2E' },
      { name: 'Blackened Steel', swatch: '#2A2724' },
    ],
    sizes: [
      { label: '34 in', mod: 0 },
      { label: '44 in', mod: 260 },
    ],
  },
]

export const posts: SeedPost[] = [
  {
    slug: 'weight-of-a-good-object',
    title: 'The Weight of a Good Object',
    publishedAt: '2026-06-15',
    tags: ['materials', 'design-notes'],
    excerpt: 'Why we cast solid when we could cast hollow — and what heft has to do with how long you keep a thing.',
    body: [
      'There is a moment, picking up a well-made object, when your hand expects one thing and receives another. It is heavier than it looks. That small surprise is the beginning of trust.',
      'We cast our bronze pieces solid. It costs more, ships heavier, and takes longer to patina evenly. It would be easy to hollow them and save on all three. We do not, because weight is the first quiet argument an object makes for its own permanence.',
      'A thing that feels substantial gets treated as substantial. It is set down carefully, kept, handed on. Lightness has its place — but not here, not in the objects meant to outlast the room they arrive in.',
    ],
  },
  {
    slug: 'living-with-brass',
    title: 'Living With Brass',
    publishedAt: '2026-05-15',
    tags: ['at-home', 'materials'],
    excerpt: 'Brass is not a finish that stays still. A short guide to letting it age the way it wants to.',
    body: [
      'Unlacquered brass is a living surface. It arrives bright, warms to gold, and over years settles into a deep, even bronze. Some people fight this. We would rather you let it happen.',
      'The patina is not dirt. It is oxidation — a thin, protective, entirely natural film that records where the piece has been touched and where the light has fallen. A doorknob wears differently than a lamp base, and that difference is the point.',
      'If you want to slow it down, keep the surface dry and dust it with a soft cloth. If you want to reset it, a cut lemon and a little salt will take it back to bright. But our advice, most days, is simply to leave it alone.',
    ],
  },
  {
    slug: 'notes-from-the-bench',
    title: 'Notes from the Bench',
    publishedAt: '2026-04-15',
    tags: ['behind-the-studio', 'craft'],
    excerpt: 'A day in the joinery, where the difference between fine and finished is measured in fractions.',
    body: [
      'The oak arrives rough-sawn and sits in the racks for months before anyone touches it. Wood that is rushed will move later, and a console that moves is a console that fails.',
      'When a plank is finally chosen, it is planed, jointed, and dry-fit — twice — before any glue is mixed. The tapered legs on the Ostend bench are cut on a hand-guided jig, then pared to the line with a chisel.',
      'None of this is visible in the finished piece. That is rather the point. Good joinery disappears; you notice only that nothing creaks, nothing racks, and the whole thing feels like it was grown rather than assembled.',
    ],
  },
  {
    slug: 'light-a-room-slowly',
    title: 'How to Light a Room Slowly',
    publishedAt: '2026-03-15',
    tags: ['at-home', 'design-notes'],
    excerpt: 'One overhead fixture is a decision. Three sources at three heights is a room.',
    body: [
      'Most rooms are lit from a single point in the ceiling, which is why most rooms feel flat after dark. Light wants to come from more than one place, and from below the eye as often as above it.',
      'Start with a low source — a table lamp on a console, a pair of sconces at seated height. Add a middle layer, then let the overhead fixture do the least work of the three. The room gains depth the way a landscape does at dusk.',
      'The goal is not brightness. It is having somewhere for the shadows to go. A well-lit room is mostly a room with good shadows.',
    ],
  },
  {
    slug: 'in-praise-of-the-unfinished',
    title: 'In Praise of the Unfinished',
    publishedAt: '2026-02-15',
    tags: ['craft', 'materials'],
    excerpt: 'On matte glazes, raw edges, and the quiet confidence of leaving marks in.',
    body: [
      'A perfectly uniform surface tells you a machine made it. A surface that breaks and pools and varies tells you a hand did. We tend to prefer the second, and we design toward it on purpose.',
      'The Vidra vase is glazed by pouring, not spraying, so the glaze runs thicker at the base and thins toward the rim. The stoneware shows through where it wants to. This is not a flaw list; it is the finish.',
      'There is a confidence in leaving the marks in — in trusting that the eye reads handmade as honest. The unfinished, done deliberately, is often the most finished thing in the room.',
    ],
  },
]
