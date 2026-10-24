import { gte } from 'drizzle-orm'
import { getDatabase } from '../../db'
import { siteMetrics } from '../../db/schema'
import { requireContentAdmin } from '../../utils/content'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)

  const since = new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const rows = await getDatabase(event).select({
    event: siteMetrics.event,
    slug: siteMetrics.slug,
    rating: siteMetrics.rating,
    count: siteMetrics.count
  }).from(siteMetrics).where(gte(siteMetrics.day, since))

  const feedbackByArticle = new Map<string, { yes: number, no: number }>()
  let contactConversions = 0
  let helpful = 0
  let notHelpful = 0

  for (const row of rows) {
    if (row.event === 'contact_conversion') {
      contactConversions += row.count
      continue
    }
    if (row.event !== 'article_feedback') continue

    const current = feedbackByArticle.get(row.slug) || { yes: 0, no: 0 }
    if (row.rating === 'yes') {
      current.yes += row.count
      helpful += row.count
    } else if (row.rating === 'no') {
      current.no += row.count
      notHelpful += row.count
    }
    feedbackByArticle.set(row.slug, current)
  }

  return {
    since,
    contactConversions,
    articleFeedback: {
      yes: helpful,
      no: notHelpful,
      byArticle: [...feedbackByArticle.entries()]
        .map(([slug, counts]) => ({ slug, ...counts }))
        .sort((a, b) => b.yes + b.no - (a.yes + a.no))
        .slice(0, 10)
    }
  }
})
