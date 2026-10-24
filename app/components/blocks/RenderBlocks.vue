<script setup lang="ts">
import type { ContentBlock } from '#shared/content-blocks'
import { blockRenderers } from './registry'

// `indexed` gives top-level headings stable ids for the table of contents.
const props = defineProps<{ blocks: ContentBlock[], label?: string, indexed?: boolean }>()

const labelled = new Set(['image', 'gallery', 'columns', 'mediaText'])

function extraProps(block: ContentBlock, index: number) {
  if (block.type === 'heading') return { index: props.indexed ? index : undefined }
  return labelled.has(block.type) ? { label: props.label } : {}
}
</script>

<template>
  <component
    :is="blockRenderers[block.type]"
    v-for="(block, index) in blocks"
    :key="index"
    :block="block"
    v-bind="extraProps(block, index)"
  />
</template>
