import { and, eq, ne } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { projects, projectTypes } from '../../../db/schema'
import { parseContentInput, requireContentAdmin } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireContentAdmin(event)
  const currentSlug = getRouterParam(event, 'slug')
  if (!currentSlug) throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
  const body = await readBody<Record<string, unknown>>(event)
  const db = getDatabase(event)
  const [current] = await db.select({ id: projects.id, imageKey: projects.imageKey }).from(projects).where(eq(projects.slug, currentSlug)).limit(1)
  if (!current) throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
  const values = parseContentInput(body ?? {}, user.id, current.imageKey)
  const typeId = typeof body.typeId === 'string' && body.typeId ? body.typeId : null
  if (typeId && !(await db.select({ id: projectTypes.id }).from(projectTypes).where(eq(projectTypes.id, typeId)).limit(1)).length) throw createError({ statusCode: 400, statusMessage: 'Choose a valid work type.' })
  const [duplicate] = await db.select({ id: projects.id }).from(projects).where(and(eq(projects.slug, values.slug), ne(projects.id, current.id))).limit(1)
  if (duplicate) throw createError({ statusCode: 409, statusMessage: 'That project slug is already in use.' })
  const [updated] = await db.update(projects).set({ ...values, typeId, updatedAt: new Date() }).where(eq(projects.id, current.id)).returning({ id: projects.id, slug: projects.slug, status: projects.status })
  await recordAdminAction(event, 'updated', 'project', current.id)
  return updated
})
