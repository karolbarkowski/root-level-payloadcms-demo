import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/queries'
import { ProductPurchase } from '@/components/ProductPurchase'
import { ProductGallery } from '@/components/ProductGallery'
import { RichText } from '@/components/RichText'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const categoryHref = product.categorySlug ? `/shop?category=${product.categorySlug}` : '/shop'

  return (
    <div className="rl-container" style={{ padding: '40px 32px 96px' }}>
      <div className="rl-breadcrumb" style={{ marginBottom: 32 }}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href={categoryHref}>{product.categoryTitle}</Link>
        <span>/</span>
        <span style={{ color: 'var(--color-ink)' }}>{product.name}</span>
      </div>

      <div className="rl-two-col" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'start' }}>
        {/* GALLERY */}
        <ProductGallery slug={product.slug} name={product.name} imageUrls={product.imageUrls} />

        {/* INFO */}
        <div className="rl-sticky" style={{ position: 'sticky', top: 110 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: 14 }}>
            {product.categoryTitle}
          </div>
          <h1 className="rl-h1" style={{ fontSize: 40, margin: '0 0 14px' }}>
            {product.name}
          </h1>
          <ProductPurchase
            product={product}
            descriptionSlot={product.description ? <RichText data={product.description} className="rl-richtext rl-richtext--pdp" /> : null}
          />
        </div>
      </div>
    </div>
  )
}
