<script setup lang="ts">
import type { FaqBlock } from '#shared/content-blocks'

defineProps<{ block: FaqBlock }>()
</script>

<template>
  <section class="my-6 space-y-4">
    <h2 v-if="block.title">
      {{ block.title }}
    </h2>
    <div class="divide-y divide-default rounded-xl border border-default">
      <details
        v-for="(item, index) in block.items"
        :key="index"
        class="group p-4"
      >
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-highlighted focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
          {{ item.question }}
          <UIcon
            name="i-lucide-plus"
            class="size-4 shrink-0 text-primary transition-transform group-open:rotate-45"
            aria-hidden="true"
          />
        </summary>
        <p class="mb-0 mt-3 whitespace-pre-line text-sm leading-7 text-muted">
          <BlocksInlineText :text="item.answer" />
        </p>
      </details>
    </div>
  </section>
</template>
