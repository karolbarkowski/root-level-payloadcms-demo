'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCart } from '@/components/CartProvider'
import { money } from '@/lib/format'
import { placeOrder } from '@/app/actions/placeOrder'

// Demo checkout — details are hard-coded (no form, no payment).
const MOCK = {
  name: 'Ava Mercer',
  address: '218 Greenwich Street, Apt 9C\nNew York, NY 10007\nUnited States',
  email: 'ava.mercer@example.com',
  phone: '+1 (212) 555 0148',
}

export default function CheckoutPage() {
  const { lines, subtotal, clear, hydrated } = useCart()
  const router = useRouter()
  const [placing, setPlacing] = useState(false)

  // If the cart is empty (e.g. direct navigation), bounce back to the cart.
  useEffect(() => {
    if (hydrated && lines.length === 0 && !placing) router.replace('/cart')
  }, [hydrated, lines.length, placing, router])

  async function handlePlaceOrder() {
    if (placing || lines.length === 0) return
    setPlacing(true)
    try {
      const { orderNumber } = await placeOrder({
        email: MOCK.email,
        items: lines.map((l) => ({
          productId: l.productId,
          name: l.name,
          variant: l.variant,
          sku: l.sku,
          quantity: l.qty,
          unitPrice: l.unit,
        })),
        total: subtotal,
        shipping: {
          name: MOCK.name,
          address: MOCK.address,
          method: 'white-glove',
        },
      })
      clear()
      router.push(`/order/${orderNumber}`)
    } catch (err) {
      console.error(err)
      setPlacing(false)
      alert('Sorry, something went wrong placing your order. Please try again.')
    }
  }

  if (!hydrated || lines.length === 0) return null

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px 96px' }}>
      <div className="rl-breadcrumb" style={{ marginBottom: 28 }}>
        <Link href="/cart">Cart</Link>
        <span>/</span>
        <span style={{ color: 'var(--color-ink)' }}>Delivery</span>
      </div>
      <h1 className="rl-h1" style={{ fontSize: 44, margin: '0 0 8px' }}>
        Delivery Details
      </h1>
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 40 }}>
        Demo checkout. Details are pre-filled and no payment is taken.
      </div>

      <div className="rl-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 56, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <InfoCard label="Shipping To">
            <div style={{ fontSize: 16, lineHeight: 1.7 }}>
              {MOCK.name}
              <br />
              218 Greenwich Street, Apt 9C
              <br />
              New York, NY 10007
              <br />
              United States
            </div>
          </InfoCard>
          <InfoCard label="Delivery Method">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 16, marginBottom: 4 }}>White-Glove Delivery</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                  Unpacked, placed, and packaging removed. 3-5 weeks.
                </div>
              </div>
              <div style={{ fontSize: 14, color: 'var(--color-brass)' }}>Complimentary</div>
            </div>
          </InfoCard>
          <InfoCard label="Contact">
            <div style={{ fontSize: 16, lineHeight: 1.7 }}>
              {MOCK.email}
              <br />
              {MOCK.phone}
            </div>
          </InfoCard>
        </div>

        <div style={{ background: 'var(--color-bg-alt)', padding: 32 }}>
          <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: 22, marginBottom: 24 }}>Order Summary</div>
          {lines.map((l) => (
            <div key={l.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 12 }}>
              <span style={{ color: 'var(--color-text-secondary)', maxWidth: 200 }}>
                {l.name} × {l.qty}
              </span>
              <span>{money(l.unit * l.qty)}</span>
            </div>
          ))}
          <div style={{ height: 1, background: 'var(--color-border)', margin: '18px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, marginBottom: 26 }}>
            <span>Total</span>
            <span>{money(subtotal)}</span>
          </div>
          <button onClick={handlePlaceOrder} disabled={placing} className="rl-btn rl-btn--block">
            {placing ? 'Placing Order…' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid var(--color-border)', padding: 26 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: 16 }}>
        {label}
      </div>
      {children}
    </div>
  )
}
