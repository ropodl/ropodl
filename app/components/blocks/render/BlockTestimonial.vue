<script setup lang="ts">
import { isSafeContentImageUrl, type TestimonialBlock } from '#shared/content-blocks'

defineProps<{ block: TestimonialBlock }>()
</script>

<template>
  <figure class="my-8 rounded-2xl border border-default bg-elevated/40 p-6 sm:p-8">
    <UIcon
      name="i-lucide-quote"
      class="size-7 text-primary"
      aria-hidden="true"
    />
    <blockquote class="!my-4 !border-0 !p-0 text-lg leading-8 text-highlighted !not-italic">
      <p class="mb-0 whitespace-pre-line">
        {{ block.quote }}
      </p>
    </blockquote>
    <figcaption class="flex items-center gap-3">
      <NuxtImg
        v-if="block.image && isSafeContentImageUrl(block.image.src)"
        :src="block.image.src"
        :alt="block.image.alt"
        width="96"
        height="96"
        format="webp"
        class="!m-0 size-12 rounded-full !border-0 object-cover"
      />
      <div>
        <p class="mb-0 font-semibold text-highlighted">
          {{ block.name }}
        </p>
        <p
          v-if="block.role"
          class="mb-0 text-sm text-muted"
        >
          {{ block.role }}
        </p>
      </div>
    </figcaption>
  </figure>
</template>
