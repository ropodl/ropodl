<script setup lang="ts">
import { isSafeContentImageUrl, type ImageBlock } from '#shared/content-blocks'

defineProps<{ block: ImageBlock, label?: string }>()
</script>

<template>
  <figure
    v-if="isSafeContentImageUrl(block.image.src)"
    class="my-6"
    :class="block.width === 'wide' ? 'lg:-mx-16' : ''"
  >
    <ContentImageGallery
      :images="[block.image]"
      :label="label || 'Content image'"
    />
    <figcaption
      v-if="block.image.caption"
      class="mt-2 text-center text-sm text-muted"
    >
      {{ block.image.caption }}
    </figcaption>
  </figure>
</template>
