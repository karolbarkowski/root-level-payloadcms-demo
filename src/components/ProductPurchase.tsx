'use client'

import React, { useMemo, useState } from 'react'
import type { NormProduct } from '@/lib/products'
import { resolveSelection } from '@/lib/products'
import { money } from '@/lib/format'
import { gradientFor } from '@/lib/gradient'
import { useCart } from './CartProvider'

export function ProductPurchase({
  product,
  descriptionSlot,
}: {
  product: NormProduct
  descriptionSlot?: React.ReactNode
}) {
  const { addLine } = useCart()
  const [finishIdx, setFinishIdx] = useState(0)
  const [sizeIdx, setSizeIdx] = useState(0)
  const [qty, setQty] = useState(1)

  const selectedFinish = product.finishes[finishIdx]?.name ?? null
  const selectedSize = product.sizes[sizeIdx]?.value ?? null

  const { price, sku, variantLabel } = useMemo(
    () => resolveSelection(product, selectedFinish, selectedSize),
    [product, selectedFinish, selectedSize],
  )

  function handleAdd() {
    addLine(
      {
        key: `${product.slug}|${variantLabel}`,
        slug: product.slug,
        productId: product.id,
        name: product.name,
        variant: variantLabel,
        sku,
        unit: price,
        gradient: gradientFor(product.slug),
      },
      qty,
    )
  }

  return (
    <>
      <div style={{ fontSize: 22, marginBottom: 22 }}>{money(price)}</div>
      {product.shortDescription && (
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--color-text-secondary)', margin: '0 0 30px' }}>
          {product.shortDescription}
        </p>
      )}

      {/* Finish */}
      {product.finishes.length > 0 && (
        <>
          <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ink)', fontWeight: 600, marginBottom: 12 }}>
            Finish — {selectedFinish}
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {product.finishes.map((f, i) => (
              <button
                key={f.name}
                onClick={() => setFinishIdx(i)}
                title={f.name}
                aria-label={f.name}
                aria-pressed={i === finishIdx}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  background: f.swatch,
                  cursor: 'pointer',
                  padding: 0,
                  border: '1px solid var(--color-border)',
                  boxShadow: i === finishIdx ? '0 0 0 2px var(--color-bg), 0 0 0 3px var(--color-ink)' : 'none',
                  transition: 'var(--transition-hover)',
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Size */}
      {product.sizes.length > 0 && (
        <>
          <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ink)', fontWeight: 600, marginBottom: 12 }}>
            Size
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            {product.sizes.map((s, i) => {
              const on = i === sizeIdx
              return (
                <button
                  key={s.value}
                  onClick={() => setSizeIdx(i)}
                  aria-pressed={on}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    padding: '10px 18px',
                    borderRadius: 2,
                    cursor: 'pointer',
                    background: on ? 'var(--color-ink)' : 'transparent',
                    color: on ? 'var(--color-bg)' : 'var(--color-ink)',
                    border: `1px solid ${on ? 'var(--color-ink)' : 'var(--color-border)'}`,
                    transition: 'var(--transition-hover)',
                  }}
                >
                  {s.label}
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* Qty + Add */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 26 }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 2 }}>
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            style={{ width: 44, height: 48, background: 'transparent', border: 0, fontSize: 18, cursor: 'pointer', color: 'var(--color-ink)' }}
          >
            −
          </button>
          <span style={{ width: 34, textAlign: 'center', fontSize: 15 }}>{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            style={{ width: 44, height: 48, background: 'transparent', border: 0, fontSize: 18, cursor: 'pointer', color: 'var(--color-ink)' }}
          >
            +
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="rl-btn"
          style={{ flex: 1, height: 50 }}
        >
          Add to Cart
        </button>
      </div>
      <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: 34 }}>
        Ships Free · White-Glove Delivery
      </div>

      <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 28 }} />

      {descriptionSlot}

      <SpecList dimensions={product.dimensions} sku={sku} />
    </>
  )
}

function SpecList({ dimensions, sku }: { dimensions: string; sku: string }) {
  return (
    <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {dimensions && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: '1px solid var(--color-border)', paddingBottom: 10 }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Dimensions</span>
          <span>{dimensions}</span>
        </div>
      )}
      {sku && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: '1px solid var(--color-border)', paddingBottom: 10 }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>SKU</span>
          <span>{sku}</span>
        </div>
      )}
    </div>
  )
}
