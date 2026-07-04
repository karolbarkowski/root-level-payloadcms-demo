import type { CollectionConfig } from 'payload'

/**
 * Product categories — the top-level facet for the collection grid
 * (Lighting, Furniture, Decor, Mirrors, …). Kept as its own collection so
 * editors can manage the facet list without touching code.
 */
export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'title', group: 'Catalog' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL segment, e.g. "lighting"' },
    },
    { name: 'description', type: 'textarea' },
  ],
}
