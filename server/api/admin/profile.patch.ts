import { eq } from 'drizzle-orm'
import { getDatabase } from '../../db'
import { user as users } from '../../db/schema'
import { requireContentAdmin } from '../../utils/content'
import { recordAdminAction } from '../../utils/audit'

export default defineEventHandler(async (event) => {
  const current = await requireContentAdmin(event)
  const body = await readBody<{ name?: unknown }>(event)
  const name = typeof body?.name === 'string' ? body.name.trim().slice(0, 100) : ''
  if (!name) throw createError({ statusCode: 400, statusMessage: 'Enter your display name.' })
  await getDatabase(event).update(users).set({ name, updatedAt: new Date() }).where(eq(users.id, current.id))
  await recordAdminAction(event, 'updated profile', 'account', current.id)
  return { name }
})
