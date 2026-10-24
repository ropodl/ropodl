<script setup lang="ts">
import type { AudioBlock } from '#shared/content-blocks'

defineProps<{ block: AudioBlock }>()
</script>

<template>
  <figure class="my-6 rounded-xl border border-default bg-elevated/50 p-4">
    <figcaption
      v-if="block.title"
      class="mb-3 flex items-center gap-2 text-sm font-medium text-highlighted"
    >
      <UIcon
        name="i-lucide-audio-lines"
        class="size-4 text-primary"
        aria-hidden="true"
      />
      {{ block.title }}
    </figcaption>
    <audio
      :src="block.url"
      controls
      preload="none"
      class="w-full"
    />
  </figure>
</template>
