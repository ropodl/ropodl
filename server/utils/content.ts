import { toWebRequest } from 'h3'
import type { H3Event } from 'h3'
import { getAuth } from './auth'
import type { ContentStatus } from '../db/schema'
import { getVideoEmbedUrl, isBlogPostFormat, safeHttpsUrl } from './blog-post-formats'
import { isBlockValidationError, sanitizeContentBlockDocument } from '#shared/content-blocks'

export async function requireContentAdmin(event: H3Event) {
  const session = await getAuth(event).api.getSession({ headers: toWebRequest(event).headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Sign in to manage content.' })
  }
  return session.user
}

export function slugify(value: unknown) {
  return typeof value === 'string'
    ? value.normalize('NFKD').toLowerCase().trim()
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 120)
    : ''
}

export function imageUrl(imageKey: string | null) {
  return imageKey ? `/api/uploads/${imageKey}` : null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function sanitizeBlockDocument(value: string, userId?: string) {
  let document: unknown
  try {
    document = JSON.parse(value)
  } catch {
    return null
  }
  if (!isRecord(document) || (!('version' in document) && !('blocks' in document))) return null
  try {
    return JSON.stringify(sanitizeContentBlockDocument(document, userId))
  } catch (error) {
    if (isBlockValidationError(error)) throw createError({ statusCode: 400, statusMessage: error.message })
    throw error
  }
}

export function sanitizeRichContent(value: string, userId?: string) {
  const blocks = sanitizeBlockDocument(value, userId)
  if (blocks !== null) return blocks

  const allowedTags = new Set(['p', 'div', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'h1', 'h2', 'h3', 'blockquote', 'ul', 'ol', 'li', 'pre', 'code', 'span', 'a', 'hr', 'img'])
  const withoutDangerousBlocks = value.replace(/<(script|style|iframe|object|svg|math)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
  return withoutDangerousBlocks.replace(/<\/?([a-z0-9-]+)\b([^>]*)>/gi, (tag, rawName: string, rawAttrs: string) => {
    const name = rawName.toLowerCase()
    if (!allowedTags.has(name)) return ''
    if (tag.startsWith('</')) return ['br', 'hr', 'img'].includes(name) ? '' : `</${name}>`
    if (name === 'br' || name === 'hr') return `<${name}>`
    if (name === 'img') {
      const src = rawAttrs.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim() || ''
      if (!/^\/api\/uploads\/uploads\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\.[A-Za-z0-9]{1,8}$/.test(src)) return ''
      const alt = (rawAttrs.match(/\balt\s*=\s*(["'])(.*?)\1/i)?.[2] || '').replace(/[&"<>]/g, char => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' })[char] || char)
      return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async">`
    }
    if (name === 'a') {
      const href = rawAttrs.match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim() || ''
      const safeHref = /^(https?:|mailto:)/i.test(href) ? href.replace(/["<>]/g, '') : ''
      return safeHref ? `<a href="${safeHref}" rel="noopener noreferrer">` : '<a>'
    }
    const rawStyle = rawAttrs.match(/\bstyle\s*=\s*(["'])(.*?)\1/i)?.[2] || ''
    const safeStyles = rawStyle.split(';').map((declaration) => {
      const [rawProperty, ...valueParts] = declaration.split(':')
      const property = rawProperty?.trim().toLowerCase()
      const styleValue = valueParts.join(':').trim()
      if (property === 'text-align' && /^(left|center|right|justify)$/.test(styleValue)) return `${property}:${styleValue}`
      if ((property === 'color' || property === 'background-color') && /^(#[\da-f]{3,8}|rgba?\(\s*[\d.]+%?(?:\s*,\s*[\d.]+%?){2,3}\s*\))$/i.test(styleValue)) return `${property}:${styleValue}`
      return ''
    }).filter(Boolean).join(';')
    const rawClass = rawAttrs.match(/\bclass\s*=\s*(["'])(.*?)\1/i)?.[2] || ''
    const classTokens = rawClass.split(/\s+/)
    const safeClass = name === 'div' && classTokens.includes('content-gallery')
      ? 'content-gallery'
      : name === 'div' && classTokens.includes('content-alert')
        ? `content-alert content-alert-${['info', 'success', 'warning'].find(type => classTokens.includes(`content-alert-${type}`)) || 'info'}`
        : ''
    const safeAttributes = [
      safeClass ? `class="${safeClass}"` : '',
      safeStyles && ['div', 'p', 'span'].includes(name) ? `style="${safeStyles}"` : ''
    ].filter(Boolean).join(' ')
    return `<${name}${safeAttributes ? ` ${safeAttributes}` : ''}>`
  })
}

export function parseContentInput(body: Record<string, unknown>, userId: string, existingImageKey?: string | null) {
  const title = typeof body.title === 'string' ? body.title.trim().slice(0, 160) : ''
  const slug = slugify(body.slug)
  const summary = typeof body.summary === 'string' ? body.summary.trim().slice(0, 600) : ''
  const seoTitle = typeof body.seoTitle === 'string' ? body.seoTitle.trim().slice(0, 180) : ''
  const seoDescription = typeof body.seoDescription === 'string' ? body.seoDescription.trim().slice(0, 500) : ''
  const rawContent = typeof body.content === 'string' ? body.content.trim() : ''
  if (rawContent.length > 100_000) throw createError({ statusCode: 413, statusMessage: 'Content must be 100 KB or smaller.' })
  const content = sanitizeRichContent(rawContent, userId)
  const imageKey = typeof body.imageKey === 'string' ? body.imageKey.trim() : ''
  const status = body.status === 'published' ? 'published' : body.status === 'archived' ? 'archived' : 'draft'

  if (!title) throw createError({ statusCode: 400, statusMessage: 'Add a title.' })
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Add a valid URL slug.' })
  if (!imageKey.startsWith(`uploads/${userId}/`) && imageKey !== existingImageKey) {
    throw createError({ statusCode: 400, statusMessage: 'Upload a featured image before saving.' })
  }

  return { title, slug, summary, seoTitle, seoDescription, content, imageKey, status: status as ContentStatus }
}

export function parseBlogFormatInput(body: Record<string, unknown>) {
  const postFormat = body.postFormat ?? 'standard'
  if (typeof postFormat !== 'string' || !isBlogPostFormat(postFormat)) {
    throw createError({ statusCode: 400, statusMessage: 'Choose a valid post format.' })
  }

  const formatUrl = typeof body.formatUrl === 'string' ? body.formatUrl.trim().slice(0, 2048) : ''
  const quoteText = typeof body.quoteText === 'string' ? body.quoteText.trim().slice(0, 6000) : ''
  const quoteCitation = typeof body.quoteCitation === 'string' ? body.quoteCitation.trim().slice(0, 240) : ''

  if (postFormat === 'link' && !safeHttpsUrl(formatUrl)) {
    throw createError({ statusCode: 400, statusMessage: 'Add a valid HTTPS destination URL for this link post.' })
  }
  if (postFormat === 'audio' && !safeHttpsUrl(formatUrl)) {
    throw createError({ statusCode: 400, statusMessage: 'Add a valid HTTPS audio URL for this audio post.' })
  }
  if (postFormat === 'video' && !getVideoEmbedUrl(formatUrl)) {
    throw createError({ statusCode: 400, statusMessage: 'Use a valid YouTube or Vimeo video URL.' })
  }
  if (postFormat === 'quote' && !quoteText) {
    throw createError({ statusCode: 400, statusMessage: 'Add the quotation text.' })
  }

  return {
    postFormat: postFormat as BlogPostFormat,
    formatUrl: ['link', 'audio', 'video'].includes(postFormat) ? formatUrl : '',
    quoteText: postFormat === 'quote' ? quoteText : '',
    quoteCitation: postFormat === 'quote' ? quoteCitation : ''
  }
}
