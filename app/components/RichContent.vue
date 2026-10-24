<script setup lang="ts">
import { readContentBlockDocument } from '#shared/content-blocks'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ContentSegment {
  type: 'html' | 'gallery'
  content?: string
  images?: GalleryImage[]
}

const props = defineProps<{ content: string, label?: string }>()
const blockDocument = computed(() => readContentBlockDocument(props.content))

function decodeAttribute(value: string) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', '\'')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

function readGalleryImages(markup: string): GalleryImage[] {
  return Array.from(markup.matchAll(/<img\b([^>]*)>/gi))
    .map(([, attributes]) => {
      const src = attributes?.match(/\bsrc="([^"]+)"/i)?.[1]
      if (!src) return null
      const alt = attributes?.match(/\balt="([^"]*)"/i)?.[1] || ''
      return { src: decodeAttribute(src), alt: decodeAttribute(alt) }
    })
    .filter((image): image is GalleryImage => Boolean(image))
}

const segments = computed<ContentSegment[]>(() => {
  const result: ContentSegment[] = []
  const galleryPattern = /<div class="content-gallery">([\s\S]*?)<\/div>/gi
  let previousEnd = 0

  for (const match of props.content.matchAll(galleryPattern)) {
    const index = match.index ?? 0
    if (index > previousEnd) result.push({ type: 'html', content: props.content.slice(previousEnd, index) })
    const images = readGalleryImages(match[1] || '')
    if (images.length) result.push({ type: 'gallery', images })
    previousEnd = index + match[0].length
  }

  if (previousEnd < props.content.length) {
    result.push({ type: 'html', content: props.content.slice(previousEnd) })
  }
  if (!result.length && props.content) result.push({ type: 'html', content: props.content })
  return result
})
</script>

<template>
  <!-- Rich-content typography is defined in the global stylesheet. -->
  <!-- eslint-disable-next-line better-tailwindcss/no-unknown-classes -->
  <div class="rich-content text-base leading-8 text-muted">
    <BlocksRenderBlocks
      v-if="blockDocument"
      :blocks="blockDocument.blocks"
      :label="label"
      indexed
    />
    <template
      v-for="(segment, index) in segments"
      v-else
      :key="index"
    >
      <!-- Content has already passed through the server-side rich-content sanitizer. -->
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="segment.type === 'html'"
        v-html="segment.content"
      />
      <!-- eslint-enable vue/no-v-html -->
      <ContentImageGallery
        v-else
        :images="segment.images || []"
        :label="label || 'Article photo gallery'"
      />
    </template>
  </div>
</template>
