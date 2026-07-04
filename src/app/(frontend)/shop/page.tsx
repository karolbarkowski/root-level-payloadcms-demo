import Link from 'next/link'
import { getCategories, getProducts } from '@/lib/queries'
import { ProductCard } from '@/components/ProductCard'
import { CollectionFilters, type FacetData, type ActiveFilters } from '@/components/CollectionFilters'

const PRICE_CEILING = 2600

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const [categories, products] = await Promise.all([getCategories(), getProducts()])

  // ---- parse active filters from the URL ----
  const category = typeof sp.category === 'string' ? sp.category : 'all'
  const finishesParam = sp.finish
  const finishes = Array.isArray(finishesParam) ? finishesParam : finishesParam ? [finishesParam] : []
  const priceMax = sp.max ? Number(sp.max) : PRICE_CEILING
  const search = typeof sp.q === 'string' ? sp.q : ''

  const active: ActiveFilters = { category, finishes, priceMax, search }

  // ---- facet options ----
  const finishSet: Array<{ name: string; swatch: string }> = []
  for (const p of products) {
    for (const f of p.finishes) {
      if (!finishSet.find((x) => x.name === f.name)) finishSet.push(f)
    }
  }
  const facets: FacetData = {
    categories: categories.map((c) => ({ slug: c.slug, title: c.title })),
    finishes: finishSet,
    priceCeiling: PRICE_CEILING,
  }

  // ---- filter (AND across facet types, OR within finishes) ----
  const q = search.trim().toLowerCase()
  const filtered = products.filter((p) => {
    if (category !== 'all' && p.categorySlug !== category) return false
    if (finishes.length && !p.finishes.some((f) => finishes.includes(f.name))) return false
    if (p.basePrice > priceMax) return false
    if (q && !(p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q))) return false
    return true
  })

  const collectionTitle =
    category === 'all' ? 'All Furnishings' : (categories.find((c) => c.slug === category)?.title ?? 'All Furnishings')
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? 'piece' : 'pieces'}`

  return (
    <div className="rl-container rl-view" style={{ padding: '40px 32px 96px' }}>
      <div className="rl-breadcrumb" style={{ marginBottom: 28 }}>
        <Link href="/">Home</Link>
        <span>/</span>
        <span style={{ color: 'var(--color-ink)' }}>{collectionTitle}</span>
      </div>
      <h1 className="rl-h1" style={{ fontSize: 44, margin: '0 0 8px' }}>
        {collectionTitle}
      </h1>
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 40 }}>{resultLabel}</div>

      <div className="rl-two-col" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, alignItems: 'start' }}>
        <CollectionFilters facets={facets} active={active} />

        <div>
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px 20px' }}>
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} showSku />
              ))}
            </div>
          ) : (
            <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: 24, color: 'var(--color-ink)', marginBottom: 12 }}>
                Nothing matches those filters
              </div>
              <Link href="/shop" style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brass)' }}>
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
