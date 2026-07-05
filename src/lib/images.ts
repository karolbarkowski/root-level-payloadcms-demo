/**
 * Editorial photography placeholders.
 *
 * The storefront ships without a real photo library. Rather than flat gradient
 * blocks, we serve deterministic editorial photography from picsum.photos,
 * seeded by slug so every surface is stable across renders. A real `media`
 * upload (imageUrls / coverUrl from the CMS) always wins over these; the helper
 * only fills the gap where no photo exists yet.
 *
 * Grayscale is intentional art direction: monochrome photography keeps random
 * stock from fighting the warm brass/bone palette and reads as deliberate, not
 * accidental. The brand's warmth returns through the serif type, the brass
 * accents, and the warm scrim overlays layered on the hero and category tiles.
 */

const BASE = 'https://picsum.photos/seed'

/** A stable grayscale photo URL for a seed at the given pixel dimensions. */
export function photoFor(seed: string, w: number, h: number, variant = 0): string {
  const s = encodeURIComponent(variant ? `${seed}-${variant}` : seed)
  return `${BASE}/${s}/${w}/${h}?grayscale`
}

/** `count` distinct-but-stable grayscale photos for a seed (PDP gallery views). */
export function photosFor(seed: string, count: number, w: number, h: number): string[] {
  return Array.from({ length: count }, (_, i) => photoFor(seed, w, h, i))
}
