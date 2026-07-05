import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts, formatPostDate } from '@/lib/queries'
import { gradientFor } from '@/lib/gradient'
import { photoFor } from '@/lib/images'
import { RichText } from '@/components/RichText'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Journal | Root Level' }
  const description = post.excerpt || `A note from the Root Level journal: ${post.title}.`
  const image = post.coverUrl ?? photoFor(post.slug, 1200, 630)
  return {
    title: `${post.title} | Root Level Journal`,
    description,
    openGraph: { title: post.title, description, images: [image], type: 'article' },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const all = await getPosts()
  const postTagSlugs = post.tags.map((t) => t.slug)
  const related = all
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => postTagSlugs.includes(t.slug)))
    .slice(0, 3)

  const meta = [post.tags.map((t) => t.title).join(' · '), formatPostDate(post.publishedAt)].filter(Boolean).join(' · ')

  return (
    <div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 32px 20px' }}>
        <div className="rl-breadcrumb" style={{ marginBottom: 32 }}>
          <Link href="/journal">Journal</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-ink)' }}>{post.title}</span>
        </div>
        <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: 16, textAlign: 'center' }}>
          {meta}
        </div>
        <h1 className="rl-h1" style={{ fontSize: 44, lineHeight: 1.15, margin: '0 0 32px', textAlign: 'center' }}>
          {post.title}
        </h1>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
        <div className="rl-media" style={{ aspectRatio: '21 / 9', background: gradientFor(post.slug), marginBottom: 48 }}>
          <img src={post.coverUrl ?? photoFor(post.slug, 1440, 620)} alt={post.title} />
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 32px' }}>
        {post.body ? (
          <RichText data={post.body} className="rl-richtext" />
        ) : (
          post.excerpt && <p style={{ fontSize: 17, lineHeight: 1.8 }}>{post.excerpt}</p>
        )}
      </div>

      {related.length > 0 && (
        <div className="rl-container" style={{ padding: '80px 32px 40px' }}>
          <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 40 }} />
          <h2 className="rl-h2" style={{ fontSize: 28, marginBottom: 32 }}>
            Related Reading
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {related.map((r) => (
              <Link key={r.id} href={`/journal/${r.slug}`}>
                <div className="rl-media" style={{ aspectRatio: '3 / 2', background: gradientFor(r.slug), marginBottom: 16 }}>
                  <img src={r.coverUrl ?? photoFor(r.slug, 800, 600)} alt={r.title} />
                </div>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: 8 }}>
                  {r.tags[0]?.title ?? ''}
                </div>
                <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: 19, lineHeight: 1.3 }}>{r.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
