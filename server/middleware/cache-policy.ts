import { getMethod, getRequestURL, setHeader } from 'h3'

const publicHtmlPaths = [
  /^\/$/,
  /^\/(about|contact|blogs|projects)$/,
  /^\/(blogs|projects)\/[a-z0-9-]+$/i
]

const publicApiPaths = [
  /^\/api\/(blogs|projects)$/,
  /^\/api\/(blogs|projects)\/[a-z0-9-]+$/i,
  /^\/api\/pages\/(home|about|contact|blogs|projects)$/,
  /^\/api\/(blog-categories|blog-tags|project-types)$/
]

function allowedQuery(url: URL) {
  const path = url.pathname
  const isBlogList = path === '/blogs' || path === '/api/blogs'
  const isProjectList = path === '/projects' || path === '/api/projects'
  const isTaxonomy = /^\/api\/(blog-categories|blog-tags|project-types)$/.test(path)
  const isOgImage = path === '/og.svg'
  const allowedKeys = isBlogList
    ? ['page', 'category', 'tag']
    : isProjectList
      ? ['page', 'pageSize', 'type']
      : isTaxonomy
        ? ['page', 'pageSize']
        : isOgImage
          ? ['title', 'description', 'v']
          : []

  for (const [key, value] of url.searchParams) {
    if (!allowedKeys.includes(key)) return false
    if (key === 'page' && !/^\d{1,7}$/.test(value)) return false
    if (key === 'pageSize' && !/^(10|25|50|100)$/.test(value)) return false
    if (['category', 'tag', 'type'].includes(key) && !/^[\w-]{1,120}$/.test(value)) return false
    if (key === 'title' && value.length > 120) return false
    if (key === 'description' && value.length > 180) return false
    if (key === 'v' && !/^\d{1,5}$/.test(value)) return false
  }
  return true
}

export default defineEventHandler((event) => {
  if (!['GET', 'HEAD'].includes(getMethod(event))) {
    setHeader(event, 'Cache-Control', 'no-store')
    return
  }

  const url = getRequestURL(event)
  const path = url.pathname
  const privatePath = path === '/admin' || path.startsWith('/admin/') || path === '/login' || path === '/dashboard' || path.startsWith('/api/admin/') || path.startsWith('/api/auth/')

  if (privatePath) {
    setHeader(event, 'Cache-Control', 'private, no-store, max-age=0')
    setHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
    return
  }

  if (/^\/api\/uploads\/uploads\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\.webp$/.test(path)) {
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable')
    return
  }

  const isPublicDocument = publicHtmlPaths.some(pattern => pattern.test(path))
  const isPublicApi = publicApiPaths.some(pattern => pattern.test(path))
  if (isPublicApi && allowedQuery(url)) {
    // A short browser cache lets back/forward navigation and repeat client fetches skip the network entirely.
    // At the edge, content is refreshed in the background after 5 minutes, so readers rarely wait on D1.
    setHeader(event, 'Cache-Control', 'public, max-age=30, s-maxage=300, stale-while-revalidate=86400')
    setHeader(event, 'CDN-Cache-Control', 'public, max-age=300, stale-while-revalidate=86400')
    return
  }

  if (isPublicDocument && allowedQuery(url)) {
    // HTML stays revalidated in the browser so a deploy never serves pages pointing at removed chunks.
    setHeader(event, 'Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400')
    setHeader(event, 'CDN-Cache-Control', 'public, max-age=300, stale-while-revalidate=86400')
    return
  }

  if (path.startsWith('/api/')) setHeader(event, 'Cache-Control', 'private, no-store, max-age=0')
})
