# Root Level — Payload CMS backend

Payload **3.x** (latest stable) on **MongoDB**. These files are the CMS half of
the Root Level storefront: collections + config you drop into a fresh Payload
app and run against `mongodb://127.0.0.1/payload-demo`.

> ⚠️ These files are authored as a reference/starting point. They were **not**
> compiled or run in this environment — spin them up locally to verify.

## Getting it running

The fastest path is to scaffold a clean Payload app, then copy these files in:

```bash
# 1. Scaffold (choose the "blank" template, MongoDB)
pnpm create payload-app@latest root-level -- --db mongodb --template blank

cd root-level

# 2. Copy the CMS files from this folder into src/
#    - payload.config.ts        → src/payload.config.ts
#    - collections/*.ts         → src/collections/*.ts
cp -r /path/to/payload/collections src/collections
cp /path/to/payload/payload.config.ts src/payload.config.ts

# 3. Environment
cp .env.example .env      # DATABASE_URL is already the demo connection

# 4. Install & run
pnpm install
pnpm dev                  # → http://localhost:3000/admin
```

Create the first admin user in the browser on first load.

## Collections

| Collection   | Group   | Purpose |
|--------------|---------|---------|
| `users`      | Admin   | Auth-enabled admin users (Payload default). |
| `media`      | Catalog | Uploads with thumbnail / card / hero image sizes. |
| `categories` | Catalog | Top-level facet (Lighting, Furniture, Decor…). |
| `products`   | Catalog | Core catalog unit — base price, dimensions, images, and finish × size **variants** with colour swatches, per-variant SKU / price / stock. |
| `orders`     | Store   | Minimal order record — line items, total, stubbed shipping snapshot, status. |
| `tags`       | Journal | Simple labels for blog posts. |
| `posts`      | Journal | Blog / Journal entries; each can carry multiple `tags`. |

## Notes on the variant model

`products.variants` is an array where each entry is one **finish × size**
combination carrying its own `sku`, `priceModifier` (added to `basePrice`),
`swatch` (hex colour for the detail-page dot), and `stock`. Leave the array
empty for a single-option product. The storefront reads this to render the
swatch / size selector and to compute the live price.

## Dependencies these files assume

```
payload
@payloadcms/db-mongodb
@payloadcms/richtext-lexical
@payloadcms/next
sharp
```

All are installed by `create payload-app` when you pick the MongoDB blank
template; `@payloadcms/richtext-lexical` powers the `richText` fields on
Products and Posts.
