'use client'

import { useState } from 'react'
import { gradientFor, thumbGradients } from '@/lib/gradient'
import { photoFor } from '@/lib/images'

/**
 * PDP image gallery. Clicking a thumbnail swaps the large frame to that view
 * with a crossfade and marks the active thumbnail. Real photos are optional —
 * each view keeps its warm gradient placeholder when no image is present.
 */
export function ProductGallery({
  slug,
  name,
  imageUrls,
}: {
  slug: string
  name: string
  imageUrls: string[]
}) {
  // View 0 mirrors the main tone; views 1-3 use the subtly varied thumb tones.
  // Real uploads win per view; otherwise each view gets a stable editorial photo.
  const gradients = [gradientFor(slug), ...thumbGradients(slug).slice(1)]
  const views = gradients.map((gradient, i) => ({
    gradient,
    img: imageUrls[i] ?? photoFor(slug, 900, 900, i),
  }))

  const [active, setActive] = useState(0)

  return (
    <div>
      <div
        className="rl-media"
        style={{ aspectRatio: '1 / 1', background: views[active].gradient, marginBottom: 14 }}
      >
        {views[active].img && (
          <img
            key={active}
            src={views[active].img}
            alt={`${name}${active > 0 ? `, view ${active + 1}` : ''}`}
            className="rl-fade-in"
          />
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {views.map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show view ${i + 1}`}
            aria-pressed={i === active}
            data-active={i === active}
            className="rl-media rl-thumb"
            style={{ aspectRatio: '1 / 1', background: v.gradient }}
          >
            {v.img && <img src={v.img} alt="" />}
          </button>
        ))}
      </div>
    </div>
  )
}
