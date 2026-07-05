'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Fades + rises its children into view as they enter the viewport.
 *
 * The hidden state (`.rl-reveal`) is applied only after mount, so users without
 * JavaScript — and users with `prefers-reduced-motion` — always see the final,
 * visible content. Content already in view (or scrolled past) is shown
 * immediately; only content scrolled down to animates.
 *
 * A scroll/resize position check is used rather than IntersectionObserver so a
 * fast or jump scroll (End key, anchor link) can never skip a section and leave
 * it stuck invisible — every settle re-checks position and reveals anything at
 * or above the trigger line.
 */
export function Reveal({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'hidden' | 'visible'>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion: never hide, never animate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('visible')
      return
    }

    const TRIGGER = 0.88 // reveal once the top passes 88% of the viewport height
    const inView = () => el.getBoundingClientRect().top < window.innerHeight * TRIGGER

    // Already in view on mount → show without animating.
    if (inView()) {
      setState('visible')
      return
    }

    setState('hidden')
    let raf = 0
    let done = false
    const check = () => {
      raf = 0
      if (done) return
      if (inView()) {
        done = true
        setState('visible')
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(check)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const revealClass =
    state === 'hidden' ? 'rl-reveal' : state === 'visible' ? 'rl-reveal is-visible' : ''
  const merged = [revealClass, className].filter(Boolean).join(' ') || undefined

  return (
    <div ref={ref} className={merged} style={style}>
      {children}
    </div>
  )
}
