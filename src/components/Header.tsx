'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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

  // Cart-count pop: replay the animation whenever the count increases.
  const prevCount = useRef(count)
  const [popping, setPopping] = useState(false)
  useEffect(() => {
    if (count > prevCount.current) {
      setPopping(true)
      const t = setTimeout(() => setPopping(false), 320)
      prevCount.current = count
      return () => clearTimeout(t)
    }
    prevCount.current = count
  }, [count])

  // Sticky-header shrink once the page is scrolled (rAF-throttled).
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        raf = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

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
      <header className="rl-header" data-scrolled={scrolled}>
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
              Cart (
              <span
                key={count}
                className={popping ? 'rl-pop' : undefined}
                style={{ color: popping ? 'var(--color-brass)' : undefined }}
              >
                {hydrated ? count : 0}
              </span>
              )
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
