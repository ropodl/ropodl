<script setup lang="ts">
import type { CalloutBlock } from '#shared/content-blocks'

const block = defineModel<CalloutBlock>('block', { required: true })
const tones = [
  { label: 'Note', value: 'info', icon: 'i-lucide-info' },
  { label: 'Success', value: 'success', icon: 'i-lucide-circle-check' },
  { label: 'Warning', value: 'warning', icon: 'i-lucide-triangle-alert' },
  { label: 'Danger', value: 'danger', icon: 'i-lucide-octagon-alert' }
]
</script>

<template>
  <div class="space-y-3">
    <div class="grid gap-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
      <USelect
        v-model="block.tone"
        :items="tones"
        aria-label="Callout style"
      />
      <UInput
        v-model="block.title"
        maxlength="160"
        placeholder="Title (optional)"
        aria-label="Callout title"
        class="w-full"
      />
    </div>
    <BlocksInlineTextarea
      v-model="block.text"
      :maxlength="3000"
      placeholder="Callout message"
      aria-label="Callout message"
    />
  </div>
</template>
