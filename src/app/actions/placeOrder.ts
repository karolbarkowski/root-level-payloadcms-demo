'use server'

import { getPayloadClient } from '@/lib/payload'

export interface PlaceOrderItem {
  productId?: string
  name: string
  variant: string
  sku: string
  quantity: number
  unitPrice: number
}

export interface PlaceOrderInput {
  email: string
  items: PlaceOrderItem[]
  total: number
  shipping: { name: string; address: string; method: 'standard' | 'white-glove' }
}

function generateOrderNumber(): string {
  // RL-2026-#### — demo reference, mirrors the prototype format.
  return 'RL-2026-' + String(Math.floor(1000 + Math.random() * 9000))
}

/**
 * Writes a minimal order to Payload and returns its human-facing number.
 * Runs server-side via the Local API (overrideAccess defaults to true), so the
 * Orders collection stays locked down to public writes.
 */
export async function placeOrder(input: PlaceOrderInput): Promise<{ orderNumber: string }> {
  if (!input.items?.length) throw new Error('Cannot place an empty order.')

  const payload = await getPayloadClient()

  // Retry a few times in the unlikely event of an orderNumber collision.
  let lastErr: unknown = null
  for (let attempt = 0; attempt < 5; attempt++) {
    const orderNumber = generateOrderNumber()
    try {
      await payload.create({
        collection: 'orders',
        data: {
          orderNumber,
          email: input.email,
          items: input.items.map((i) => ({
            ...(i.productId ? { product: i.productId } : {}),
            name: i.name,
            variant: i.variant,
            sku: i.sku,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
          total: input.total,
          shipping: {
            name: input.shipping.name,
            address: input.shipping.address,
            method: input.shipping.method,
          },
          status: 'confirmed',
        },
      })
      return { orderNumber }
    } catch (err) {
      lastErr = err
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('Failed to place order.')
}
