import Link from 'next/link'
import { getPosts, getTags, formatPostDate } from '@/lib/queries'
import { gradientFor } from '@/lib/gradient'

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const activeTag = typeof sp.tag === 'string' ? sp.tag : 'all'

  const [posts, tags] = await Promise.all([getPosts(), getTags()])

  const filtered =
    activeTag === 'all' ? posts : posts.filter((p) => p.tags.some((t) => t.slug === activeTag))

  const pills = [{ slug: 'all', title: 'All' }, ...tags.map((t) => ({ slug: t.slug, title: t.title }))]

  return (
    <div className="rl-container" style={{ padding: '56px 32px 96px' }}>
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <div className="rl-eyebrow" style={{ marginBottom: 14 }}>
          The Journal
        </div>
        <h1 className="rl-h1" style={{ fontSize: 46 }}>
          Inspiration Lives Here
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}>
        {pills.map((p) => {
          const on = activeTag === p.slug
          return (
            <Link
              key={p.slug}
              href={p.slug === 'all' ? '/journal' : `/journal?tag=${p.slug}`}
              className={`rl-tag${on ? ' rl-tag--selected' : ''}`}
            >
              {p.title}
            </Link>
          )
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="rl-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '44px 32px' }}>
          {filtered.map((post) => (
            <Link key={post.id} href={`/journal/${post.slug}`} className="rl-tile">
              <div className="rl-media" style={{ aspectRatio: '3 / 2', background: gradientFor(post.slug), marginBottom: 18 }}>
                {post.coverUrl && <img src={post.coverUrl} alt={post.title} />}
              </div>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brass)', marginBottom: 10 }}>
                {[post.tags.map((t) => t.title).join(' · '), formatPostDate(post.publishedAt)].filter(Boolean).join(' · ')}
              </div>
              <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: 22, lineHeight: 1.3, marginBottom: 10 }}>
                {post.title}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>{post.excerpt}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No posts under this tag yet.</div>
      )}
    </div>
  )
}
