/**
 * Warm gradient placeholders.
 *
 * The design ships with no real photography — every image is a warm, editorial
 * gradient placeholder (swap in real `media` uploads later). To keep those
 * placeholders stable and on-brand we map the known demo seeds (product /
 * category / post slugs) to the exact tone pairs from the design prototype, and
 * fall back to a deterministic hash into a curated warm palette for anything
 * new an editor adds.
 */

type Tone = [string, string]

// Exact tone pairs from the design prototype, keyed by slug.
const SEED_TONES: Record<string, Tone> = {
  // categories
  lighting: ['#C9B79C', '#8A6E45'],
  furniture: ['#D6C7B0', '#8C7457'],
  decor: ['#DED4C3', '#9C7A45'],
  mirrors: ['#D7CEBE', '#6B4E2E'],
  // products
  'aurelia-chandelier': ['#C9B79C', '#8A6E45'],
  'halden-pendant': ['#D8CDBB', '#9C7A45'],
  'marlowe-table-lamp': ['#E0D6C4', '#B79A6A'],
  'cove-wall-sconce': ['#CFC3AE', '#7C6136'],
  'senna-lounge-chair': ['#D6C7B0', '#8C7457'],
  'delford-console': ['#CDBB9E', '#6B4E2E'],
  'brannon-coffee-table': ['#DCD3C2', '#5C5750'],
  'ostend-bench': ['#D9CBB2', '#A0855E'],
  'vidra-vase': ['#DED4C3', '#9C7A45'],
  'torres-bookends': ['#CBB897', '#7C6136'],
  'lindus-floor-mirror': ['#D7CEBE', '#9C7A45'],
  'fenwick-round-mirror': ['#D2C6B0', '#6B4E2E'],
  // posts
  'weight-of-a-good-object': ['#CBB897', '#7C6136'],
  'living-with-brass': ['#D8CDBB', '#9C7A45'],
  'notes-from-the-bench': ['#D9CBB2', '#A0855E'],
  'light-a-room-slowly': ['#E0D6C4', '#B79A6A'],
  'in-praise-of-the-unfinished': ['#DED4C3', '#9C7A45'],
}

// Curated warm palette for hash fallback.
const PALETTE: Tone[] = [
  ['#C9B79C', '#8A6E45'],
  ['#D6C7B0', '#8C7457'],
  ['#DED4C3', '#9C7A45'],
  ['#D7CEBE', '#6B4E2E'],
  ['#E0D6C4', '#B79A6A'],
  ['#CFC3AE', '#7C6136'],
  ['#D9CBB2', '#A0855E'],
  ['#DCD3C2', '#5C5750'],
]

function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function toneFor(seed: string | null | undefined): Tone {
  if (!seed) return PALETTE[0]
  return SEED_TONES[seed] ?? PALETTE[hash(seed) % PALETTE.length]
}

/** A `linear-gradient(...)` string for use as a CSS background. */
export function gradientFor(seed: string | null | undefined): string {
  const [a, b] = toneFor(seed)
  return `linear-gradient(135deg, ${a} 0%, ${b} 100%)`
}

/** A subtly different gradient — used for PDP gallery thumbnails. */
export function thumbGradients(seed: string | null | undefined): string[] {
  const [a, b] = toneFor(seed)
  return [
    `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
    `linear-gradient(135deg, ${b} 0%, ${a} 100%)`,
    `linear-gradient(135deg, ${a} 0%, #EFEBE3 100%)`,
    `linear-gradient(135deg, #EFEBE3 0%, ${b} 100%)`,
  ]
}
