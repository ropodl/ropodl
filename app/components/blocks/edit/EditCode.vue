<script setup lang="ts">
import type { CodeBlock } from '#shared/content-blocks'

const block = defineModel<CodeBlock>('block', { required: true })
</script>

<template>
  <div class="space-y-3">
    <div class="grid gap-3 sm:grid-cols-2">
      <UInput
        v-model="block.language"
        maxlength="40"
        placeholder="Language, e.g. ts"
        aria-label="Code language"
        class="w-full"
      />
      <UInput
        v-model="block.filename"
        maxlength="120"
        placeholder="File name (optional)"
        aria-label="Code file name"
        class="w-full"
      />
    </div>
    <UTextarea
      v-model="block.code"
      :rows="6"
      maxlength="10000"
      autoresize
      placeholder="Paste code"
      aria-label="Code"
      class="w-full"
      :ui="{ base: 'font-mono text-xs leading-5' }"
      spellcheck="false"
    />
  </div>
</template>
