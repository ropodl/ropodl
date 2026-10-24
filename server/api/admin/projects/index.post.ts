import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { projects, projectTypes } from '../../../db/schema'
import { parseContentInput, requireContentAdmin } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireContentAdmin(event)
  const body = await readBody<Record<string, unknown>>(event)
  const values = parseContentInput(body ?? {}, user.id)
  const db = getDatabase(event)
  const typeId = typeof body.typeId === 'string' && body.typeId ? body.typeId : null
  if (typeId && !(await db.select({ id: projectTypes.id }).from(projectTypes).where(eq(projectTypes.id, typeId)).limit(1)).length) throw createError({ statusCode: 400, statusMessage: 'Choose a valid work type.' })
  const [existing] = await db.select({ id: projects.id }).from(projects).where(eq(projects.slug, values.slug)).limit(1)
  if (existing) throw createError({ statusCode: 409, statusMessage: 'That project slug is already in use.' })

  const now = new Date()
  const [created] = await db.insert(projects).values({
    id: crypto.randomUUID(),
    ...values,
    typeId,
    createdAt: now,
    updatedAt: now
  }).returning({ id: projects.id, slug: projects.slug, status: projects.status })
  await recordAdminAction(event, 'created', 'project', created?.id)

  return created
})
