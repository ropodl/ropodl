<script setup lang="ts">
import {
  createBlock,
  isSafeContentImageUrl,
  isSafeContentLink,
  maxTopLevelBlocks,
  readContentBlockDocument,
  type ContentBlock
} from '#shared/content-blocks'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'uploading': [value: boolean]
}>()

const blocks = ref<ContentBlock[]>([])
const initialized = ref(false)
const preview = ref(false)
const uploading = provideBlockUploads()

watch(uploading, value => emit('uploading', value))

// Older posts were stored as sanitized HTML; convert them into blocks the first time they are edited.
function readLegacyContent(value: string): ContentBlock[] {
  const parsed = new DOMParser().parseFromString(value, 'text/html')
  const result: ContentBlock[] = []

  for (const node of Array.from(parsed.body.children)) {
    const text = node.textContent?.trim() || ''
    const tag = node.tagName.toLowerCase()
    const directLink = tag === 'a'
      ? node as HTMLAnchorElement
      : node.children.length === 1 && node.firstElementChild?.tagName.toLowerCase() === 'a'
        ? node.firstElementChild as HTMLAnchorElement
        : null
    if (tag === 'div' && node.classList.contains('content-gallery')) {
      const images = Array.from(node.querySelectorAll('img')).map(image => ({
        src: image.getAttribute('src') || '',
        alt: image.getAttribute('alt') || ''
      })).filter(image => isSafeContentImageUrl(image.src))
      if (images.length) result.push({ type: 'gallery', images })
    } else if (tag === 'div' && node.classList.contains('content-alert')) {
      const tone = ['info', 'success', 'warning'].find(value => node.classList.contains(`content-alert-${value}`)) || 'info'
      result.push({ type: 'callout', tone: tone as 'info' | 'success' | 'warning', title: '', text })
    } else if (/^h[1-3]$/.test(tag)) {
      result.push({ type: 'heading', level: tag === 'h3' ? 3 : 2, text })
    } else if (tag === 'blockquote') {
      result.push({ type: 'quote', text, attribution: '' })
    } else if (tag === 'ul' || tag === 'ol') {
      result.push({
        type: 'list',
        style: tag === 'ol' ? 'numbered' : 'bulleted',
        items: Array.from(node.querySelectorAll(':scope > li')).map(item => item.textContent?.trim() || '')
      })
    } else if (tag === 'pre') {
      result.push({ type: 'code', language: '', code: node.textContent || '' })
    } else if (tag === 'hr') {
      result.push({ type: 'divider' })
    } else if (tag === 'img') {
      const src = node.getAttribute('src') || ''
      if (isSafeContentImageUrl(src)) result.push({ type: 'image', image: { src, alt: node.getAttribute('alt') || '' } })
    } else if (directLink && isSafeContentLink(directLink.href)) {
      result.push({ type: 'link', label: directLink.textContent?.trim() || directLink.href, url: directLink.href })
    } else if (text) {
      result.push({ type: 'paragraph', text })
    }
  }

  return result.length ? result : [{ type: 'paragraph', text: parsed.body.textContent?.trim() || '' }]
}

function initialize(value: string) {
  const document = readContentBlockDocument(value)
  if (document) blocks.value = document.blocks
  else if (value.trim()) blocks.value = readLegacyContent(value)
  else blocks.value = [createBlock('paragraph')]
  initialized.value = true
}

onMounted(() => initialize(props.modelValue))

watch(() => props.modelValue, (value) => {
  if (!initialized.value) initialize(value)
})

watch(blocks, (value) => {
  if (initialized.value) emit('update:modelValue', JSON.stringify({ version: 1, blocks: value }))
}, { deep: true })
</script>

<template>
  <AdminSection
    id="content-blocks"
    title="Content"
    description="Build the page from blocks. Type / in an empty paragraph to pick one; use ⌘B, ⌘I, ⌘E and ⌘K to format text."
  >
    <template #actions>
      <UButton
        size="sm"
        variant="outline"
        color="neutral"
        :icon="preview ? 'i-lucide-pencil' : 'i-lucide-eye'"
        :aria-pressed="preview"
        @click="preview = !preview"
      >
        {{ preview ? 'Edit' : 'Preview' }}
      </UButton>
    </template>

    <RichContent
      v-if="preview"
      :content="JSON.stringify({ version: 1, blocks })"
      label="Content preview"
      class="rounded-lg bg-default p-5 sm:p-8"
    />
    <BlocksBlockList
      v-else-if="initialized"
      v-model="blocks"
      :max="maxTopLevelBlocks"
      class="-ml-2"
    />
  </AdminSection>
</template>
