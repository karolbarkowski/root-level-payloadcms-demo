'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from './CartProvider'

const NAV = [
  { label: 'Lighting', href: '/shop?category=lighting' },
  { label: 'Furniture', href: '/shop?category=furniture' },
  { label: 'Decor', href: '/shop?category=decor' },
  { label: 'Shop All', href: '/shop' },
  { label: 'Journal', href: '/journal' },
]

export function Header() {
  const { count, hydrated } = useCart()
  const pathname = usePathname()

  return (
    <>
      {/* Utility bar */}
      <div className="rl-utilitybar">
        <div className="rl-container">
          <span style={{ opacity: 0.85 }}>Complimentary white-glove delivery on every order</span>
          <span style={{ opacity: 0.85 }}>Trade Program · +1 (212) 555 0148</span>
        </div>
      </div>

      {/* Header */}
      <header className="rl-header">
        <div className="rl-container">
          <Link href="/" className="rl-wordmark">
            Root Level
          </Link>
          <nav className="rl-nav">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={pathname === item.href.split('?')[0] ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="rl-row" style={{ gap: 22 }}>
            <Link
              href="/shop"
              style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}
              className="rl-nav-util"
            >
              Search
            </Link>
            <Link
              href="/cart"
              style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}
              className="rl-nav-util"
            >
              Cart ({hydrated ? count : 0})
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
