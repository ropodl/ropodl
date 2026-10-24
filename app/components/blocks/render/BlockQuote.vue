<script setup lang="ts">
import type { QuoteBlock } from '#shared/content-blocks'

defineProps<{ block: QuoteBlock }>()
</script>

<template>
  <blockquote class="space-y-2">
    <p class="whitespace-pre-line">
      <BlocksInlineText :text="block.text" />
    </p>
    <cite
      v-if="block.attribution"
      class="block text-sm not-italic text-muted"
    >— {{ block.attribution }}</cite>
  </blockquote>
</template>
