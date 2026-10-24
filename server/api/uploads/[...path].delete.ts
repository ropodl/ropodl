import { eq } from 'drizzle-orm'
import { getDatabase } from '../../db'
import { blogs, projects } from '../../db/schema'
import { getCloudflareEnv } from '../../utils/cloudflare'
import { requireContentAdmin } from '../../utils/content'
import { recordAdminAction } from '../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireContentAdmin(event)
  const key = getRouterParam(event, 'path')
  const prefix = `uploads/${user.id}/`
  if (!key || !key.startsWith(prefix) || key.includes('..')) {
    throw createError({ statusCode: 404, statusMessage: 'Media file not found.' })
  }

  const db = getDatabase(event)
  const [blogReference] = await db.select({ id: blogs.id }).from(blogs).where(eq(blogs.imageKey, key)).limit(1)
  const [projectReference] = await db.select({ id: projects.id }).from(projects).where(eq(projects.imageKey, key)).limit(1)
  if (blogReference || projectReference) {
    throw createError({ statusCode: 409, statusMessage: 'This image is in use. Remove it from its content before deleting it.' })
  }

  const uploads = getCloudflareEnv(event).UPLOADS
  const object = await uploads.get(key)
  if (!object) throw createError({ statusCode: 404, statusMessage: 'Media file not found.' })
  await uploads.delete(key)
  await recordAdminAction(event, 'deleted', 'media file', key)
  return { success: true }
})
