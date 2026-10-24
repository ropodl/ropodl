<script setup lang="ts">
import type { FileBlock } from '#shared/content-blocks'

const block = defineModel<FileBlock>('block', { required: true })
</script>

<template>
  <div class="space-y-3">
    <div class="grid gap-3 sm:grid-cols-2">
      <UInput
        v-model="block.label"
        maxlength="160"
        placeholder="File name, e.g. Résumé"
        aria-label="File name"
        class="w-full"
      />
      <UInput
        v-model="block.url"
        type="url"
        maxlength="2048"
        placeholder="https://…"
        aria-label="File link"
        class="w-full"
      />
    </div>
    <div class="grid gap-3 sm:grid-cols-[10rem_minmax(0,1fr)]">
      <UInput
        v-model="block.meta"
        maxlength="60"
        placeholder="e.g. PDF · 240 KB"
        aria-label="File details"
        class="w-full"
      />
      <UInput
        v-model="block.description"
        maxlength="500"
        placeholder="Short description (optional)"
        aria-label="File description"
        class="w-full"
      />
    </div>
  </div>
</template>
