# Handoff: Root Level — E-commerce Storefront + Payload CMS

## Overview

Root Level is a high-end, editorial furniture / lighting / home-decor storefront
(quiet-luxury, gallery-like — the product is the hero, not the interface). This
package is everything needed to build it as a **Next.js + Payload CMS 3.x**
application backed by MongoDB.

The storefront covers the full commerce flow — landing → collection (faceted
search) → product detail (variant selection) → cart → delivery → order
confirmation — plus a Journal (blog) with tag filtering, single posts, and
related posts. Orders and blog content are stored in Payload collections.

## About the Design Files

The files under `prototype/` are a **design reference created in HTML** — a
clickable prototype showing the intended look, layout, copy, and interaction
flow. **They are not production code to copy directly.** The prototype is a
single self-contained component (`Storefront.dc.html`) with an in-memory data
model and client-side view switching; it exists to communicate design intent.

Your task is to **recreate these designs in a real Next.js + Payload app**,
wiring the frontend to live Payload data (via the Local API / REST / GraphQL)
instead of the prototype's hard-coded arrays. The `payload/` folder already
contains the CMS half written for you (see below).

Two things in this bundle ARE meant to be used close to as-is:
- **`frontend/design-system.css`** — a production-ready, class-based CSS design
  system (tokens + component classes). Import it once at the app root and build
  against its `--var(--*)` tokens and `.rl-*` classes. Recreate the prototype's
  markup using these classes rather than re-deriving styles.
- **`payload/`** — the Payload config and collection definitions. Drop into a
  scaffolded Payload app (instructions in `payload/README.md`).

## Fidelity

**High-fidelity.** Final colors, typography, spacing, copy, and interactions are
all specified. Recreate the UI pixel-accurately using the CSS design system in
this bundle. Product photography is represented with warm gradient placeholders —
swap in real photography (served from Payload `media` uploads) before shipping.

## Tech Stack (target)

- **Payload CMS 3.x** (latest stable) — headless CMS + admin, App-Router native.
- **Next.js (App Router)** — Payload 3 installs into a Next app; build the
  storefront routes alongside the `(payload)` admin route group.
- **MongoDB** via `@payloadcms/db-mongodb`. Demo connection:
  `DATABASE_URL=mongodb://127.0.0.1/payload-demo`
- **Rich text**: `@payloadcms/richtext-lexical` (Products `description`, Posts
  `body`). Render with `@payloadcms/richtext-lexical/react` `RichText`.
- Package manager: `pnpm` recommended.

## Payload Backend (already written — `payload/`)

`payload/README.md` has the full run instructions. Summary of collections:

| Collection   | Group   | Key fields |
|--------------|---------|-----------|
| `users`      | Admin   | Auth (Payload default) + `name`. |
| `media`      | Catalog | Upload; image sizes `thumbnail` 400², `card` 768², `hero` 1920×1080. |
| `categories` | Catalog | `title`, `slug`, `description`. The top-level facet. |
| `products`   | Catalog | `name`, `slug`, `category` (rel), `shortDescription`, `description` (richText), `basePrice`, `dimensions`, `baseSku`, `images[]` (upload), **`variants[]`**, `isNew`. |
| `orders`     | Store   | `orderNumber`, `email`, `items[]`, `total`, `shipping` (group), `status`. |
| `tags`       | Journal | `title`, `slug`. |
| `posts`      | Journal | `title`, `slug`, `excerpt`, `coverImage` (upload), `body` (richText), `tags[]` (rel hasMany), `publishedAt`. |

### The variant model (important)

`products.variants` is an array; each entry is one **finish × size** combination:
- `finish` (text, e.g. "Antique Brass")
- `swatch` (hex string, e.g. `#9C7A45`) — drives the colour-dot selector on the PDP
- `size` (select: small | medium | large) — optional
- `sku` (text)
- `priceModifier` (number, added to `basePrice`)
- `stock` (number)

Live price on the PDP = `basePrice + selectedVariant.priceModifier`. Leave the
array empty for a single-option product.

### Orders (kept minimal — demo)

Write an order on checkout with only: generated `orderNumber` (e.g.
`RL-2026-0147`), `email`, `items[]` (product rel + name/variant/sku/qty/unitPrice
snapshot), `total`, a `shipping` snapshot, and `status: 'confirmed'`. No payment
integration. In the prototype the delivery page is a **mock** — details are
hard-coded and no form is filled.

