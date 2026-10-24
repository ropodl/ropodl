import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { contactMessages } from '../../../db/schema'
import { requireContentAdmin } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const id = getRouterParam(event, 'id') || ''
  const [deleted] = await getDatabase(event).delete(contactMessages).where(eq(contactMessages.id, id)).returning({ id: contactMessages.id })
  if (!deleted) throw createError({ statusCode: 404, statusMessage: 'Contact message not found.' })
  await recordAdminAction(event, 'deleted', 'contact message', id)
  return { ok: true }
})
