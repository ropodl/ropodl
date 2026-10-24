<script setup lang="ts">
import type { ParagraphBlock } from '#shared/content-blocks'

const block = defineModel<ParagraphBlock>('block', { required: true })
const emit = defineEmits<{ slash: [] }>()

// Typing "/" into an empty paragraph opens the block picker to turn it into another block.
watch(() => block.value.text, (text) => {
  if (text === '/') emit('slash')
})
</script>

<template>
  <BlocksInlineTextarea
    v-model="block.text"
    :rows="3"
    placeholder="Write something, or type / to choose a block"
    aria-label="Paragraph"
  />
</template>
