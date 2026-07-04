import { getPayloadClient } from './payload'
import { normalizeProduct, type NormProduct } from './products'

export async function getCategories() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'title',
  })
  return docs as unknown as Array<{ id: string; title: string; slug: string; description?: string }>
}

export async function getProducts(): Promise<NormProduct[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 200,
    sort: 'name',
  })
  return docs.map((d) => normalizeProduct(d as unknown as Record<string, unknown>))
}

export async function getProductBySlug(slug: string): Promise<NormProduct | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  const doc = docs[0]
  return doc ? normalizeProduct(doc as unknown as Record<string, unknown>) : null
}

export interface NormPost {
  id: string
  slug: string
  title: string
  excerpt: string
  tags: Array<{ title: string; slug: string }>
  publishedAt: string | null
  coverUrl: string | null
  body: unknown
}

function normalizePost(doc: Record<string, unknown>): NormPost {
  const tags = (Array.isArray(doc.tags) ? doc.tags : [])
    .filter((t) => t && typeof t === 'object')
    .map((t) => ({ title: String((t as any).title ?? ''), slug: String((t as any).slug ?? '') }))
  const cover = doc.coverImage as { url?: string; sizes?: Record<string, { url?: string }> } | string | null
  const coverUrl =
    cover && typeof cover === 'object' ? (cover.sizes?.card?.url ?? cover.url ?? null) : null
  return {
    id: String(doc.id),
    slug: String(doc.slug ?? ''),
    title: String(doc.title ?? ''),
    excerpt: String(doc.excerpt ?? ''),
    tags,
    publishedAt: (doc.publishedAt as string) ?? null,
    coverUrl,
    body: doc.body,
  }
}

export async function getPosts(): Promise<NormPost[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 200,
    sort: '-publishedAt',
  })
  return docs.map((d) => normalizePost(d as unknown as Record<string, unknown>))
}

export async function getPostBySlug(slug: string): Promise<NormPost | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  const doc = docs[0]
  return doc ? normalizePost(doc as unknown as Record<string, unknown>) : null
}

export async function getTags() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'tags', limit: 100, sort: 'title' })
  return docs as unknown as Array<{ id: string; title: string; slug: string }>
}

export async function getOrderByNumber(orderNumber: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'orders',
    where: { orderNumber: { equals: orderNumber } },
    limit: 1,
  })
  return docs[0] ?? null
}

/** Format a post date like the design: "Jun 2026". */
export function formatPostDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
