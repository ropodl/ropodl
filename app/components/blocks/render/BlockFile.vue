<script setup lang="ts">
import { isSafeContentLink, type FileBlock } from '#shared/content-blocks'

defineProps<{ block: FileBlock }>()
</script>

<template>
  <a
    v-if="isSafeContentLink(block.url)"
    :href="block.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group my-6 flex items-center gap-4 rounded-xl border border-default bg-elevated/40 p-4 !no-underline transition-colors hover:border-primary/40"
  >
    <span class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <UIcon
        name="i-lucide-file-text"
        class="size-5"
        aria-hidden="true"
      />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block font-semibold text-highlighted">{{ block.label }}</span>
      <span
        v-if="block.description || block.meta"
        class="mt-0.5 block text-sm text-muted"
      >{{ [block.meta, block.description].filter(Boolean).join(' · ') }}</span>
    </span>
    <UIcon
      name="i-lucide-download"
      class="size-5 shrink-0 text-muted group-hover:text-primary"
      aria-hidden="true"
    />
  </a>
</template>
