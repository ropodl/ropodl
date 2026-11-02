import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { projects, projectTypes } from '../../../db/schema'
import { imageUrl, requireContentAdmin, sanitizeRichContent } from '../../../utils/content'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
  const db = getDatabase(event)
  const [project] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1)
  if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
  const [type] = await db.select({ title: projectTypes.title, slug: projectTypes.slug })
    .from(projectTypes)
    .where(eq(projectTypes.id, project.typeId ?? ''))
    .limit(1)
  return { ...project, content: sanitizeRichContent(project.content), type: type || null, imageUrl: imageUrl(project.imageKey) }
})
