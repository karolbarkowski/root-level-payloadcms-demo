/**
 * View-model helpers that adapt raw Payload documents into the plain,
 * serialisable shapes the storefront UI consumes. The Payload `products`
 * collection models variants as an array of finish × size combinations; the
 * storefront presents finish and size as two independent selectors, so we
 * derive those axes here.
 */

export type SizeValue = 'small' | 'medium' | 'large'

export interface RawVariant {
  finish?: string | null
  swatch?: string | null
  size?: SizeValue | null
  sku?: string | null
  priceModifier?: number | null
  stock?: number | null
}

export interface RawMedia {
  url?: string | null
  alt?: string | null
  sizes?: Record<string, { url?: string | null }>
}

export interface Finish {
  name: string
  swatch: string
}

export interface SizeOption {
  value: SizeValue
  label: string
  priceModifier: number
}

export interface NormProduct {
  id: string
  slug: string
  name: string
  categoryTitle: string
  categorySlug: string
  shortDescription: string
  basePrice: number
  dimensions: string
  baseSku: string
  isNew: boolean
  imageUrls: string[]
  finishes: Finish[]
  sizes: SizeOption[]
  variants: RawVariant[]
  description?: unknown // Lexical rich-text JSON
}

const SIZE_ORDER: SizeValue[] = ['small', 'medium', 'large']
const SIZE_LABELS: Record<SizeValue, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
}

function imageUrlOf(entry: unknown): string | null {
  if (!entry || typeof entry !== 'object') return null
  const image = (entry as { image?: unknown }).image
  const media = (image ?? entry) as RawMedia | string
  if (typeof media === 'string') return null // unpopulated relationship (id only)
  return media?.sizes?.card?.url ?? media?.url ?? null
}

function relTitle(rel: unknown, key: 'title' | 'slug'): string {
  if (rel && typeof rel === 'object') {
    const v = (rel as Record<string, unknown>)[key]
    if (typeof v === 'string') return v
  }
  return ''
}

export function normalizeProduct(doc: Record<string, unknown>): NormProduct {
  const variants = (Array.isArray(doc.variants) ? doc.variants : []) as RawVariant[]

  // Unique finishes, first-seen order, keeping the swatch colour.
  const finishes: Finish[] = []
  for (const v of variants) {
    if (v.finish && !finishes.find((f) => f.name === v.finish)) {
      finishes.push({ name: v.finish, swatch: v.swatch || '#9C7A45' })
    }
  }

  // Unique sizes present, ordered small → large, carrying their price modifier.
  const sizes: SizeOption[] = []
  for (const size of SIZE_ORDER) {
    const match = variants.find((v) => v.size === size)
    if (match) {
      sizes.push({ value: size, label: SIZE_LABELS[size], priceModifier: match.priceModifier || 0 })
    }
  }

  const imageUrls = (Array.isArray(doc.images) ? doc.images : [])
    .map(imageUrlOf)
    .filter((u): u is string => Boolean(u))

  return {
    id: String(doc.id),
    slug: String(doc.slug ?? ''),
    name: String(doc.name ?? ''),
    categoryTitle: relTitle(doc.category, 'title') || 'All Furnishings',
    categorySlug: relTitle(doc.category, 'slug'),
    shortDescription: String(doc.shortDescription ?? ''),
    basePrice: Number(doc.basePrice ?? 0),
    dimensions: String(doc.dimensions ?? ''),
    baseSku: String(doc.baseSku ?? ''),
    isNew: Boolean(doc.isNew),
    imageUrls,
    finishes,
    sizes,
    variants,
    description: doc.description,
  }
}

/**
 * Resolve the variant + live price + display SKU for a given finish/size
 * selection. Live price = basePrice + selected size's priceModifier.
 */
export function resolveSelection(
  product: NormProduct,
  finishName: string | null,
  sizeValue: SizeValue | null,
) {
  const variant = product.variants.find(
    (v) =>
      (finishName == null || v.finish === finishName) &&
      (sizeValue == null || v.size === sizeValue),
  )
  const sizeMod = sizeValue ? (product.sizes.find((s) => s.value === sizeValue)?.priceModifier ?? 0) : 0
  const price = product.basePrice + sizeMod
  const sku = variant?.sku || product.baseSku
  const variantLabel = [finishName, sizeValue ? SIZE_LABELS[sizeValue] : null].filter(Boolean).join(' / ')
  return { variant, price, sku, variantLabel }
}
