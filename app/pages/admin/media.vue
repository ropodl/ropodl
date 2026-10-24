<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

interface MediaFile { key: string, url: string, size: number, uploadedAt: string }
interface MediaPage { files: MediaFile[], cursor: string | null }

const files = ref<MediaFile[]>([])
const cursor = ref<string | null>(null)
const search = ref('')
const pending = ref(true)
const uploading = ref(false)
const deletingKey = ref<string | null>(null)
const error = ref('')
const notice = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const visibleFiles = computed(() => {
  const term = search.value.trim().toLowerCase()
  return term ? files.value.filter(file => file.key.toLowerCase().includes(term)) : files.value
})

async function loadFiles(next = false) {
  pending.value = true
  error.value = ''
  try {
    const page = await $fetch<MediaPage>('/api/admin/media', { query: next && cursor.value ? { cursor: cursor.value } : {} })
    files.value = next ? [...files.value, ...page.files] : page.files
    cursor.value = page.cursor
  } catch (requestError) {
    const apiError = requestError as { data?: { statusMessage?: string } }
    error.value = apiError.data?.statusMessage || 'Could not load your media library.'
  } finally {
    pending.value = false
  }
}

async function uploadFiles(event: Event) {
  const input = event.target as HTMLInputElement
  const selected = Array.from(input.files || [])
  if (!selected.length) return
  error.value = ''
  notice.value = ''
  uploading.value = true
  try {
    for (const file of selected) {
      if (!file.type.startsWith('image/') || file.size > 4 * 1024 * 1024) {
        throw new Error(`${file.name} must be an image no larger than 4 MB.`)
      }
      const data = new FormData()
      data.append('file', file)
      await $fetch('/api/uploads', { method: 'POST', body: data })
    }
    notice.value = `${selected.length} image${selected.length === 1 ? '' : 's'} uploaded.`
    await loadFiles()
  } catch (requestError) {
    const apiError = requestError as { data?: { statusMessage?: string }, message?: string }
    error.value = apiError.data?.statusMessage || apiError.message || 'Upload failed.'
  } finally {
    uploading.value = false
    input.value = ''
  }
}

async function copyUrl(url: string) {
  await navigator.clipboard.writeText(new URL(url, window.location.origin).toString())
  notice.value = 'Image URL copied.'
}

async function deleteFile(file: MediaFile) {
  const name = file.key.split('/').pop() || file.key
  if (!window.confirm(`Delete “${name}”? This cannot be undone.`)) return
  error.value = ''
  notice.value = ''
  deletingKey.value = file.key
  try {
    await $fetch(`/api/uploads/${file.key}`, { method: 'DELETE' })
    files.value = files.value.filter(item => item.key !== file.key)
    notice.value = 'Image deleted.'
  } catch (requestError) {
    const apiError = requestError as { data?: { statusMessage?: string } }
    error.value = apiError.data?.statusMessage || 'Could not delete this image.'
  } finally {
    deletingKey.value = null
  }
}

const formatSize = (bytes: number) => bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
const formatDate = (date: string) => new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(date))

onMounted(() => loadFiles())
</script>

<template>
  <AdminShell>
    <AdminPageHeader
      eyebrow="Media"
      title="File explorer"
      description="Browse and upload images for your posts and projects. Uploads are converted to WebP before storage."
    >
      <template #actions>
        <UButton
          icon="i-lucide-upload"
          :loading="uploading"
          @click="fileInput?.click()"
        >
          {{ uploading ? 'Uploading…' : 'Upload images' }}
        </UButton>
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
          class="sr-only"
          tabindex="-1"
          aria-hidden="true"
          :disabled="uploading"
          @change="uploadFiles"
        >
      </template>
    </AdminPageHeader>

    <div class="space-y-5">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <UInput
          v-model="search"
          type="search"
          icon="i-lucide-search"
          placeholder="Search files"
          aria-label="Search files"
          class="w-full sm:max-w-sm"
        />
        <p class="text-xs text-muted">
          {{ visibleFiles.length }} image{{ visibleFiles.length === 1 ? '' : 's' }} shown · 4 MB max per upload
        </p>
      </div>

      <UAlert
        v-if="error"
        role="alert"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
        :title="error"
      />
      <UAlert
        v-if="notice"
        role="status"
        color="success"
        variant="subtle"
        icon="i-lucide-circle-check"
        :title="notice"
      />

      <AdminSection v-if="pending && !files.length">
        <UEmpty
          variant="naked"
          loading
          title="Loading media…"
        />
      </AdminSection>
      <AdminSection v-else-if="!visibleFiles.length">
        <UEmpty
          variant="naked"
          icon="i-lucide-images"
          :title="search ? 'No matching images' : 'Your media library is empty'"
          description="Upload images to use them in your blog posts and projects."
        />
      </AdminSection>
      <div
        v-else
        class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <article
          v-for="file in visibleFiles"
          :key="file.key"
          class="group overflow-hidden rounded-xl border border-default bg-muted transition-colors hover:border-accented"
        >
          <div class="relative aspect-square bg-default">
            <img
              :src="file.url"
              :alt="file.key.split('/').pop() || 'Uploaded image'"
              loading="lazy"
              class="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            >
            <div class="absolute right-2 bottom-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
              <UButton
                color="neutral"
                variant="solid"
                size="sm"
                icon="i-lucide-copy"
                aria-label="Copy image URL"
                title="Copy image URL"
                @click="copyUrl(file.url)"
              />
              <UButton
                color="error"
                variant="solid"
                size="sm"
                icon="i-lucide-trash-2"
                aria-label="Delete image"
                title="Delete image"
                :loading="deletingKey === file.key"
                :disabled="deletingKey === file.key"
                @click="deleteFile(file)"
              />
            </div>
          </div>
          <div class="p-3">
            <p
              class="truncate text-xs font-medium text-highlighted"
              :title="file.key.split('/').pop()"
            >
              {{ file.key.split('/').pop() }}
            </p>
            <p class="mt-1 text-[10px] text-dimmed">
              {{ formatSize(file.size) }} · {{ formatDate(file.uploadedAt) }}
            </p>
          </div>
        </article>
      </div>

      <div
        v-if="cursor"
        class="text-center"
      >
        <UButton
          color="neutral"
          variant="outline"
          :loading="pending"
          @click="loadFiles(true)"
        >
          {{ pending ? 'Loading…' : 'Load more' }}
        </UButton>
      </div>
    </div>
  </AdminShell>
</template>
