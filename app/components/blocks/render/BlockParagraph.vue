<script setup lang="ts">
import type { ParagraphBlock } from '#shared/content-blocks'

defineProps<{ block: ParagraphBlock }>()
</script>

<template>
  <p class="whitespace-pre-line">
    <BlocksInlineText :text="block.text" />
  </p>
</template>
