'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from './CartProvider'

const EXIT_MS = 260

export function Toast() {
  const { toast } = useCart()
  // Keep the last message rendered through the exit animation so it fades out
  // instead of vanishing. `visible` drives the enter/leave state.
  const [message, setMessage] = useState<string | null>(toast)
  const [visible, setVisible] = useState(false)
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (exitTimer.current) clearTimeout(exitTimer.current)
    if (toast) {
      setMessage(toast)
      // Next frame so the enter transition runs from the hidden state.
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    }
    // Toast cleared: play the exit, then drop the node from the DOM.
    setVisible(false)
    exitTimer.current = setTimeout(() => setMessage(null), EXIT_MS)
  }, [toast])

  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: `translate(-50%, ${visible ? '0' : '12px'})`,
        opacity: visible ? 1 : 0,
        transition: `opacity ${EXIT_MS}ms var(--ease-standard), transform ${EXIT_MS}ms var(--ease-standard)`,
        background: 'var(--color-ink)',
        color: 'var(--color-bg)',
        fontSize: 13,
        letterSpacing: '0.02em',
        padding: '14px 24px',
        borderRadius: 2,
        boxShadow: '0 12px 40px rgba(25,23,20,0.16)',
        zIndex: 200,
      }}
    >
      {message}
    </div>
  )
}
