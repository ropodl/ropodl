import { desc, eq } from 'drizzle-orm'
import type { H3Event } from 'h3'
import { getDatabase } from '../db'
import { blogs, projects } from '../db/schema'

// A `sources` URL would be fetched as an internal sub-request without the Cloudflare bindings,
// so the published slugs are added here, on the sitemap request itself.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('sitemap:input', async (ctx) => {
    // Typed as the portable RequestEvent, but under Nitro 2 it is the h3 event carrying the bindings.
    const db = getDatabase(ctx.event as unknown as H3Event)
    const [posts, works] = await db.batch([
      db.select({ slug: blogs.slug, updatedAt: blogs.updatedAt }).from(blogs).where(eq(blogs.status, 'published')).orderBy(desc(blogs.createdAt)),
      db.select({ slug: projects.slug, updatedAt: projects.updatedAt }).from(projects).where(eq(projects.status, 'published')).orderBy(desc(projects.createdAt))
    ])
    ctx.urls.push(
      ...posts.map(post => ({ loc: `/blogs/${encodeURIComponent(post.slug)}`, lastmod: post.updatedAt })),
      ...works.map(work => ({ loc: `/projects/${encodeURIComponent(work.slug)}`, lastmod: work.updatedAt }))
    )
  })
})
