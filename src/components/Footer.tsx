import Link from 'next/link'

export function Footer() {
  return (
    <footer className="rl-footer" style={{ marginTop: 40 }}>
      <div className="rl-container">
        <div className="rl-footer__cols">
          <div>
            <div className="rl-wordmark" style={{ color: 'var(--color-bg-alt)', marginBottom: 18 }}>
              Root Level
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.7, maxWidth: 280, margin: 0 }}>
              Handcrafted lighting, furniture, and objects. Made to be lived with — and passed on.
            </p>
          </div>
          <div>
            <div className="rl-footer__head">Shop</div>
            <Link href="/shop?category=lighting">Lighting</Link>
            <Link href="/shop?category=furniture">Furniture</Link>
            <Link href="/shop?category=decor">Decor</Link>
            <Link href="/shop">All Furnishings</Link>
          </div>
          <div>
            <div className="rl-footer__head">Company</div>
            <Link href="/">Our Heritage</Link>
            <Link href="/">Trade Program</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/">Contact</Link>
          </div>
          <div>
            <div className="rl-footer__head">Service</div>
            <Link href="/">Shipping &amp; Delivery</Link>
            <Link href="/">Care &amp; Warranty</Link>
            <Link href="/">Returns</Link>
          </div>
        </div>
        <div
          style={{
            borderTop: '1px solid rgba(239,235,227,0.18)',
            marginTop: 56,
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          <span>© 2026 Root Level</span>
          <span>Est. 2006 · Handcrafted</span>
        </div>
      </div>
    </footer>
  )
}
