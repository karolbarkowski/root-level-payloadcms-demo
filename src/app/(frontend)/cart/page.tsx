'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/CartProvider'
import { money } from '@/lib/format'

export default function CartPage() {
  const { lines, subtotal, changeQty, removeLine, hydrated } = useCart()
  const router = useRouter()

  return (
    <div className="rl-view" style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px 96px' }}>
      <h1 className="rl-h1" style={{ fontSize: 44, margin: '0 0 40px' }}>
        Your Cart
      </h1>

      {!hydrated ? null : lines.length === 0 ? (
        <div style={{ padding: '60px 0', borderTop: '1px solid var(--color-border)' }}>
          <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', margin: '0 0 22px' }}>Your cart is empty.</p>
          <Link href="/shop" className="rl-btn">
            Browse the Collection
          </Link>
        </div>
      ) : (
        <div className="rl-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 56, alignItems: 'start' }}>
          <div>
            {lines.map((l) => (
              <div
                key={l.key}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '96px 1fr auto',
                  gap: 20,
                  padding: '24px 0',
                  borderBottom: '1px solid var(--color-border)',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: 96, height: 96, background: l.gradient }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: 18, marginBottom: 5 }}>{l.name}</div>
                  {l.variant && <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 3 }}>{l.variant}</div>}
                  {l.sku && <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', letterSpacing: '0.04em', marginBottom: 12 }}>SKU {l.sku}</div>}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 2 }}>
                      <button onClick={() => changeQty(l.key, -1)} aria-label="Decrease quantity" style={{ width: 32, height: 34, background: 'transparent', border: 0, cursor: 'pointer', fontSize: 15 }}>
                        −
                      </button>
                      <span style={{ width: 26, textAlign: 'center', fontSize: 14 }}>{l.qty}</span>
                      <button onClick={() => changeQty(l.key, 1)} aria-label="Increase quantity" style={{ width: 32, height: 34, background: 'transparent', border: 0, cursor: 'pointer', fontSize: 15 }}>
                        +
                      </button>
                    </div>
                    <span
                      onClick={() => removeLine(l.key)}
                      className="rl-nav-util"
                      style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
                    >
                      Remove
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: 16, textAlign: 'right' }}>{money(l.unit * l.qty)}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--color-bg-alt)', padding: 32 }}>
            <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: 22, marginBottom: 24 }}>Order Summary</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 14 }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 14 }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Delivery</span>
              <span>Complimentary</span>
            </div>
            <div style={{ height: 1, background: 'var(--color-border)', margin: '18px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, marginBottom: 26 }}>
              <span>Total</span>
              <span>{money(subtotal)}</span>
            </div>
            <button onClick={() => router.push('/checkout')} className="rl-btn rl-btn--block">
              Proceed to Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
