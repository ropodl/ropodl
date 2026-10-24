<script setup lang="ts">
const props = defineProps<{
  slug: string
  updatedAt: string | number
}>()

type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused'

const audioElement = ref<HTMLAudioElement | null>(null)
const showAudioPlayer = ref(false)
const playbackState = ref<PlaybackState>('idle')
const statusMessage = ref('')
const playbackError = ref('')
const audioObjectUrl = ref<string | null>(null)
const requestController = ref<AbortController | null>(null)
const audioSource = computed(() => `/api/blogs/${encodeURIComponent(props.slug)}/audio?v=${encodeURIComponent(String(props.updatedAt))}`)

function getRequestError(status: number) {
  if (status === 404) return 'This article is no longer available for narration.'
  if (status === 413) return 'This article is too long to narrate.'
  if (status === 429) return 'Too many narration requests. Please wait a minute and try again.'
  if (status >= 500) return 'Narration could not be created just now. The article is still available to read; please try again shortly.'
  return `Narration could not be loaded (error ${status}). Please try again.`
}

function getPlaybackError(error: unknown) {
  if (error instanceof TypeError) {
    return 'Could not connect to the narration service. Check your internet connection and try again.'
  }
  if (error instanceof DOMException && error.name === 'NotAllowedError') {
    return 'Your browser blocked audio playback. Press Play in the audio player to start listening.'
  }
  if (error instanceof DOMException && error.name === 'NotSupportedError') {
    return 'Your browser could not decode this audio. Try using an up-to-date browser.'
  }
  return error instanceof Error
    ? error.message
    : 'Narration could not start. Please check your connection and try again.'
}

async function togglePlayback() {
  if (playbackState.value === 'playing') {
    audioElement.value?.pause()
    return
  }

  if (playbackState.value === 'loading') return

  playbackError.value = ''
  statusMessage.value = 'Preparing article audio. This may take a moment.'
  playbackState.value = 'loading'
  showAudioPlayer.value = true
  await nextTick()
  const audio = audioElement.value
  if (!audio) {
    playbackState.value = 'idle'
    return
  }

  let controller: AbortController | undefined

  try {
    if (!audioObjectUrl.value) {
      controller = new AbortController()
      requestController.value = controller
      const response = await fetch(audioSource.value, { signal: controller.signal })
      if (!response.ok) throw new Error(getRequestError(response.status))

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.toLowerCase().startsWith('audio/mpeg')) {
        throw new Error('The narration service returned an unsupported audio format.')
      }

      const audioBlob = await response.blob()
      if (controller.signal.aborted) return
      audioObjectUrl.value = URL.createObjectURL(audioBlob)
      audio.src = audioObjectUrl.value
      audio.load()
    }

    await audio.play()
  } catch (error) {
    if (controller?.signal.aborted) return
    playbackState.value = 'idle'
    playbackError.value = getPlaybackError(error)
    statusMessage.value = playbackError.value
  } finally {
    if (requestController.value === controller) requestController.value = null
  }
}

function onAudioPlaying() {
  playbackState.value = 'playing'
  statusMessage.value = 'Playing article audio.'
}

function onAudioPlay() {
  playbackState.value = 'loading'
  statusMessage.value = 'Loading article audio.'
}

function onAudioPause() {
  if (audioElement.value?.ended || playbackState.value === 'idle') return
  playbackState.value = 'paused'
  statusMessage.value = 'Article audio paused.'
}

function onAudioWaiting() {
  playbackState.value = 'loading'
  statusMessage.value = 'Loading article audio.'
}

function onAudioError() {
  if (!audioElement.value?.getAttribute('src')) return
  playbackState.value = 'idle'
  playbackError.value = 'Your browser could not play the audio. Try downloading the MP3 or using an up-to-date browser.'
  statusMessage.value = playbackError.value
}

function onAudioEnded() {
  playbackState.value = 'idle'
  statusMessage.value = 'Finished reading article.'
}

function stopPlayback() {
  const audio = audioElement.value
  if (!audio) return

  requestController.value?.abort()
  requestController.value = null
  audio.pause()
  if (audio.readyState > 0) audio.currentTime = 0
  playbackState.value = 'idle'
  playbackError.value = ''
  statusMessage.value = 'Article audio stopped.'
}

function clearAudioSource() {
  stopPlayback()
  showAudioPlayer.value = false
  const audio = audioElement.value
  audio?.removeAttribute('src')
  audio?.load()
  if (audioObjectUrl.value) URL.revokeObjectURL(audioObjectUrl.value)
  audioObjectUrl.value = null
}

watch(audioSource, clearAudioSource)

onBeforeUnmount(clearAudioSource)
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-3"
    role="group"
    aria-label="Article audio controls"
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
        :aria-label="playbackState === 'playing' ? 'Pause article narration' : playbackState === 'paused' ? 'Resume article narration' : 'Listen to article'"
        :disabled="playbackState === 'loading'"
        @click="togglePlayback"
      >
        <UIcon
          :name="playbackState === 'playing' ? 'i-lucide-pause' : 'i-lucide-volume-2'"
          class="size-4"
          aria-hidden="true"
        />
        {{ playbackState === 'loading' ? 'Preparing audio…' : playbackState === 'playing' ? 'Pause' : playbackState === 'paused' ? 'Resume' : 'Listen to article' }}
      </UButton>
    </Motion>
    <Motion
      v-if="playbackState !== 'idle'"
      as="div"
      :while-hover="{ y: -1 }"
      :while-press="{ scale: 0.97 }"
      :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
    >
      <UButton
        type="button"
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Stop article narration"
        @click="stopPlayback"
      >
        Stop
      </UButton>
    </Motion>
    <audio
      v-if="showAudioPlayer"
      ref="audioElement"
      controls
      preload="none"
      aria-label="Article narration audio player"
      class="w-full"
      @play="onAudioPlay"
      @playing="onAudioPlaying"
      @pause="onAudioPause"
      @waiting="onAudioWaiting"
      @error="onAudioError"
      @ended="onAudioEnded"
    />
    <span
      class="sr-only"
      role="status"
      aria-live="polite"
    >
      {{ statusMessage }}
    </span>
    <p
      v-if="playbackError"
      role="alert"
      class="w-full text-sm text-error"
    >
      {{ playbackError }}
    </p>
  </div>
</template>
