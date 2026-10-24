import type { InjectionKey, Ref } from 'vue'
import type { ContentImage } from '#shared/content-blocks'

const pendingUploadsKey: InjectionKey<Ref<number>> = Symbol('pending block uploads')
const supportedTypes = new Set(['image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp'])

// Called once by the block editor; every image field below it reports into this counter,
// so the form can disable saving while any upload is in flight.
export function provideBlockUploads() {
  const pending = ref(0)
  provide(pendingUploadsKey, pending)
  return computed(() => pending.value > 0)
}

export function useBlockImageUpload() {
  const pending = inject(pendingUploadsKey, ref(0))
  const uploading = ref(false)
  const error = ref('')

  async function upload(files: File[]): Promise<ContentImage[]> {
    error.value = ''
    if (files.some(file => !supportedTypes.has(file.type))) {
      error.value = 'Choose a PNG, JPEG, WebP, AVIF or GIF image.'
      return []
    }
    if (files.some(file => file.size > 4 * 1024 * 1024)) {
      error.value = 'Images must be 4 MB or smaller.'
      return []
    }
    uploading.value = true
    pending.value++
    try {
      const images: ContentImage[] = []
      for (const file of files) {
        const body = new FormData()
        body.append('file', file)
        const uploaded = await $fetch<{ url: string }>('/api/uploads', { method: 'POST', body })
        images.push({ src: uploaded.url, alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim().slice(0, 240) })
      }
      return images
    } catch (cause) {
      error.value = (cause as { data?: { statusMessage?: string } }).data?.statusMessage || 'Could not upload the image. Please try again.'
      return []
    } finally {
      uploading.value = false
      pending.value--
    }
  }

  return { upload, uploading, error }
}
