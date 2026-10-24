<script setup lang="ts">
const props = defineProps<{ title: string, text?: string, stacked?: boolean }>()

const nativeShareAvailable = ref(false)
const statusMessage = ref('')
const errorMessage = ref('')
let clearMessageTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  nativeShareAvailable.value = typeof navigator.share === 'function'
})

async function copyLink() {
  errorMessage.value = ''
  try {
    await navigator.clipboard.writeText(window.location.href)
    statusMessage.value = 'Link copied.'
  } catch (error) {
    console.error('Could not copy the page link:', error)
    errorMessage.value = 'Could not copy the link. Check clipboard permissions and try again.'
  }
  clearTimeout(clearMessageTimer)
  clearMessageTimer = setTimeout(() => {
    statusMessage.value = ''
    errorMessage.value = ''
  }, 4000)
}

async function sharePage() {
  if (!navigator.share) return
  errorMessage.value = ''
  try {
    await navigator.share({
      title: props.title,
      text: props.text || props.title,
      url: window.location.href
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return
    console.error('Could not share the page:', error)
    errorMessage.value = 'Could not open the share menu. Please try copying the link instead.'
  }
}

onBeforeUnmount(() => clearTimeout(clearMessageTimer))
</script>

<template>
  <div
    class="flex gap-2"
    :class="props.stacked ? 'flex-col items-start' : 'flex-row flex-wrap items-center'"
  >
    <Motion
      as="div"
      :while-hover="{ y: -1 }"
      :while-press="{ scale: 0.97 }"
      :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
    >
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        size="sm"
        aria-label="Copy link to this page"
        @click="copyLink"
      >
        <UIcon
          name="i-lucide-link"
          class="size-4"
        />
        {{ statusMessage || 'Copy link' }}
      </UButton>
    </Motion>
    <Motion
      v-if="nativeShareAvailable"
      as="div"
      :while-hover="{ y: -1 }"
      :while-press="{ scale: 0.97 }"
      :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
    >
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        size="sm"
        aria-label="Share this page"
        @click="sharePage"
      >
        <UIcon
          name="i-lucide-share-2"
          class="size-4"
        />
        Share
      </UButton>
    </Motion>
    <span
      v-if="errorMessage"
      class="text-sm text-error"
      role="alert"
    >{{ errorMessage }}</span>
  </div>
</template>
