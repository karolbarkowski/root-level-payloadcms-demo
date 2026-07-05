'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { money } from '@/lib/format'

export interface FacetData {
  categories: Array<{ slug: string; title: string }>
  finishes: Array<{ name: string; swatch: string }>
  priceCeiling: number
}

export interface ActiveFilters {
  category: string // 'all' or slug
  finishes: string[]
  priceMax: number
  search: string
}

export function CollectionFilters({ facets, active }: { facets: FacetData; active: ActiveFilters }) {
  const router = useRouter()
  const [search, setSearch] = useState(active.search)
  const [priceMax, setPriceMax] = useState(active.priceMax)
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const priceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keep local state in sync when the URL changes elsewhere.
  useEffect(() => setSearch(active.search), [active.search])
  useEffect(() => setPriceMax(active.priceMax), [active.priceMax])

  function pushFilters(next: Partial<ActiveFilters>) {
    const merged: ActiveFilters = {
      category: next.category ?? active.category,
      finishes: next.finishes ?? active.finishes,
      priceMax: next.priceMax ?? priceMax,
      search: next.search ?? search,
    }
    const params = new URLSearchParams()
    if (merged.category && merged.category !== 'all') params.set('category', merged.category)
    merged.finishes.forEach((f) => params.append('finish', f))
    if (merged.priceMax < facets.priceCeiling) params.set('max', String(merged.priceMax))
    if (merged.search.trim()) params.set('q', merged.search.trim())
    const qs = params.toString()
    router.push(qs ? `/shop?${qs}` : '/shop', { scroll: false })
  }

  function onSearchChange(value: string) {
    setSearch(value)
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => pushFilters({ search: value }), 300)
  }

  function onPriceChange(value: number) {
    setPriceMax(value)
    if (priceTimer.current) clearTimeout(priceTimer.current)
    priceTimer.current = setTimeout(() => pushFilters({ priceMax: value }), 250)
  }

  function toggleFinish(name: string) {
    const next = active.finishes.includes(name)
      ? active.finishes.filter((f) => f !== name)
      : [...active.finishes, name]
    pushFilters({ finishes: next })
  }

  const categoryItems = [{ slug: 'all', title: 'All Furnishings' }, ...facets.categories]

  return (
    <div className="rl-sticky" style={{ position: 'sticky', top: 110 }}>
      {/* Search */}
      <div style={{ marginBottom: 34 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 8,
          }}
        >
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search pieces"
            aria-label="Search pieces"
            style={{
              border: 0,
              background: 'transparent',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              width: '100%',
              outline: 'none',
              color: 'var(--color-ink)',
            }}
          />
        </div>
      </div>

      {/* Category */}
      <div style={{ marginBottom: 34 }}>
        <div className="rl-facet-head">Category</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {categoryItems.map((c) => {
            const activeCat = active.category === c.slug
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => pushFilters({ category: c.slug })}
                aria-pressed={activeCat}
                className={`rl-facet-item${activeCat ? ' is-active' : ''}`}
              >
                {c.title}
              </button>
            )
          })}
        </div>
      </div>

      {/* Finish */}
      {facets.finishes.length > 0 && (
        <div style={{ marginBottom: 34 }}>
          <div className="rl-facet-head">Finish</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {facets.finishes.map((f) => {
              const on = active.finishes.includes(f.name)
              return (
                <label
                  key={f.name}
                  onClick={() => toggleFinish(f.name)}
                  className="rl-facet-item"
                  style={{ display: 'flex', alignItems: 'center', gap: 11 }}
                >
                  <span
                    style={{
                      width: 17,
                      height: 17,
                      border: '1px solid var(--color-ink)',
                      borderRadius: 2,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: on ? 'var(--color-ink)' : 'transparent',
                      transition: 'var(--transition-hover)',
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        background: on ? 'var(--color-bg)' : 'transparent',
                        transform: on ? 'scale(1)' : 'scale(0)',
                        transition: 'transform var(--duration-fast) var(--ease-standard)',
                      }}
                    />
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        border: '1px solid var(--color-border)',
                        background: f.swatch,
                      }}
                    />
                    {f.name}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Max Price */}
      <div style={{ marginBottom: 30 }}>
        <div className="rl-facet-head">Max Price</div>
        <input
          type="range"
          min={150}
          max={facets.priceCeiling}
          step={20}
          value={priceMax}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          aria-label="Maximum price"
          style={{ width: '100%', accentColor: 'var(--color-ink)' }}
        />
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 8 }}>
          Up to {money(priceMax)}
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push('/shop', { scroll: false })}
        className="rl-facet-item is-active"
        style={{
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Clear all filters
      </button>
    </div>
  )
}
