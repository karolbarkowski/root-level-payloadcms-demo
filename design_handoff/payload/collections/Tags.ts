import type { CollectionConfig } from 'payload'

/**
 * Tags — simple labels attached to blog posts (many-to-many via the Posts
 * collection's relationship field).
 */
export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'title', group: 'Journal' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
  ],
}
