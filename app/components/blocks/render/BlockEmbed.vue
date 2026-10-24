<script setup lang="ts">
import type { EmbedBlock } from '#shared/content-blocks'
import { getVideoEmbedUrl } from '#shared/blocks/urls'

const props = defineProps<{ block: EmbedBlock }>()
const src = computed(() => getVideoEmbedUrl(props.block.url))
</script>

<template>
  <figure
    v-if="src"
    class="my-6"
  >
    <div class="aspect-video overflow-hidden rounded-xl border border-default bg-black">
      <iframe
        :src="src"
        :title="block.caption || 'Embedded video'"
        class="size-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
    </div>
    <figcaption
      v-if="block.caption"
      class="mt-2 text-center text-sm text-muted"
    >
      {{ block.caption }}
    </figcaption>
  </figure>
</template>
