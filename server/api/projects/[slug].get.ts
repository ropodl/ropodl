import { and, asc, desc, eq, gt, lt, ne, or } from 'drizzle-orm'
import { getDatabase } from '../../db'
import { projects, projectTypes } from '../../db/schema'
import { imageUrl, sanitizeRichContent } from '../../utils/content'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 404, statusMessage: 'Project not found.' })

  const db = getDatabase(event)
  const [project] = await db.select().from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.status, 'published')))
    .limit(1)

  if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
  const published = eq(projects.status, 'published')
  const adjacentSelection = { title: projects.title, slug: projects.slug }
  // Projects are listed newest first, so "previous" is the next newer project and "next" the next older one.
  // All follow-up reads go to D1 in a single batch (one round trip) instead of one request per query.
  const [typeRows, previousRows, nextRows, relatedRows] = await db.batch([
    db.select({ title: projectTypes.title, slug: projectTypes.slug }).from(projectTypes).where(eq(projectTypes.id, project.typeId ?? '')).limit(1),
    db.select(adjacentSelection).from(projects)
      .where(and(published, or(gt(projects.createdAt, project.createdAt), and(eq(projects.createdAt, project.createdAt), gt(projects.id, project.id)))))
      .orderBy(asc(projects.createdAt), asc(projects.id))
      .limit(1),
    db.select(adjacentSelection).from(projects)
      .where(and(published, or(lt(projects.createdAt, project.createdAt), and(eq(projects.createdAt, project.createdAt), lt(projects.id, project.id)))))
      .orderBy(desc(projects.createdAt), desc(projects.id))
      .limit(1),
    db.select({ id: projects.id, title: projects.title, slug: projects.slug, summary: projects.summary, imageKey: projects.imageKey, createdAt: projects.createdAt })
      .from(projects).where(and(published, ne(projects.id, project.id), project.typeId ? eq(projects.typeId, project.typeId) : undefined)).orderBy(desc(projects.createdAt), desc(projects.id)).limit(3)
  ])
  const related = relatedRows.map(item => ({ ...item, imageUrl: imageUrl(item.imageKey) }))
  return { ...project, content: sanitizeRichContent(project.content), type: typeRows[0] || null, imageUrl: imageUrl(project.imageKey), previous: previousRows[0] || null, next: nextRows[0] || null, related }
})
