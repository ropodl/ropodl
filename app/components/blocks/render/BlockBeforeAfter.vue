<script setup lang="ts">
import { isSafeContentImageUrl, type BeforeAfterBlock } from '#shared/content-blocks'

defineProps<{ block: BeforeAfterBlock }>()
const position = ref(50)
</script>

<template>
  <figure
    v-if="isSafeContentImageUrl(block.before.src) && isSafeContentImageUrl(block.after.src)"
    class="my-6"
  >
    <div class="relative overflow-hidden rounded-xl border border-default bg-elevated select-none">
      <NuxtImg
        :src="block.after.src"
        :alt="block.after.alt || 'After'"
        width="1200"
        format="webp"
        class="!m-0 block w-full !rounded-none !border-0"
        loading="lazy"
      />
      <NuxtImg
        :src="block.before.src"
        :alt="block.before.alt || 'Before'"
        width="1200"
        format="webp"
        class="!m-0 absolute inset-0 block size-full !rounded-none !border-0 object-cover"
        :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
        loading="lazy"
      />
      <span
        class="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgb(0_0_0/50%)]"
        :style="{ left: `${position}%` }"
        aria-hidden="true"
      />
      <span class="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">Before</span>
      <span class="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">After</span>
      <input
        v-model.number="position"
        type="range"
        min="0"
        max="100"
        aria-label="Drag to compare before and after"
        class="absolute inset-0 size-full cursor-ew-resize opacity-0"
      >
    </div>
    <figcaption
      v-if="block.caption"
      class="mt-2 text-center text-sm text-muted"
    >
      {{ block.caption }}
    </figcaption>
  </figure>
</template>
