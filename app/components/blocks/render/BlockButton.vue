<script setup lang="ts">
import { isSafeContentLink, type ButtonBlock } from '#shared/content-blocks'

defineProps<{ block: ButtonBlock }>()
</script>

<template>
  <p v-if="isSafeContentLink(block.url)">
    <a
      :href="block.url"
      :target="block.url.startsWith('https:') ? '_blank' : undefined"
      rel="noopener noreferrer"
      data-content-button
      class="inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :class="block.style === 'primary' ? 'bg-primary text-inverted hover:bg-primary/90' : 'border border-default bg-elevated text-highlighted hover:border-primary/40'"
    >{{ block.label }} <span
      class="ml-2"
      aria-hidden="true"
    >↗</span></a>
  </p>
</template>
