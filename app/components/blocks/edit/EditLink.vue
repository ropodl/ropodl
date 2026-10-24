<script setup lang="ts">
import type { LinkBlock } from '#shared/content-blocks'

const block = defineModel<LinkBlock>('block', { required: true })
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-2">
    <UInput
      v-model="block.label"
      maxlength="160"
      placeholder="Link text"
      aria-label="Link text"
      class="w-full"
    />
    <UInput
      v-model="block.url"
      type="url"
      maxlength="2048"
      placeholder="https://… or mailto:…"
      aria-label="Link URL"
      class="w-full"
    />
  </div>
</template>
