import type { BlogPostFormat } from '../../shared/types/blog-post-format'

const formatValues: BlogPostFormat[] = ['standard', 'aside', 'gallery', 'link', 'image', 'quote', 'status', 'video', 'audio', 'chat']

export function isBlogPostFormat(value: string): value is BlogPostFormat {
  return formatValues.some(format => format === value)
}

// Shared with the content blocks, which validate the same URLs on both client and server.
export { getVideoEmbedUrl, safeHttpsUrl } from '../../shared/blocks/urls'
