import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { blogs, blogCategoryLinks, blogTagLinks } from '../../../db/schema'
import { requireContentAdmin } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 404, statusMessage: 'Blog post not found.' })

  const db = getDatabase(event)
  const [post] = await db.select({ id: blogs.id }).from(blogs).where(eq(blogs.slug, slug)).limit(1)
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Blog post not found.' })

  await db.delete(blogTagLinks).where(eq(blogTagLinks.blogId, post.id))
  await db.delete(blogCategoryLinks).where(eq(blogCategoryLinks.blogId, post.id))
  await db.delete(blogs).where(eq(blogs.id, post.id))
  await recordAdminAction(event, 'deleted', 'blog', post.id)
  return { success: true }
})
