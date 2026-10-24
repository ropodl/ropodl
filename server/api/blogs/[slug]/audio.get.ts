import { and, eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { blogs } from '../../../db/schema'
import { enforceRateLimit, getCloudflareEnv } from '../../../utils/cloudflare'
import { sanitizeRichContent } from '../../../utils/content'
import { contentBlocksPlainText, readContentBlockDocument } from '#shared/content-blocks'

const model = '@cf/deepgram/aura-2-en'
const maxTextLength = 12_000
const chunkLength = 1_800
const maxAudioBytes = 15 * 1024 * 1024

function decodeEntity(entity: string) {
  const namedEntities: Record<string, string> = {
    amp: '&',
    apos: '\'',
    copy: '©',
    gt: '>',
    hellip: '…',
    ldquo: '“',
    lsquo: '‘',
    lt: '<',
    mdash: '—',
    nbsp: ' ',
    ndash: '–',
    quot: '"',
    rdquo: '”',
    reg: '®'
  }
  const numeric = entity.match(/^&#(x[0-9a-f]+|\d+);$/i)
  if (numeric) {
    const codePoint = numeric[1]!.toLowerCase().startsWith('x')
      ? Number.parseInt(numeric[1]!.slice(1), 16)
      : Number.parseInt(numeric[1]!, 10)
    return Number.isInteger(codePoint) && codePoint > 0 && codePoint <= 0x10ffff
      ? String.fromCodePoint(codePoint)
      : ' '
  }
  return namedEntities[entity.slice(1, -1).toLowerCase()] || ' '
}

function getPlainText(content: string) {
  const document = readContentBlockDocument(content)
  if (document) return contentBlocksPlainText(document.blocks).replace(/\s+/g, ' ').trim()

  return sanitizeRichContent(content)
    .replace(/<br\s*\/?>|<\/(?:p|div|h[1-3]|blockquote|li|pre)>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:#x[0-9a-f]+|#\d+|[a-z]+);/gi, decodeEntity)
    .replace(/\s+/g, ' ')
    .trim()
}

function splitText(text: string) {
  const chunks: string[] = []
  let remaining = text

  while (remaining.length > chunkLength) {
    const boundary = Math.max(
      remaining.lastIndexOf('. ', chunkLength),
      remaining.lastIndexOf('? ', chunkLength),
      remaining.lastIndexOf('! ', chunkLength),
      remaining.lastIndexOf(' ', chunkLength)
    )
    const end = boundary >= chunkLength / 2 ? boundary + 1 : chunkLength
    chunks.push(remaining.slice(0, end).trim())
    remaining = remaining.slice(end).trim()
  }
  if (remaining) chunks.push(remaining)
  return chunks
}

async function hashText(text: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${model}:luna:${text}`))
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('')
}

function getByteRange(rangeHeader: string, size: number) {
  const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/)
  if (!match || (!match[1] && !match[2])) return null

  const start = match[1] ? Number(match[1]) : Math.max(size - Number(match[2]), 0)
  const end = match[1]
    ? Math.min(match[2] ? Number(match[2]) : size - 1, size - 1)
    : size - 1

  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= size || end < start) return null
  return { start, end, length: end - start + 1 }
}

function cachedAudioResponse(audio: R2ObjectBody, rangeHeader?: string) {
  const headers = new Headers()
  audio.writeHttpMetadata(headers)
  headers.set('Content-Type', 'audio/mpeg')
  headers.set('Accept-Ranges', 'bytes')
  headers.set('X-Content-Type-Options', 'nosniff')

  if (rangeHeader) {
    const range = getByteRange(rangeHeader, audio.size)
    if (!range) {
      return new Response(null, {
        status: 416,
        headers: { 'Content-Range': `bytes */${audio.size}`, 'Accept-Ranges': 'bytes' }
      })
    }
    headers.set('Content-Length', String(range.length))
    headers.set('Content-Range', `bytes ${range.start}-${range.end}/${audio.size}`)
    return new Response(audio.body, { status: 206, headers })
  }

  headers.set('Content-Length', String(audio.size))
  return new Response(audio.body, { headers })
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 404, statusMessage: 'Article not found.' })

  const db = getDatabase(event)
  const [post] = await db.select({ content: blogs.content }).from(blogs)
    .where(and(eq(blogs.slug, slug), eq(blogs.status, 'published')))
    .limit(1)
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Article not found.' })

  const text = getPlainText(post.content)
  if (!text) throw createError({ statusCode: 422, statusMessage: 'This article has no readable text.' })
  if (text.length > maxTextLength) {
    throw createError({ statusCode: 413, statusMessage: 'This article is too long to generate narration.' })
  }

  const key = `audio/article-narration/${await hashText(text)}.mp3`
  const bucket = getCloudflareEnv(event).UPLOADS
  const range = getRequestHeader(event, 'range')
  const cached = await bucket.get(key)
  if (cached) {
    if (!range) return cachedAudioResponse(cached)

    const rangedAudio = await bucket.get(key, { range: new Headers({ Range: range }) })
    if (!rangedAudio) {
      return new Response(null, {
        status: 416,
        headers: { 'Content-Range': `bytes */${cached.size}`, 'Accept-Ranges': 'bytes' }
      })
    }
    return cachedAudioResponse(rangedAudio, range)
  }

  const ip = getRequestHeader(event, 'cf-connecting-ip') || 'unknown'
  await enforceRateLimit(event, 'AUDIO_LIMITER', ip)

  const ai = getCloudflareEnv(event).AI
  const audioChunks: Uint8Array[] = []
  let audioSize = 0

  for (const chunk of splitText(text)) {
    const response = await ai.run(model, { text: chunk, speaker: 'luna', encoding: 'mp3' }, { returnRawResponse: true })
    if (!response.ok || !response.body) {
      console.error(`Workers AI narration failed for article "${slug}" with status ${response.status}.`)
      throw createError({ statusCode: 502, statusMessage: 'Narration could not be generated. Please try again later.' })
    }

    const audio = new Uint8Array(await response.arrayBuffer())
    audioSize += audio.byteLength
    if (audioSize > maxAudioBytes) throw createError({ statusCode: 502, statusMessage: 'Generated narration exceeded the audio size limit.' })
    audioChunks.push(audio)
  }

  const audio = new Uint8Array(audioSize)
  let offset = 0
  for (const chunk of audioChunks) {
    audio.set(chunk, offset)
    offset += chunk.byteLength
  }

  await bucket.put(key, audio, {
    httpMetadata: {
      contentType: 'audio/mpeg',
      cacheControl: 'public, max-age=31536000, immutable'
    }
  })

  if (range) {
    const rangedAudio = await bucket.get(key, { range: new Headers({ Range: range }) })
    if (!rangedAudio) {
      return new Response(null, {
        status: 416,
        headers: { 'Content-Range': `bytes */${audio.byteLength}`, 'Accept-Ranges': 'bytes' }
      })
    }
    return cachedAudioResponse(rangedAudio, range)
  }

  return new Response(audio, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Length': String(audio.byteLength),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff'
    }
  })
})
