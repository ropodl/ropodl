import type { H3Event } from 'h3'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'
import { getCloudflareEnv } from '../utils/cloudflare'

export function getDatabase(event: H3Event) {
  return drizzle(getCloudflareEnv(event).DB, { schema })
}
