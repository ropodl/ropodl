<script setup lang="ts">
import type { ContentImage, MediaTextBlock } from '#shared/content-blocks'

const block = defineModel<MediaTextBlock>('block', { required: true })
const image = computed({
  get: () => block.value.image,
  set: (value: ContentImage | null) => (block.value.image = value ?? { src: '', alt: '', caption: '' })
})
</script>

<template>
  <div class="space-y-3">
    <BlocksImageField
      v-model="image"
      :caption="false"
    />
    <UFormField label="Image side">
      <USelect
        v-model="block.imagePosition"
        :items="[{ label: 'Image on the left', value: 'left' }, { label: 'Image on the right', value: 'right' }]"
        class="w-52"
      />
    </UFormField>
    <UInput
      v-model="block.heading"
      maxlength="160"
      placeholder="Heading (optional)"
      aria-label="Heading"
      class="w-full"
    />
    <BlocksInlineTextarea
      v-model="block.text"
      :maxlength="3000"
      placeholder="Text beside the image"
      aria-label="Text"
    />
  </div>
</template>
