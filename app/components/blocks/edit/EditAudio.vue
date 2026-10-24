<script setup lang="ts">
import type { AudioBlock } from '#shared/content-blocks'

const block = defineModel<AudioBlock>('block', { required: true })
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-2">
    <UFormField
      label="Audio file link"
      help="An https:// link to an MP3, M4A or similar file."
    >
      <UInput
        v-model="block.url"
        type="url"
        maxlength="2048"
        placeholder="https://…"
        class="w-full"
      />
    </UFormField>
    <UFormField label="Title">
      <UInput
        v-model="block.title"
        maxlength="160"
        placeholder="Optional"
        class="w-full"
      />
    </UFormField>
  </div>
</template>
