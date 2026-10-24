<script setup lang="ts">
import { contentBlockHeadingId, type HeadingBlock } from '#shared/content-blocks'

// Only top-level headings get an index (and so an id for the table of contents).
defineProps<{ block: HeadingBlock, index?: number }>()
</script>

<template>
  <component
    :is="block.level === 2 ? 'h2' : 'h3'"
    :id="index === undefined ? undefined : contentBlockHeadingId(block.text, index)"
    :tabindex="index === undefined ? undefined : -1"
    class="scroll-mt-28"
  >
    {{ block.text }}
  </component>
</template>
