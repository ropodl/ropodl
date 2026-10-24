<script setup lang="ts">
import { isSafeContentImageUrl, type ContentImage } from '#shared/content-blocks'

const props = withDefaults(defineProps<{ label?: string, caption?: boolean, removable?: boolean }>(), { label: 'Image', caption: true })
const image = defineModel<ContentImage | null>({ required: true })
const input = ref<HTMLInputElement>()
const { upload, uploading, error } = useBlockImageUpload()
const hasImage = computed(() => Boolean(image.value && isSafeContentImageUrl(image.value.src)))

async function onFiles(event: Event) {
  const target = event.target as HTMLInputElement
  const [uploaded] = await upload(Array.from(target.files || []).slice(0, 1))
  target.value = ''
  if (uploaded) image.value = { ...uploaded, caption: image.value?.caption || '' }
}

function remove() {
  image.value = props.removable ? null : { src: '', alt: '', caption: '' }
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center gap-3">
      <img
        v-if="hasImage"
        :src="image!.src"
        :alt="image!.alt"
        loading="lazy"
        class="h-20 w-28 rounded-md object-cover"
      >
      <div
        v-else
        class="flex h-20 w-28 items-center justify-center rounded-md border border-dashed border-accented text-dimmed"
      >
        <UIcon
          name="i-lucide-image"
          class="size-6"
          aria-hidden="true"
        />
      </div>
      <div class="flex flex-wrap gap-2">
        <UButton
          size="sm"
          variant="outline"
          color="neutral"
          icon="i-lucide-upload"
          :loading="uploading"
          @click="input?.click()"
        >
          {{ hasImage ? `Replace ${label.toLowerCase()}` : `Upload ${label.toLowerCase()}` }}
        </UButton>
        <UButton
          v-if="hasImage"
          size="sm"
          variant="ghost"
          color="neutral"
          icon="i-lucide-x"
          @click="remove"
        >
          Remove
        </UButton>
      </div>
      <input
        ref="input"
        type="file"
        accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
        class="sr-only"
        :aria-label="`Upload ${label.toLowerCase()}`"
        @change="onFiles"
      >
    </div>
    <p
      v-if="error"
      class="text-xs text-error"
      role="alert"
    >
      {{ error }}
    </p>
    <div
      v-if="image && hasImage"
      class="grid gap-3"
      :class="caption ? 'sm:grid-cols-2' : ''"
    >
      <UFormField
        label="Alt text"
        help="Describe the image for people using screen readers."
      >
        <UInput
          v-model="image.alt"
          maxlength="240"
          class="w-full"
        />
      </UFormField>
      <UFormField
        v-if="caption"
        label="Caption"
      >
        <UInput
          v-model="image.caption"
          maxlength="500"
          placeholder="Optional"
          class="w-full"
        />
      </UFormField>
    </div>
  </div>
</template>
