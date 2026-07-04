import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Shared Payload Local API client for server components / route handlers.
 * getPayload caches the instance internally, so this is cheap to call often.
 */
export async function getPayloadClient() {
  return getPayload({ config: await config })
}