## Screens / Views

All screens share a sticky header (utility bar + main nav) and an espresso
footer. Content is capped at **1440px** with **32px** side gutters.

### 1. Header + Utility Bar (global)
- **Utility bar**: espresso `#3A2E26` background, ivory text, 36px tall. Left:
  "Complimentary white-glove delivery on every order". Right: "Trade Program ·
  +1 (212) 555 0148". 11px, uppercase, letter-spacing 0.1em.
- **Header**: off-white bg, `1px solid #DCD7CD` bottom border, sticky, 78px tall.
  Left: wordmark "Root Level" in Fraunces 25px. Center nav (Inter 12px uppercase,
  tracking 0.1em, hover → brass): Lighting, Furniture, Decor, Shop All, Journal.
  Right: "Search", "Cart (n)".

### 2. Home / Landing
- **Hero**: 620px tall, warm gradient placeholder (`135deg, #E5DBCB → #B79A6A →
  #7C6136`). Left-aligned content, max 560px: eyebrow "Est. 2006 · Handcrafted"
  (13px uppercase, brass/espresso, 600), H1 "A Heritage of Distinction" (Fraunces
  62px, line-height 1.05), lead paragraph (18px, espresso), two buttons —
  primary "Shop the Collection" (ink), secondary "Explore Lighting" (outline).
- **Shop by Category**: section header row ("Shop by Category" Fraunces 34px +
  "View All" link). 4-col grid, 16px gap. Each tile: 3:4 gradient with category
  name in Fraunces 22px white bottom-left, "N pieces" caption below.
- **New This Season**: centered eyebrow + "Recently Added" H2. 4-col product grid
  (32px row / 16px col gap) of `isNew` products. Card = 1:1 gradient (with "New"
  pill top-left when new) / Fraunces 17px name / 12px grey dimensions / 14px price.
- **Editorial band**: ivory `#EFEBE3` full-width, 100px vertical padding, centered,
  max 1000px. Eyebrow "Design, Delivered" + Fraunces 40px statement + grey lead.
- **From the Journal**: header row + "All Posts" link. 3-col grid (32px gap) of
  post teasers: 3:2 gradient / brass tag label / Fraunces 21px title / grey excerpt.

### 3. Collection (faceted grid)
- Breadcrumb (Home / {Category}), Fraunces 44px title, result count caption.
- **Two-column layout**: `240px` sticky sidebar + `1fr` grid, 48px gap.
- **Sidebar facets** (sticky, top 110px):
  - Search input (underline style, "Search pieces" placeholder) — filters name + blurb.
  - **Category** list: All Furnishings + each category; active item is brass.
  - **Finish** checkboxes: square 17px box (fills ink when checked) + a 12px colour
    dot + finish name. Multi-select; a product matches if it has ANY selected finish.
  - **Max Price** range slider (150–2600, step 20, `accent-color: ink`) + "Up to $X".
  - "Clear all filters" link (brass).
- **Grid**: 3-col, 40px row / 20px col gap. Same product card as home, plus a
  "SKU {sku}" line. Empty state: centered "Nothing matches those filters" +
  clear-filters link.
- All facets combine (AND across facet types, OR within finishes).

### 4. Product Detail (PDP)
- Breadcrumb (Home / {Category} / {Name}).
- **Two columns**, 64px gap: gallery (`1.1fr`) + sticky info (`1fr`, top 110px).
- **Gallery**: 1:1 main gradient + 4 thumbnail gradients (4-col, 10px gap).
- **Info**: brass category label / Fraunces 40px name / 22px price (live:
  base + size modifier) / grey blurb.
  - **Finish** selector: "Finish — {name}" label + row of 34px circular swatches
    (each `background` = swatch hex); selected shows a `0 0 0 2px bg, 0 0 0 3px ink`
    ring.
  - **Size** selector (only when product has sizes): row of pill-ish rect buttons
    (2px radius); selected = ink fill / bg text.
  - **Qty stepper** (− n +) inside a hairline box + full-width "Add to Cart" (ink).
  - "Ships Free · White-Glove Delivery" brass micro-label.
  - Hairline divider, then description paragraphs, then a Dimensions / SKU spec list.

