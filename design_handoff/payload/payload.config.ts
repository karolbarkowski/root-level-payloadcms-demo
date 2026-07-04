import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Orders } from './collections/Orders'
import { Tags } from './collections/Tags'
import { Posts } from './collections/Posts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Root Level — Payload CMS configuration
 * Payload 3.x  |  MongoDB (Mongoose adapter)
 *
 * Run locally:
 *   1.  cp .env.example .env       (DATABASE_URL is already set for the demo)
 *   2.  pnpm install
 *   3.  pnpm dev                   → admin at http://localhost:3000/admin
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Root Level',
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Products,
    Orders,
    Tags,
    Posts,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_IN_PRODUCTION',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || 'mongodb://127.0.0.1/payload-demo',
  }),
  sharp,
})
