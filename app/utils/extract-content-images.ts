import { readContentBlockDocument } from '#shared/content-blocks'

export function extractContentImages(html: string, excludeGalleries = false) {
  if (readContentBlockDocument(html)) return []

  const content = excludeGalleries
    ? html.replace(/<div class="content-gallery">[\s\S]*?<\/div>/gi, '')
    : html
  const images = Array.from(content.matchAll(/<img\b([^>]*)>/gi)).map(([, attributes]) => {
    const src = attributes?.match(/\bsrc\s*=\s*"([^"]+)"/i)?.[1]
    const alt = attributes?.match(/\balt\s*=\s*"([^"]*)"/i)?.[1] || ''
    return src ? { src: src.replaceAll('&amp;', '&'), alt: alt.replaceAll('&amp;', '&') } : null
  }).filter((image): image is { src: string, alt: string } => Boolean(image))
  return [...new Map(images.map(image => [image.src, image])).values()]
}
