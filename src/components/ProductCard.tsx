import Link from 'next/link'
import type { NormProduct } from '@/lib/products'
import { gradientFor } from '@/lib/gradient'
import { money } from '@/lib/format'

export function ProductCard({ product, showSku = false }: { product: NormProduct; showSku?: boolean }) {
  return (
    <Link href={`/products/${product.slug}`} className="rl-product">
      <div className="rl-product__media rl-media" style={{ background: gradientFor(product.slug) }}>
        {product.imageUrls[0] && <img src={product.imageUrls[0]} alt={product.name} />}
        {product.isNew && <span className="rl-product__flag">New</span>}
      </div>
      <div className="rl-product__name">{product.name}</div>
      {product.dimensions && <div className="rl-product__dims">{product.dimensions}</div>}
      {showSku && product.baseSku && <div className="rl-product__sku">SKU {product.baseSku}</div>}
      <div className="rl-product__price">{money(product.basePrice)}</div>
    </Link>
  )
}
