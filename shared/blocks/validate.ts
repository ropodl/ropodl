import { hasOnlySafeInlineLinks } from './inline'
import { isSafeContentImageUrl, isSafeContentLink } from './urls'
import type { ContentBlock, ContentImage } from './types'

// Thrown by block validation; the server turns it into a 400 with this message.
export class BlockValidationError extends Error {}

export interface BlockContext {
  // When set, images must come from this user's uploads.
  userId?: string
  // 0 for top-level blocks, 1 inside a layout block such as columns.
  depth: number
  // Validates nested blocks; provided by the registry so layout blocks don't import it.
  children: (value: unknown, field: string, max: number) => ContentBlock[]
}

export function fail(message: string): never {
  throw new BlockValidationError(message)
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function text(value: unknown, maxLength: number, field: string, required = false) {
  if (value === undefined || value === null) value = ''
  if (typeof value !== 'string' || value.length > maxLength) fail(`Invalid ${field}.`)
  const trimmed = value.trim()
  if (required && !trimmed) fail(`Add the ${field}.`)
  return trimmed
}

// Text that may contain inline formatting; its links must be HTTPS or mailto.
export function inlineText(value: unknown, maxLength: number, field: string, required = false) {
  const result = text(value, maxLength, field, required)
  if (!hasOnlySafeInlineLinks(result)) fail(`Links in the ${field} must use https:// or mailto:.`)
  return result
}

export function oneOf<T extends string | number>(value: unknown, options: readonly T[], field: string): T {
  if (!options.includes(value as T)) fail(`Choose a valid ${field}.`)
  return value as T
}

export function link(value: unknown, field: string, required = true) {
  const url = text(value, 2048, field, required)
  if (url && !isSafeContentLink(url)) fail(`Use a valid https:// or mailto: link for the ${field}.`)
  return url
}

export function list<T>(value: unknown, min: number, max: number, field: string, item: (value: unknown, index: number) => T) {
  if (!Array.isArray(value) || value.length < min || value.length > max) {
    fail(min > 0 ? `The ${field} needs between ${min} and ${max} items.` : `The ${field} can have up to ${max} items.`)
  }
  return value.map(item)
}

export function record(value: unknown, field: string) {
  if (!isRecord(value)) fail(`Invalid ${field}.`)
  return value
}

export function image(value: unknown, context: BlockContext, field = 'image'): ContentImage {
  const raw = record(value, field)
  const src = text(raw.src, 500, field, true)
  if (!isSafeContentImageUrl(src) || (context.userId && !src.startsWith(`/api/uploads/uploads/${context.userId}/`))) {
    fail('Choose an image from your media library.')
  }
  const result: ContentImage = { src, alt: text(raw.alt, 240, `${field} alt text`) }
  const caption = text(raw.caption, 500, `${field} caption`)
  if (caption) result.caption = caption
  return result
}

export function optionalImage(value: unknown, context: BlockContext, field = 'image') {
  return isRecord(value) && typeof value.src === 'string' && value.src ? image(value, context, field) : null
}
