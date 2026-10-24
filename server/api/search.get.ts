import { and, desc, eq, like, or } from 'drizzle-orm'
import { getDatabase } from '../db'
import { blogs, projects, projectTypes } from '../db/schema'

export default defineEventHandler(async (event) => {
  const rawQuery = getQuery(event).q
  const query = typeof rawQuery === 'string' ? rawQuery.trim().replace(/\s+/g, ' ').slice(0, 80) : ''
  if (query.length < 2) return { items: [] }

  const pattern = `%${query.replace(/[%_\\]/g, '')}%`
  if (pattern === '%%') return { items: [] }

  const db = getDatabase(event)
  const [articles, matchingProjects] = await Promise.all([
    db.select({
      title: blogs.title,
      summary: blogs.summary,
      slug: blogs.slug,
      createdAt: blogs.createdAt
    })
      .from(blogs)
      .where(and(eq(blogs.status, 'published'), or(like(blogs.title, pattern), like(blogs.summary, pattern))))
      .orderBy(desc(blogs.createdAt))
      .limit(5),
    db.select({
      title: projects.title,
      summary: projects.summary,
      slug: projects.slug,
      createdAt: projects.createdAt,
      type: projectTypes.title
    })
      .from(projects)
      .leftJoin(projectTypes, eq(projects.typeId, projectTypes.id))
      .where(and(eq(projects.status, 'published'), or(like(projects.title, pattern), like(projects.summary, pattern))))
      .orderBy(desc(projects.createdAt))
      .limit(5)
  ])

  return {
    items: [
      ...articles.map(item => ({ ...item, kind: 'Article' as const, url: `/blogs/${item.slug}`, detail: 'Blog article' })),
      ...matchingProjects.map(item => ({ ...item, kind: 'Project' as const, url: `/projects/${item.slug}`, detail: item.type || 'Project' }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
})
