import { desc, eq } from 'drizzle-orm'
import { getDatabase } from '../db'
import { blogs } from '../db/schema'

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char]!)
}

export default defineEventHandler(async (event) => {
  const origin = getRequestURL(event).origin
  const posts = await getDatabase(event).select({ title: blogs.title, slug: blogs.slug, summary: blogs.summary, createdAt: blogs.createdAt })
    .from(blogs).where(eq(blogs.status, 'published')).orderBy(desc(blogs.createdAt)).limit(500)
  const items = posts.map(post => `<item><title>${escapeXml(post.title)}</title><link>${origin}/blogs/${encodeURIComponent(post.slug)}</link><guid isPermaLink="true">${origin}/blogs/${encodeURIComponent(post.slug)}</guid><description>${escapeXml(post.summary)}</description><pubDate>${new Date(post.createdAt).toUTCString()}</pubDate></item>`).join('')
  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=900')
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>ropodl — Writing by Saroj Poudel</title><link>${origin}/blogs</link><description>Writing about frontend development, design, and building for the web.</description><language>en</language>${items}</channel></rss>`
})
