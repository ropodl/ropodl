<script setup lang="ts">
import type { EmbedBlock } from '#shared/content-blocks'
import { getVideoEmbedUrl } from '#shared/blocks/urls'

const block = defineModel<EmbedBlock>('block', { required: true })
const embedUrl = computed(() => getVideoEmbedUrl(block.value.url))
</script>

<template>
  <div class="space-y-3">
    <UFormField
      label="Video link"
      :help="block.url && !embedUrl ? undefined : 'A YouTube or Vimeo link, e.g. https://youtu.be/…'"
      :error="block.url && !embedUrl ? 'That isn’t a YouTube or Vimeo video link.' : undefined"
    >
      <UInput
        v-model="block.url"
        type="url"
        maxlength="2048"
        placeholder="https://www.youtube.com/watch?v=…"
        class="w-full"
      />
    </UFormField>
    <div
      v-if="embedUrl"
      class="aspect-video max-w-md overflow-hidden rounded-md bg-black"
    >
      <iframe
        :src="embedUrl"
        title="Video preview"
        class="size-full"
        loading="lazy"
        allow="encrypted-media; picture-in-picture"
        allowfullscreen
      />
    </div>
    <UFormField label="Caption">
      <UInput
        v-model="block.caption"
        maxlength="500"
        placeholder="Optional"
        class="w-full"
      />
    </UFormField>
  </div>
</template>
