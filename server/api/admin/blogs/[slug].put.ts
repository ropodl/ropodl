import { and, eq, ne, inArray } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { blogs, blogCategoryLinks, blogCategories, blogTagLinks, blogTags } from '../../../db/schema'
import { parseBlogFormatInput, parseContentInput, requireContentAdmin } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireContentAdmin(event)
  const currentSlug = getRouterParam(event, 'slug')
  if (!currentSlug) throw createError({ statusCode: 404, statusMessage: 'Blog post not found.' })
  const body = await readBody<Record<string, unknown>>(event)
  const db = getDatabase(event)
  const [current] = await db.select({ id: blogs.id, imageKey: blogs.imageKey }).from(blogs).where(eq(blogs.slug, currentSlug)).limit(1)
  if (!current) throw createError({ statusCode: 404, statusMessage: 'Blog post not found.' })
  const values = { ...parseContentInput(body ?? {}, user.id, current.imageKey), ...parseBlogFormatInput(body ?? {}) }
  const categoryId = typeof body.categoryId === 'string' && body.categoryId ? body.categoryId : null
  const tagIds = Array.isArray(body.tagIds) ? [...new Set(body.tagIds.filter((id): id is string => typeof id === 'string'))] : []
  if (categoryId && !(await db.select({ id: blogCategories.id }).from(blogCategories).where(eq(blogCategories.id, categoryId)).limit(1)).length) throw createError({ statusCode: 400, statusMessage: 'Choose a valid blog category.' })
  if (tagIds.length && (await db.select({ id: blogTags.id }).from(blogTags).where(inArray(blogTags.id, tagIds))).length !== tagIds.length) throw createError({ statusCode: 400, statusMessage: 'Choose valid blog tags.' })
  const [duplicate] = await db.select({ id: blogs.id }).from(blogs).where(and(eq(blogs.slug, values.slug), ne(blogs.id, current.id))).limit(1)
  if (duplicate) throw createError({ statusCode: 409, statusMessage: 'That blog slug is already in use.' })
  const [updated] = await db.update(blogs).set({ ...values, categoryId, updatedAt: new Date() }).where(eq(blogs.id, current.id)).returning({ id: blogs.id, slug: blogs.slug, status: blogs.status })
  await db.delete(blogTagLinks).where(eq(blogTagLinks.blogId, current.id))
  if (tagIds.length) await db.insert(blogTagLinks).values(tagIds.map(tagId => ({ blogId: current.id, tagId })))
  await db.delete(blogCategoryLinks).where(eq(blogCategoryLinks.blogId, current.id))
  if (categoryId) await db.insert(blogCategoryLinks).values({ blogId: current.id, categoryId })
  await recordAdminAction(event, 'updated', 'blog', current.id)
  return updated
})
