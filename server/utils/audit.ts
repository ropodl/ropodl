import { toWebRequest } from 'h3'
import { auditLogs } from '../db/schema'
import { getDatabase } from '../db'
import type { H3Event } from 'h3'

export async function recordAdminAction(event: H3Event, action: string, entity: string, entityId?: string) {
  const { getAuth } = await import('./auth')
  const session = await getAuth(event).api.getSession({ headers: toWebRequest(event).headers })
  const db = getDatabase(event)
  await db.insert(auditLogs).values({
    id: crypto.randomUUID(), action, entity, entityId: entityId || null,
    userId: session?.user.id || null, userEmail: session?.user.email || null,
    ipAddress: getHeader(event, 'cf-connecting-ip') || getRequestIP(event) || null,
    createdAt: new Date()
  })
}
