<script setup lang="ts">
import { isSafeContentImageUrl, type GalleryBlock } from '#shared/content-blocks'

const props = defineProps<{ block: GalleryBlock, label?: string }>()
const images = computed(() => props.block.images.filter(image => isSafeContentImageUrl(image.src)))
</script>

<template>
  <section
    class="my-6"
    :aria-label="label || 'Content gallery'"
  >
    <ContentImageGallery
      :images="images"
      :label="label || 'Content gallery'"
    />
  </section>
</template>
