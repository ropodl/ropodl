<script setup lang="ts">
import { isSafeContentLink, type LinkBlock } from '#shared/content-blocks'

defineProps<{ block: LinkBlock }>()
</script>

<template>
  <p v-if="isSafeContentLink(block.url)">
    <a
      :href="block.url"
      :target="block.url.startsWith('https:') ? '_blank' : undefined"
      rel="noopener noreferrer"
    >{{ block.label }} <span aria-hidden="true">↗</span></a>
  </p>
</template>
