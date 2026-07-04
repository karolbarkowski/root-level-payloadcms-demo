import React from 'react'
import '@/styles/design-system.css'
import './app.css'
import { CartProvider } from '@/components/CartProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Toast } from '@/components/Toast'

export const metadata = {
  title: 'Root Level — Handcrafted Lighting, Furniture & Decor',
  description:
    'Root Level is an editorial furniture, lighting, and home-decor studio. Quiet pieces built to be lived with for decades, not seasons.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
