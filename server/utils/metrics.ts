import { sql } from 'drizzle-orm'
import * as schema from '../db/schema'
import type { H3Event } from 'h3'
import { getDatabase } from '../db'

type SiteMetric = {
  event: 'contact_conversion' | 'article_feedback'
  slug?: string
  rating?: 'yes' | 'no'
}

export async function recordSiteMetric(event: H3Event, metric: SiteMetric) {
  const db = getDatabase(event)
  const now = new Date()
  const day = now.toISOString().slice(0, 10)
  const slug = metric.slug || ''
  const rating = metric.rating || ''

  await db.insert(schema.siteMetrics).values({
    day,
    event: metric.event,
    slug,
    rating,
    count: 1,
    updatedAt: now
  }).onConflictDoUpdate({
    target: [schema.siteMetrics.day, schema.siteMetrics.event, schema.siteMetrics.slug, schema.siteMetrics.rating],
    set: {
      count: sql`${schema.siteMetrics.count} + 1`,
      updatedAt: now
    }
  })
}
