import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { projects } from '../../../db/schema'
import { imageUrl, requireContentAdmin, sanitizeRichContent } from '../../../utils/content'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
  const [project] = await getDatabase(event).select().from(projects).where(eq(projects.slug, slug)).limit(1)
  if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
  return { ...project, content: sanitizeRichContent(project.content), imageUrl: imageUrl(project.imageKey) }
})