### 5. Cart
- Fraunces 44px "Your Cart". Empty state: message + "Browse the Collection" button.
- **Two columns**: line items (`1fr`) + summary (`340px`), 56px gap.
- **Line item**: 96px gradient thumb / name+variant+SKU + qty stepper + Remove link
  / line price right-aligned. Hairline divider between rows.
- **Summary** (ivory bg, 32px pad): Fraunces 22px "Order Summary", Subtotal,
  Delivery "Complimentary", divider, Total, "Proceed to Delivery" button (ink).

### 6. Delivery (mock)
- Breadcrumb (Cart / Delivery), Fraunces 44px title, "Demo checkout — details are
  pre-filled and no payment is taken." caption.
- **Two columns**: three hairline-bordered info cards (Shipping To / Delivery
  Method / Contact — all hard-coded) + the same ivory Order Summary with a
  "Place Order" button. Each card has a brass uppercase label.
- Hard-coded shipping: "Ava Mercer, 218 Greenwich Street, Apt 9C, New York, NY
  10007". Method: "White-Glove Delivery — Complimentary, 3–5 weeks".

### 7. Order Confirmation
- Centered, max 760px. Brass eyebrow "Order Confirmed", Fraunces 46px "Thank you.",
  "Your order {number} is confirmed." + "A confirmation has been sent to {email}."
- Hairline-bordered order recap: line rows (56px thumb / name+variant+qty / price)
  + Total. "Continue Shopping" button (outline → ink on hover).
- On "Place Order": generate `orderNumber` `RL-2026-####`, POST an order to Payload,
  clear the cart, route here.

### 8. Journal (blog list)
- Centered header: brass eyebrow "The Journal" + Fraunces 46px "Inspiration Lives Here".
- **Tag filter row** (centered pills): All, Craft, Materials, At Home, Design Notes,
  Behind the Studio. Selected = ink fill. Filters posts by tag.
- 3-col grid (44px row / 32px col gap) of post cards: 3:2 gradient / brass
  "{tags} · {date}" / Fraunces 22px title / grey excerpt.

### 9. Post (single)
- Breadcrumb (Journal / {Title}). Centered brass "{tags} · {date}" + Fraunces 44px
  title (max 760px). Full-width 21:9 cover gradient (max 1000px). Body paragraphs
  (17px, line-height 1.8, max 680px).
- **Related Reading**: hairline divider + Fraunces 28px heading + 3-col grid of
  related posts (those sharing ≥1 tag).

## Interactions & Behavior

- **Navigation**: in the real app, each view is a route
  (`/`, `/shop`, `/shop/[category]`, `/products/[slug]`, `/cart`, `/checkout`,
  `/order/[number]`, `/journal`, `/journal/[slug]`). The prototype fakes these with
  a `view` state variable — map them to App Router routes. Scroll to top on nav.
- **Add to cart**: merges lines by product+variant key (increments qty if the exact
  variant already in cart). Shows a bottom-center toast "Added to cart · {name}"
  for ~2.4s.
- **Cart qty**: −/+ steppers; decrementing below 1 removes the line.
- **Filtering** (collection): category (single, AND), finishes (multi, OR within),
  max-price (≤), and text search (name + description). All combine live.
- **Hover states**: ink buttons → espresso; outline buttons → fill ink + invert
  text; text links/nav → brass; product image scales to 1.04 on card hover.
- **Transitions**: 300ms ease `cubic-bezier(0.4,0,0.2,1)` on color/bg/border/opacity.
  View changes fade+rise (`rlfade`, ~400ms). No bounce/spring/scale-pop. Respect
  `prefers-reduced-motion`.

## State Management

Prototype state (recreate with your app's patterns — cart likely in context +
localStorage, filters in URL search params, product/post from route params):

- **Cart**: array of `{ slug, name, variant, sku, unit, qty, gradient }`; keyed by
  `slug|variant` for merge. Persist across navigation (context or localStorage).
- **Collection filters**: `category`, `finishes[]`, `priceMax`, `search`. Best as
  URL search params so filtered views are shareable.
- **PDP selection**: `selectedFinish`, `selectedSize`, `qty` → live price + SKU.
- **Blog**: `activeTag` filter.
- **Order**: generated on checkout, written to Payload, read back on confirmation.

### Data fetching
- Collection: query `products` with `where` for category/finish/price/search, and
  `depth` to populate `category` + `images`.
