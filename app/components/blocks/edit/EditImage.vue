<script setup lang="ts">
import type { ContentImage, ImageBlock } from '#shared/content-blocks'

const block = defineModel<ImageBlock>('block', { required: true })
const image = computed({
  get: () => block.value.image,
  set: (value: ContentImage | null) => (block.value.image = value ?? { src: '', alt: '', caption: '' })
})
</script>

<template>
  <div class="space-y-3">
    <BlocksImageField v-model="image" />
    <UFormField label="Width">
      <USelect
        :model-value="block.width ?? 'normal'"
        :items="[{ label: 'Text width', value: 'normal' }, { label: 'Wide (breaks out of the text column)', value: 'wide' }]"
        class="w-72 max-w-full"
        @update:model-value="block.width = $event as 'normal' | 'wide'"
      />
    </UFormField>
  </div>
</template>
