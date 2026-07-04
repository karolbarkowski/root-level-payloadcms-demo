# Root Level — Storefront + Payload CMS

An editorial, quiet-luxury furniture / lighting / decor storefront built on
**Payload CMS 3.x** and **Next.js (App Router)**, backed by **MongoDB**. Built
from the `design_handoff/` design package (design system + collections + a
clickable HTML prototype).

## Stack

- **Payload CMS 3.85** (headless CMS + admin) — App-Router native
- **Next.js 16** (App Router, Turbopack)
- **MongoDB** via `@payloadcms/db-mongodb`
- **Lexical** rich text (`@payloadcms/richtext-lexical`) for product stories & posts
- **Fraunces + Inter** typography, class-based design system (`src/styles/design-system.css`)

## Prerequisites

- Node `>=20.9`
- pnpm `9`/`10`
- A local MongoDB running at `mongodb://127.0.0.1/payload-demo`

## Getting started

```bash
pnpm install
cp .env.example .env          # DATABASE_URL is already the demo connection
pnpm seed                     # loads categories, products, tags, posts + an admin user
pnpm dev                      # → http://localhost:3000
```

- Storefront: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin>
- Seeded admin login: **admin@rootlevel.demo** / **rootlevel**

`pnpm seed` is idempotent — it clears the catalog/journal/order collections and
re-creates them each run (the admin user is only created if none exists).

## Storefront routes

| Route | Screen |
|-------|--------|
| `/` | Home / landing (hero, categories, new arrivals, editorial band, journal teaser) |
| `/shop` | Collection grid with faceted filters (category, finish, max price, search) — filters live in URL params |
| `/products/[slug]` | Product detail — finish + size variant selectors, live price/SKU, add to cart |
| `/cart` | Cart (client, persisted to `localStorage`) |
| `/checkout` | Mock delivery details (hard-coded) + place order |
| `/order/[number]` | Order confirmation (reads the written order back from Payload) |
| `/journal` | Blog list with tag filtering |
| `/journal/[slug]` | Single post (rich text) + related reading |

## How it's wired

- **Collections** (`src/collections/`): `users`, `media`, `categories`,
  `products`, `orders`, `tags`, `posts` — from the design handoff.
- **Variant model**: `products.variants` is an array of finish × size
  combinations, each with a swatch hex, SKU, `priceModifier`, and stock. The PDP
  derives the finish and size selectors from these; live price =
  `basePrice + selected size's priceModifier` (see `src/lib/products.ts`).
- **Data access**: server components read via the Payload Local API
  (`src/lib/queries.ts`).
- **Cart**: React context + `localStorage` (`src/components/CartProvider.tsx`),
  merged by `slug|variant` key, with an "Added to cart" toast.
- **Orders**: written server-side via a server action
  (`src/app/actions/placeOrder.ts`) using the Local API, so the `orders`
  collection stays closed to public writes. Only the minimal demo fields are
  stored (order number, email, item snapshots, total, shipping stub, status).
- **Imagery**: no real photography is included — images render as warm gradient
  placeholders derived deterministically from each slug
  (`src/lib/gradient.ts`). Upload real photos to the product/post `media` fields
  in the admin to replace them.

## Notes

- The Mongoose `isNew` reserved-key warning at startup is benign — the
  `products.isNew` flag is read/written correctly (verified end-to-end).
- Regenerate types after changing collections: `pnpm generate:types`.
