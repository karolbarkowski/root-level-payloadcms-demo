import type { CollectionConfig } from 'payload'

/**
 * Orders — deliberately minimal for a demo. Captures only what an order
 * confirmation needs: the line items, a total, a stubbed shipping snapshot,
 * and a status. No payment integration.
 */
export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'email', 'total', 'status', 'createdAt'],
    group: 'Store',
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Human-facing reference, e.g. RL-2026-0147' },
    },
    { name: 'email', type: 'email', required: true },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products' },
        { name: 'name', type: 'text', required: true },
        { name: 'variant', type: 'text', admin: { description: 'e.g. "Antique Brass / Large"' } },
        { name: 'sku', type: 'text' },
        { name: 'quantity', type: 'number', required: true, defaultValue: 1, min: 1 },
        { name: 'unitPrice', type: 'number', required: true, min: 0 },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
      admin: { description: 'Order total in USD.' },
    },
    {
      name: 'shipping',
      type: 'group',
      admin: { description: 'Snapshot of the delivery details (demo stub).' },
      fields: [
        { name: 'name', type: 'text' },
        { name: 'address', type: 'textarea' },
        {
          name: 'method',
          type: 'select',
          defaultValue: 'white-glove',
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'White Glove', value: 'white-glove' },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'confirmed',
      options: [
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
      ],
    },
  ],
}
