'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  const [justAdded, setJustAdded] = useState(false)
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (addedTimer.current) clearTimeout(addedTimer.current) }, [])

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
    setJustAdded(true)
    if (addedTimer.current) clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setJustAdded(false), 1200)
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
                className="rl-swatch rl-swatch--lg"
                style={{ background: f.swatch }}
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
            {product.sizes.map((s, i) => (
              <button
                key={s.value}
                onClick={() => setSizeIdx(i)}
                aria-pressed={i === sizeIdx}
                className="rl-sizepill"
              >
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Qty + Add */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 26 }}>
        <div className="rl-qty">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="rl-qty__btn"
          >
            −
          </button>
          <span key={qty} className="rl-qty__val rl-num-change">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="rl-qty__btn"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAdd}
          className={justAdded ? 'rl-btn rl-btn--brass' : 'rl-btn'}
          style={{ flex: 1, height: 50 }}
        >
          {justAdded ? 'Added ✓' : 'Add to Cart'}
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
