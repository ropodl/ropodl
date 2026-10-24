import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { contactMessages } from '../../../db/schema'
import { requireContentAdmin } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody<{ status?: string }>(event)
  const status = body?.status
  if (!['new', 'read', 'replied', 'archived'].includes(status || '')) throw createError({ statusCode: 400, statusMessage: 'Choose a valid message status.' })
  const [updated] = await getDatabase(event).update(contactMessages).set({ status: status as 'new' | 'read' | 'replied' | 'archived', updatedAt: new Date() }).where(eq(contactMessages.id, id)).returning()
  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Contact message not found.' })
  await recordAdminAction(event, `marked ${status}`, 'contact message', id)
  return updated
})
