'use client'

import { useCart } from './CartProvider'

export function Toast() {
  const { toast } = useCart()
  if (!toast) return null
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
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
      {toast}
    </div>
  )
}
