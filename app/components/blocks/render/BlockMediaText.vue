<script setup lang="ts">
import { isSafeContentImageUrl, type MediaTextBlock } from '#shared/content-blocks'

defineProps<{ block: MediaTextBlock, label?: string }>()
</script>

<template>
  <section class="my-8 grid items-center gap-6 md:grid-cols-2">
    <div
      v-if="isSafeContentImageUrl(block.image.src)"
      :class="block.imagePosition === 'right' ? 'md:order-2' : ''"
    >
      <ContentImageGallery
        :images="[block.image]"
        :label="label || 'Content image'"
      />
    </div>
    <div class="min-w-0">
      <h3
        v-if="block.heading"
        class="!mt-0"
      >
        {{ block.heading }}
      </h3>
      <p class="mb-0 whitespace-pre-line">
        <BlocksInlineText :text="block.text" />
      </p>
    </div>
  </section>
</template>
