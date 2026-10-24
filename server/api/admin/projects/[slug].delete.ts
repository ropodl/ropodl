import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { projects, projectTypeLinks } from '../../../db/schema'
import { requireContentAdmin } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 404, statusMessage: 'Project not found.' })

  const db = getDatabase(event)
  const [project] = await db.select({ id: projects.id }).from(projects).where(eq(projects.slug, slug)).limit(1)
  if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found.' })

  await db.delete(projectTypeLinks).where(eq(projectTypeLinks.projectId, project.id))
  await db.delete(projects).where(eq(projects.id, project.id))
  await recordAdminAction(event, 'deleted', 'project', project.id)
  return { success: true }
})
