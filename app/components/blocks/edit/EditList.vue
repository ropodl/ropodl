<script setup lang="ts">
import type { ListBlock } from '#shared/content-blocks'

const block = defineModel<ListBlock>('block', { required: true })
const lines = computed({
  get: () => block.value.items.join('\n'),
  set: value => (block.value.items = value.split('\n').slice(0, 50))
})
</script>

<template>
  <div class="space-y-3">
    <USelect
      v-model="block.style"
      :items="[{ label: 'Bulleted list', value: 'bulleted' }, { label: 'Numbered list', value: 'numbered' }]"
      aria-label="List style"
      class="w-44"
    />
    <BlocksInlineTextarea
      v-model="lines"
      :rows="4"
      placeholder="One item per line"
      aria-label="List items, one per line"
    />
  </div>
</template>
