'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

export interface CartLine {
  key: string // `${slug}|${variant}` — merge key
  slug: string
  productId: string
  name: string
  variant: string
  sku: string
  unit: number
  qty: number
  gradient: string
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  addLine: (line: Omit<CartLine, 'qty'>, qty: number) => void
  changeQty: (key: string, delta: number) => void
  removeLine: (key: string) => void
  clear: () => void
  toast: string | null
  showToast: (msg: string) => void
  hydrated: boolean
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'rl-cart-v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load persisted cart on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setLines(JSON.parse(raw))
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true)
  }, [])

  // Persist on change (after hydration, so we never clobber stored state).
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage may be unavailable */
    }
  }, [lines, hydrated])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }, [])

  const addLine = useCallback(
    (line: Omit<CartLine, 'qty'>, qty: number) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.key === line.key)
        if (existing) {
          return prev.map((l) => (l.key === line.key ? { ...l, qty: l.qty + qty } : l))
        }
        return [...prev, { ...line, qty }]
      })
      showToast('Added to cart · ' + line.name)
    },
    [showToast],
  )

  const changeQty = useCallback((key: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    )
  }, [])

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines])
  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.unit * l.qty, 0), [lines])

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    addLine,
    changeQty,
    removeLine,
    clear,
    toast,
    showToast,
    hydrated,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
