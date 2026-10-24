<script setup lang="ts">
import type { ButtonBlock } from '#shared/content-blocks'

const block = defineModel<ButtonBlock>('block', { required: true })
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_9rem]">
    <UInput
      v-model="block.label"
      maxlength="160"
      placeholder="Label, e.g. Visit the live site"
      aria-label="Button label"
      class="w-full"
    />
    <UInput
      v-model="block.url"
      type="url"
      maxlength="2048"
      placeholder="https://… or mailto:…"
      aria-label="Button link"
      class="w-full"
    />
    <USelect
      v-model="block.style"
      :items="[{ label: 'Primary', value: 'primary' }, { label: 'Secondary', value: 'secondary' }]"
      aria-label="Button style"
    />
  </div>
</template>