- PDP: `products` by `slug` (`limit: 1`), populate images + rich text.
- Journal: `posts` with `tags` populated; filter by tag via `where`.
- Checkout: `create` an `orders` doc.

## Design Tokens

All tokens live in `frontend/design-system.css` (`:root`). Key values:

**Colors**
- `--color-bg` `#F7F5F1` (warm off-white page)
- `--color-bg-alt` `#EFEBE3` (ivory — section alternation, summary panels)
- `--color-surface` `#FFFFFF` (product grounds)
- `--color-ink` `#191714` (near-black — text, primary buttons; never pure black)
- `--color-text-secondary` `#5C5750` (captions, meta)
- `--color-brass` `#9C7A45` / `--color-brass-dark` `#7C6136` (the ONLY accent)
- `--color-espresso` `#3A2E26` (footer, utility bar, dark bands)
- `--color-border` `#DCD7CD` (hairline — all borders/dividers)

**Typography**
- Display serif: **Fraunces** — H1 56px/1.1, H2 36px/1.15, H3 24px/1.25, hero up to 62px.
- Body/UI: **Inter** — body 16px/1.6, caption 12px, eyebrow 13px.
- Labels/eyebrows/buttons: uppercase, tracking 0.08–0.14em, weight 600.

**Spacing** (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 80, 120. Section padding
80–120px; product-grid gaps tight (8–16px). Content max 1440px, gutter 32px.

**Radius**: 0–2px everywhere (sharp). Pills 999px (tags, switch). Radios circular.
**Shadows**: none on content (separation via whitespace); soft warm shadow only on
overlays (`0 12px 40px rgba(25,23,20,0.16)`).
**Motion**: 150/300/500ms, ease `cubic-bezier(0.4,0,0.2,1)`.

### Using the CSS
`import '@/styles/design-system.css'` once. Then use classes: `.rl-container`,
`.rl-section`, `.rl-btn` (`--secondary`/`--brass`/`--sm`/`--lg`/`--block`),
`.rl-product` (`__media`/`__flag`/`__name`/`__dims`/`__sku`/`__price`),
`.rl-tag`, `.rl-swatch`, `.rl-badge`, `.rl-input`/`.rl-select`, `.rl-check`,
`.rl-header`/`.rl-nav`/`.rl-footer`, `.rl-drawer`/`.rl-dialog`/`.rl-toast`, plus
`.rl-h1/2/3`, `.rl-eyebrow`, `.rl-caption`. See the file's table of contents.

## Iconography

Thin-line, 1px-stroke, no-fill, monochrome (ink → brass on hover) for
search/cart/account. No icon set shipped with the source — the prototype uses
text labels ("Search", "Cart"). Use **Lucide** or **Feather** (matching 1px
stroke) if you want icons. Never emoji.

## Assets

- **No real photography** — all imagery is warm gradient placeholders. Replace with
  real product/editorial photos served from Payload `media` uploads. Product-only
  shots on pure white/warm-grey grounds; hero + category banners full-bleed and warm.
- **Fonts**: Fraunces + Inter from Google Fonts (already `@import`ed in the CSS and
  in `_ds/.../tokens/fonts.css`).
- **No logo** — wordmark "Root Level" set in Fraunces. Swap for a real mark if provided.

## Files in this bundle

- `payload/` — Payload 3.x config + collections (drop into a scaffolded app; see
  `payload/README.md`). **Reference-authored — not yet compiled/run; verify locally.**
- `frontend/design-system.css` — production CSS design system (tokens + `.rl-*`
  classes). Import at app root.
- `prototype/Storefront.dc.html` — the full clickable design reference (all 9
  screens + flows + data model). Open in a browser to explore intended behavior.
  `support.js` + `_ds/` are its runtime + the bound design-system tokens/bundle.

## Suggested build order

1. `pnpm create payload-app` (MongoDB, blank) → paste `payload/` files → `pnpm dev`,
   confirm admin at `/admin`, create categories/products/tags/posts.
2. Add `design-system.css` to the Next app; build the global header/footer shell.
3. Home → Collection (with faceted queries) → PDP (variants + live price).
4. Cart (context + persistence) → mock Delivery → Place Order (write `orders`) →
   Confirmation.
5. Journal list (tag filter) → Post (rich text + related).
6. Swap gradient placeholders for real photography.
