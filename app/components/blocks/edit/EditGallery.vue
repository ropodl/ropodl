<script setup lang="ts">
import type { GalleryBlock } from '#shared/content-blocks'

const block = defineModel<GalleryBlock>('block', { required: true })
const input = ref<HTMLInputElement>()
const { upload, uploading, error } = useBlockImageUpload()
const remaining = computed(() => 12 - block.value.images.length)

async function onFiles(event: Event) {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  target.value = ''
  if (files.length > remaining.value) {
    error.value = `A gallery holds up to 12 images; you can add ${remaining.value} more.`
    return
  }
  block.value.images.push(...await upload(files))
}

function move(index: number, offset: -1 | 1) {
  const [image] = block.value.images.splice(index, 1)
  block.value.images.splice(index + offset, 0, image!)
}
</script>

<template>
  <div class="space-y-3">
    <ul
      v-if="block.images.length"
      class="grid grid-cols-2 gap-3 sm:grid-cols-3"
    >
      <li
        v-for="(image, index) in block.images"
        :key="image.src"
        class="space-y-2"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          loading="lazy"
          class="aspect-square w-full rounded-md object-cover"
        >
        <UInput
          v-model="image.alt"
          size="sm"
          maxlength="240"
          placeholder="Alt text"
          :aria-label="`Alt text for image ${index + 1}`"
          class="w-full"
        />
        <div class="flex gap-0.5">
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            icon="i-lucide-chevron-left"
            :disabled="index === 0"
            :aria-label="`Move image ${index + 1} earlier`"
            @click="move(index, -1)"
          />
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            icon="i-lucide-chevron-right"
            :disabled="index === block.images.length - 1"
            :aria-label="`Move image ${index + 1} later`"
            @click="move(index, 1)"
          />
          <UButton
            size="xs"
            variant="ghost"
            color="error"
            icon="i-lucide-trash-2"
            class="ml-auto"
            :aria-label="`Remove image ${index + 1}`"
            @click="block.images.splice(index, 1)"
          />
        </div>
      </li>
    </ul>
    <UButton
      size="sm"
      variant="outline"
      color="neutral"
      icon="i-lucide-images"
      :loading="uploading"
      :disabled="remaining <= 0"
      @click="input?.click()"
    >
      Add images ({{ block.images.length }}/12)
    </UButton>
    <input
      ref="input"
      type="file"
      multiple
      accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
      class="sr-only"
      aria-label="Add gallery images"
      @change="onFiles"
    >
    <p
      v-if="error"
      class="text-xs text-error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>
