import React from 'react'
import { Fraunces, Inter } from 'next/font/google'
import '@/styles/design-system.css'
import './app.css'
import { CartProvider } from '@/components/CartProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Toast } from '@/components/Toast'

// Self-hosted at build time via next/font (no render-blocking Google <link>).
// Variable fonts, exposed as CSS variables the design system consumes.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
})
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Root Level - Handcrafted Lighting, Furniture & Decor',
  description:
    'Root Level is an editorial furniture, lighting, and home-decor studio. Quiet pieces built to be lived with for decades, not seasons.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  )
}
