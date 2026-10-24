<script setup lang="ts">
import type { HeadingBlock } from '#shared/content-blocks'

const block = defineModel<HeadingBlock>('block', { required: true })
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
    <USelect
      v-model="block.level"
      :items="[{ label: 'Heading 2', value: 2 }, { label: 'Heading 3', value: 3 }]"
      aria-label="Heading level"
    />
    <UInput
      v-model="block.text"
      maxlength="160"
      placeholder="Section heading"
      aria-label="Heading text"
      class="w-full"
      :ui="{ base: 'font-semibold' }"
    />
  </div>
</template>
