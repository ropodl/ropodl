import type { H3Event } from 'h3'
import { drizzle } from 'drizzle-orm/d1'
import { db as voidDatabase } from 'void/db'
import * as schema from './schema'
import { getCloudflareEnv } from '../utils/cloudflare'

// Void's Nitro module binds this database to the app schema through @schema.
const schemaAwareVoidDatabase = voidDatabase as unknown as ReturnType<typeof drizzle<typeof schema>>

export function getDatabase(event: H3Event) {
  const env = getCloudflareEnv(event)
  return env.VOID_USE_SDK_DB === '1'
    ? schemaAwareVoidDatabase
    : drizzle(env.DB, { schema })
}
