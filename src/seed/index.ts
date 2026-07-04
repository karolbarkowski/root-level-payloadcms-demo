import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { categories, tags, products, posts, type SeedProduct } from './data'

/** Build a minimal, valid Lexical editor state from plain paragraphs. */
function paragraphs(paras: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paras.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        children: [
          {
            type: 'text',
            text,
            format: 0,
            style: '',
            mode: 'normal' as const,
            detail: 0,
            version: 1,
          },
        ],
      })),
    },
  }
}

const SIZE_VALUE_BY_COUNT: Record<number, Array<'small' | 'medium' | 'large'>> = {
  1: ['medium'],
  2: ['small', 'large'],
  3: ['small', 'medium', 'large'],
}

function finishCode(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

/** Expand a product's finishes × sizes into the Payload variants array. */
function buildVariants(p: SeedProduct) {
  const sizeValues = SIZE_VALUE_BY_COUNT[p.sizes.length] ?? []
  const variants: Array<{
    finish: string
    swatch: string
    size?: 'small' | 'medium' | 'large'
    sku: string
    priceModifier: number
    stock: number
  }> = []

  for (const f of p.finishes) {
    if (p.sizes.length === 0) {
      variants.push({
        finish: f.name,
        swatch: f.swatch,
        sku: `${p.baseSku}-${finishCode(f.name)}`,
        priceModifier: 0,
        stock: 8,
      })
    } else {
      p.sizes.forEach((s, i) => {
        const size = sizeValues[i]
        variants.push({
          finish: f.name,
          swatch: f.swatch,
          size,
          sku: `${p.baseSku}-${finishCode(f.name)}-${size[0].toUpperCase()}`,
          priceModifier: s.mod,
          stock: 8,
        })
      })
    }
  }
  return variants
}

async function clearCollection(payload: Awaited<ReturnType<typeof getPayload>>, collection: any) {
  await payload.delete({ collection, where: { id: { exists: true } } })
}

async function seed() {
  const payload = await getPayload({ config: await config })

  console.log('→ Clearing existing catalog / journal / order data…')
  await clearCollection(payload, 'orders')
  await clearCollection(payload, 'products')
  await clearCollection(payload, 'posts')
  await clearCollection(payload, 'categories')
  await clearCollection(payload, 'tags')

  // --- Admin user (only if none exists) ---
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@rootlevel.demo',
        password: 'rootlevel',
        name: 'Root Level Admin',
      },
    })
    console.log('→ Created admin user  admin@rootlevel.demo / rootlevel')
  } else {
    console.log('→ Admin user already exists — skipping')
  }

  // --- Categories ---
  const categoryIdBySlug: Record<string, string> = {}
  for (const c of categories) {
    const doc = await payload.create({ collection: 'categories', data: c })
    categoryIdBySlug[c.slug] = String(doc.id)
  }
  console.log(`→ Created ${categories.length} categories`)

  // --- Tags ---
  const tagIdBySlug: Record<string, string> = {}
  for (const t of tags) {
    const doc = await payload.create({ collection: 'tags', data: t })
    tagIdBySlug[t.slug] = String(doc.id)
  }
  console.log(`→ Created ${tags.length} tags`)

  // --- Products ---
  for (const p of products) {
    await payload.create({
      collection: 'products',
      data: {
        name: p.name,
        slug: p.slug,
        category: categoryIdBySlug[p.category],
        shortDescription: p.shortDescription,
        description: paragraphs(p.description),
        basePrice: p.basePrice,
        dimensions: p.dimensions,
        baseSku: p.baseSku,
        images: [],
        variants: buildVariants(p),
        isNew: p.isNew,
      },
    })
  }
  console.log(`→ Created ${products.length} products`)

  // --- Posts ---
  for (const post of posts) {
    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: paragraphs(post.body),
        tags: post.tags.map((slug) => tagIdBySlug[slug]).filter(Boolean),
        publishedAt: new Date(post.publishedAt).toISOString(),
      },
    })
  }
  console.log(`→ Created ${posts.length} posts`)

  console.log('\n✓ Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
