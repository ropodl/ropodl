import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { blogs, blogCategoryLinks, blogCategories, blogTagLinks, blogTags } from '../../../db/schema'
import { parseBlogFormatInput, parseContentInput, requireContentAdmin } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireContentAdmin(event)
  const body = await readBody<Record<string, unknown>>(event)
  const values = { ...parseContentInput(body ?? {}, user.id), ...parseBlogFormatInput(body ?? {}) }
  const db = getDatabase(event)
  const categoryId = typeof body.categoryId === 'string' && body.categoryId ? body.categoryId : null
  const tagIds = Array.isArray(body.tagIds) ? [...new Set(body.tagIds.filter((id): id is string => typeof id === 'string'))] : []
  if (categoryId && !(await db.select({ id: blogCategories.id }).from(blogCategories).where(eq(blogCategories.id, categoryId)).limit(1)).length) throw createError({ statusCode: 400, statusMessage: 'Choose a valid blog category.' })
  if (tagIds.length && (await db.select({ id: blogTags.id }).from(blogTags)).filter(tag => tagIds.includes(tag.id)).length !== tagIds.length) throw createError({ statusCode: 400, statusMessage: 'Choose valid blog tags.' })
  const [existing] = await db.select({ id: blogs.id }).from(blogs).where(eq(blogs.slug, values.slug)).limit(1)
  if (existing) throw createError({ statusCode: 409, statusMessage: 'That blog slug is already in use.' })

  const now = new Date()
  const [created] = await db.insert(blogs).values({
    id: crypto.randomUUID(),
    ...values,
    categoryId,
    createdAt: now,
    updatedAt: now
  }).returning({ id: blogs.id, slug: blogs.slug, status: blogs.status })

  if (categoryId) await db.insert(blogCategoryLinks).values({ blogId: created!.id, categoryId })
  if (tagIds.length) await db.insert(blogTagLinks).values(tagIds.map(tagId => ({ blogId: created!.id, tagId })))
  await recordAdminAction(event, 'created', 'blog', created?.id)

  return created
})
