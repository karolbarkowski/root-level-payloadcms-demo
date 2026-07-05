import Link from 'next/link'
import { getCategories, getProducts, getPosts, formatPostDate } from '@/lib/queries'
import { gradientFor } from '@/lib/gradient'
import { ProductCard } from '@/components/ProductCard'
import { Reveal } from '@/components/Reveal'

// Always reflect the current CMS data (new products / posts appear immediately).
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [categories, products, posts] = await Promise.all([getCategories(), getProducts(), getPosts()])

  const countByCategory = (slug: string) => products.filter((p) => p.categorySlug === slug).length
  const featured = products.filter((p) => p.isNew).slice(0, 4)
  const teaser = posts.slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          position: 'relative',
          height: 620,
          background: 'linear-gradient(135deg, #E5DBCB 0%, #B79A6A 55%, #7C6136 100%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="rl-container">
          <div style={{ maxWidth: 560 }}>
            <div
              style={{
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-espresso)',
                fontWeight: 600,
                marginBottom: 22,
              }}
            >
              Est. 2006 · Handcrafted
            </div>
            <h1 className="rl-h1" style={{ fontSize: 62, lineHeight: 1.05, margin: '0 0 24px' }}>
              A Heritage of Distinction
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'var(--color-espresso)',
                margin: '0 0 36px',
                maxWidth: 460,
              }}
            >
              Lighting, furniture, and objects made by hand — quiet pieces built to be lived with for
              decades, not seasons.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <Link href="/shop" className="rl-btn rl-btn--lg">
                Shop the Collection
              </Link>
              <Link href="/shop?category=lighting" className="rl-btn rl-btn--secondary rl-btn--lg">
                Explore Lighting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <Reveal>
      <div className="rl-container" style={{ padding: '96px 32px 40px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 40,
          }}
        >
          <h2 className="rl-h2" style={{ fontSize: 34 }}>
            Shop by Category
          </h2>
          <Link href="/shop" className="rl-link rl-arrow" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            View All
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {categories.map((c) => (
            <Link key={c.id} href={`/shop?category=${c.slug}`} className="rl-tile">
              <div
                className="rl-media"
                style={{ aspectRatio: '3 / 4', background: gradientFor(c.slug), marginBottom: 16 }}
              >
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 22 }}>
                  <span className="rl-tile__label" style={{ fontFamily: 'var(--font-serif-display)', fontSize: 22, color: 'var(--color-surface)' }}>
                    {c.title}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                {countByCategory(c.slug)} pieces
              </div>
            </Link>
          ))}
        </div>
      </div>
      </Reveal>

      {/* NEW THIS SEASON */}
      {featured.length > 0 && (
        <Reveal className="rl-container" style={{ padding: '64px 32px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="rl-eyebrow" style={{ marginBottom: 14 }}>
              New This Season
            </div>
            <h2 className="rl-h2" style={{ fontSize: 34 }}>
              Recently Added
            </h2>
          </div>
          <div className="rl-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px 16px' }}>
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Reveal>
      )}

      {/* EDITORIAL BAND */}
      <Reveal className="rl-section--alt" style={{ marginTop: 64 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 32px', textAlign: 'center' }}>
          <div className="rl-eyebrow" style={{ marginBottom: 20 }}>
            Design, Delivered
          </div>
          <h2 className="rl-h2" style={{ fontSize: 40, lineHeight: 1.2, margin: '0 0 22px' }}>
            Every piece leaves the studio finished by hand and delivered with white-glove care.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--color-text-secondary)', maxWidth: 620, margin: '0 auto' }}>
            We keep our catalog small on purpose. What we make, we make well — and we stand behind it for
            the life of the piece.
          </p>
        </div>
      </Reveal>

      {/* FROM THE JOURNAL */}
      {teaser.length > 0 && (
        <Reveal className="rl-container" style={{ padding: '96px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40 }}>
            <h2 className="rl-h2" style={{ fontSize: 34 }}>
              From the Journal
            </h2>
            <Link href="/journal" className="rl-link rl-arrow" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              All Posts
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {teaser.map((post) => (
              <Link key={post.id} href={`/journal/${post.slug}`} className="rl-tile">
                <div
                  className="rl-media"
                  style={{ aspectRatio: '3 / 2', background: gradientFor(post.slug), marginBottom: 18 }}
                >
                  {post.coverUrl && <img src={post.coverUrl} alt={post.title} />}
                </div>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: 10 }}>
                  {post.tags[0]?.title ?? formatPostDate(post.publishedAt)}
                </div>
                <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: 21, lineHeight: 1.3, marginBottom: 10 }}>
                  {post.title}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>{post.excerpt}</div>
              </Link>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  )
}
