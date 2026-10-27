<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const statusCode = computed(() => Number(props.error.statusCode) || 500)
const isNotFound = computed(() => statusCode.value === 404)
const errorContent = computed(() => {
  switch (statusCode.value) {
    case 400:
      return {
        title: 'Bad request',
        description: 'We couldn’t understand that request. Please try again or return to the homepage.'
      }
    case 401:
      return {
        title: 'Sign in required',
        description: 'You need to sign in to view this page.'
      }
    case 403:
      return {
        title: 'Access denied',
        description: 'You don’t have permission to view this page.'
      }
    case 404:
      return {
        title: 'Page not found',
        description: 'The page may have moved, or the link may be out of date. Let’s get you back on track.'
      }
    case 408:
      return {
        title: 'Request timed out',
        description: 'The request took too long to complete. Please try again in a moment.'
      }
    case 429:
      return {
        title: 'Too many requests',
        description: 'Please wait a moment before trying again.'
      }
    case 502:
    case 503:
    case 504:
      return {
        title: 'Temporarily unavailable',
        description: 'The site is having trouble responding right now. Please try again shortly.'
      }
    default:
      return {
        title: 'Something went wrong',
        description: 'An unexpected error occurred. Please try again, or head back to the homepage.'
      }
  }
})

useSeoMeta({
  title: () => `${statusCode.value} — ${errorContent.value.title}`,
  description: () => errorContent.value.description,
  robots: 'noindex, nofollow'
})

function goHome() {
  clearError({ redirect: '/' })
}

function getInTouch() {
  clearError({ redirect: '/contact' })
}
</script>

<template>
  <UApp>
    <main class="flex min-h-screen items-center justify-center px-4 py-16">
      <section
        class="w-full max-w-xl text-center"
        aria-labelledby="error-title"
        aria-describedby="error-description"
      >
        <div
          aria-hidden="true"
          class="relative mx-auto mb-8 flex size-28 items-center justify-center rounded-full border border-primary/20 bg-primary/5 sm:size-36"
        >
          <div class="absolute inset-3 rounded-full border border-primary/15" />
          <UIcon
            :name="isNotFound ? 'i-lucide-compass' : 'i-lucide-triangle-alert'"
            class="size-10 text-primary sm:size-12"
          />
        </div>

        <p class="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Error {{ statusCode }}
        </p>
        <h1
          id="error-title"
          class="mt-4 text-3xl font-bold tracking-tight text-highlighted sm:text-5xl"
        >
          {{ errorContent.title }}
        </h1>
        <p
          id="error-description"
          class="mx-auto mt-5 max-w-md font-mono text-sm leading-7 text-muted sm:text-base"
        >
          {{ errorContent.description }}
        </p>

        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <UButton
            size="lg"
            color="primary"
            icon="i-lucide-house"
            @click="goHome"
          >
            Back to homepage
          </UButton>
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            icon="i-lucide-mail"
            @click="getInTouch"
          >
            Get in touch
          </UButton>
        </div>

        <NuxtLink
          to="/"
          class="mt-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-highlighted"
          @click.prevent="goHome"
        >
          <img
            src="/icon.svg"
            alt=""
            aria-hidden="true"
            class="size-6"
          >
          ropodl
        </NuxtLink>
      </section>
    </main>
  </UApp>
</template>
