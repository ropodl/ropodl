<script setup lang="ts">
import type { BeforeAfterBlock, ContentImage } from '#shared/content-blocks'

const block = defineModel<BeforeAfterBlock>('block', { required: true })
const empty = () => ({ src: '', alt: '', caption: '' })
const before = computed({ get: () => block.value.before, set: (value: ContentImage | null) => (block.value.before = value ?? empty()) })
const after = computed({ get: () => block.value.after, set: (value: ContentImage | null) => (block.value.after = value ?? empty()) })
</script>

<template>
  <div class="space-y-4">
    <div class="grid gap-4 lg:grid-cols-2">
      <UFormField label="Before">
        <BlocksImageField
          v-model="before"
          label="Before image"
          :caption="false"
        />
      </UFormField>
      <UFormField label="After">
        <BlocksImageField
          v-model="after"
          label="After image"
          :caption="false"
        />
      </UFormField>
    </div>
    <p class="text-xs text-muted">
      Use images of the same size so the slider lines up.
    </p>
    <UInput
      v-model="block.caption"
      maxlength="500"
      placeholder="Caption (optional)"
      aria-label="Caption"
      class="w-full"
    />
  </div>
</template>
