import type { CollectionConfig } from 'payload'

/**
 * Products — the core catalog unit.
 *
 * Variants are modelled as an array of finish × size combinations. Each variant
 * carries its own SKU, an optional price delta, a colour swatch (hex) for the
 * product-detail selector, and a simple stock count. This covers the two variant
 * axes the storefront exposes: finish/material and size, plus colour swatches.
 */
export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'basePrice', 'isNew'],
    group: 'Catalog',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL segment, e.g. "aurelia-chandelier"' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      index: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      admin: { description: 'One-line editorial caption used on cards & hero.' },
    },
    {
      name: 'description',
      type: 'richText',
      admin: { description: 'Full product story shown on the detail page.' },
    },
    {
      name: 'basePrice',
      type: 'number',
      required: true,
      min: 0,
      admin: { description: 'Price in USD before any per-variant modifier.' },
    },
    {
      name: 'dimensions',
      type: 'text',
      admin: { description: 'e.g. 34"W × 34"D × 41"H' },
    },
    {
      name: 'baseSku',
      type: 'text',
      admin: { description: 'Root SKU; variant SKUs extend it.' },
    },
    {
      name: 'images',
      type: 'array',
      labels: { singular: 'Image', plural: 'Images' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'variants',
      type: 'array',
      labels: { singular: 'Variant', plural: 'Variants' },
      admin: { description: 'Finish × size combinations. Leave empty for a single-option product.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'finish', type: 'text', admin: { width: '40%', description: 'e.g. Antique Brass' } },
            {
              name: 'swatch',
              type: 'text',
              admin: { width: '30%', description: 'Hex colour for the swatch dot, e.g. #9C7A45' },
            },
            {
              name: 'size',
              type: 'select',
              admin: { width: '30%' },
              options: [
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'sku', type: 'text', admin: { width: '40%' } },
            {
              name: 'priceModifier',
              type: 'number',
              defaultValue: 0,
              admin: { width: '30%', description: 'Added to basePrice for this variant.' },
            },
            { name: 'stock', type: 'number', defaultValue: 0, admin: { width: '30%' } },
          ],
        },
      ],
    },
    {
      name: 'isNew',
      type: 'checkbox',
      label: 'Flag as New',
      defaultValue: false,
    },
  ],
}
