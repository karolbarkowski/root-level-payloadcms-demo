import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { gradientFor } from '@/lib/gradient'
import { money } from '@/lib/format'

interface OrderItem {
  product?: { slug?: string } | string | null
  name: string
  variant?: string
  sku?: string
  quantity: number
  unitPrice: number
}

export default async function OrderConfirmationPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'orders',
    where: { orderNumber: { equals: number } },
    depth: 1,
    limit: 1,
  })
  const order = docs[0] as unknown as
    | { orderNumber: string; email: string; total: number; items: OrderItem[] }
    | undefined
  if (!order) notFound()

  const seedOf = (item: OrderItem) =>
    item.product && typeof item.product === 'object' ? item.product.slug ?? item.name : item.name

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '90px 32px 120px', textAlign: 'center' }}>
      <div className="rl-eyebrow" style={{ marginBottom: 20 }}>
        Order Confirmed
      </div>
      <h1 className="rl-h1" style={{ fontSize: 46, margin: '0 0 18px' }}>
        Thank you.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--color-text-secondary)', margin: '0 0 10px' }}>
        Your order <strong style={{ color: 'var(--color-ink)' }}>{order.orderNumber}</strong> is confirmed.
      </p>
      <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', margin: '0 0 44px' }}>
        A confirmation has been sent to {order.email}.
      </p>

      <div style={{ border: '1px solid var(--color-border)', textAlign: 'left', padding: 32, marginBottom: 36 }}>
        {order.items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 56, height: 56, background: gradientFor(seedOf(item)) }} />
              <div>
                <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: 16 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {[item.variant, `Qty ${item.quantity}`].filter(Boolean).join(' · ')}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 15 }}>{money(item.unitPrice * item.quantity)}</div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, paddingTop: 20 }}>
          <span>Total</span>
          <span>{money(order.total)}</span>
        </div>
      </div>

      <Link href="/" className="rl-btn rl-btn--secondary rl-btn--lg">
        Continue Shopping
      </Link>
    </div>
  )
}
