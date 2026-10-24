<script setup lang="ts">
const props = defineProps<{ slug: string }>()
const answered = ref(false)
const pending = ref(false)
const statusMessage = ref('')
const errorMessage = ref('')

const storageKey = computed(() => `article-feedback:${props.slug}`)

onMounted(() => {
  try {
    answered.value = localStorage.getItem(storageKey.value) !== null
  } catch (error) {
    console.warn('Could not read saved article feedback state:', error)
  }
})

async function submit(rating: 'yes' | 'no') {
  if (pending.value || answered.value) return

  pending.value = true
  errorMessage.value = ''
  try {
    await $fetch('/api/feedback', {
      method: 'POST',
      body: { slug: props.slug, rating }
    })
    answered.value = true
    statusMessage.value = 'Thanks for the feedback.'
    try {
      localStorage.setItem(storageKey.value, rating)
    } catch (error) {
      console.warn('Could not save article feedback state in local storage:', error)
    }
  } catch (error) {
    const responseMessage = error && typeof error === 'object' && 'data' in error
      && typeof error.data === 'object' && error.data !== null && 'statusMessage' in error.data
      && typeof error.data.statusMessage === 'string'
      ? error.data.statusMessage
      : undefined
    errorMessage.value = responseMessage || 'Could not save your feedback. Please try again.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section
    class="flex flex-col gap-4 rounded-xl border border-default bg-elevated/30 p-5 sm:flex-row sm:items-center sm:justify-between"
    aria-labelledby="article-feedback-heading"
  >
    <div>
      <h2
        id="article-feedback-heading"
        class="font-semibold text-highlighted"
      >
        Was this article useful?
      </h2>
      <p class="mt-1 text-sm text-muted">
        Your anonymous feedback helps improve future articles.
      </p>
      <p
        v-if="statusMessage"
        role="status"
        class="mt-2 text-sm text-primary"
      >
        {{ statusMessage }}
      </p>
      <p
        v-if="errorMessage"
        role="alert"
        class="mt-2 text-sm text-error"
      >
        {{ errorMessage }}
      </p>
    </div>
    <div
      v-if="!answered"
      class="flex gap-2"
      role="group"
      aria-label="Article usefulness feedback"
    >
      <Motion
        as="div"
        :while-hover="{ y: -1, scale: 1.02 }"
        :while-press="{ scale: 0.96 }"
        :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
      >
        <UButton
          type="button"
          color="neutral"
          variant="outline"
          class="min-h-11"
          :disabled="pending"
          @click="submit('yes')"
        >
          <UIcon
            name="i-lucide-thumbs-up"
            class="size-4"
            aria-hidden="true"
          />
          Yes
        </UButton>
      </Motion>
      <Motion
        as="div"
        :while-hover="{ y: -1, scale: 1.02 }"
        :while-press="{ scale: 0.96 }"
        :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
      >
        <UButton
          type="button"
          color="neutral"
          variant="outline"
          class="min-h-11"
          :disabled="pending"
          @click="submit('no')"
        >
          <UIcon
            name="i-lucide-thumbs-down"
            class="size-4"
            aria-hidden="true"
          />
          Not quite
        </UButton>
      </Motion>
    </div>
  </section>
</template>
