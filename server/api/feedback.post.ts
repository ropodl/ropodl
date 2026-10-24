import { and, eq } from 'drizzle-orm'
import { getDatabase } from '../db'
import { blogs } from '../db/schema'
import { enforceRateLimit } from '../utils/cloudflare'
import { recordSiteMetric } from '../utils/metrics'

export default defineEventHandler(async (event) => {
  const ip = getHeader(event, 'cf-connecting-ip') || getRequestIP(event) || 'unknown'
  await enforceRateLimit(event, 'FEEDBACK_LIMITER', `feedback:${ip}`)

  const body = await readBody<{ slug?: unknown, rating?: unknown }>(event)
  const slug = typeof body?.slug === 'string' ? body.slug.trim() : ''
  const rating = body?.rating

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || (rating !== 'yes' && rating !== 'no')) {
    throw createError({ statusCode: 400, statusMessage: 'Choose a feedback option for a valid article.' })
  }

  const [post] = await getDatabase(event).select({ id: blogs.id }).from(blogs)
    .where(and(eq(blogs.slug, slug), eq(blogs.status, 'published')))
    .limit(1)
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Article not found.' })

  await recordSiteMetric(event, { event: 'article_feedback', slug, rating })
  return { ok: true }
})
