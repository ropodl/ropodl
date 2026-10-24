<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        'sitekey': string
        'theme': 'dark'
        'action': string
        'callback': (token: string) => void
        'expired-callback': () => void
        'error-callback': () => void
      }) => string
      reset: (widgetId?: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const runtimeConfig = useRuntimeConfig()
const { data: page } = await useFetch<{ content: Record<string, string>, seoTitle: string, seoDescription: string }>('/api/pages/contact')
const copy = computed(() => page.value?.content || {})
const siteOrigin = useSiteOrigin()
const contactDescription = 'Get in touch with Saroj Poudel about a project, collaboration, or just to say hello.'
const faqs = [
  {
    question: 'What kinds of projects do you take on?',
    answer: 'Product websites, admin tools, and full-stack apps — especially Vue, Nuxt, and Laravel work that needs both design craft and solid engineering.'
  },
  {
    question: 'Do you work remotely?',
    answer: 'Yes. I am based in Kathmandu, Nepal, and collaborate with local and remote teams.'
  },
  {
    question: 'How should I reach you?',
    answer: 'Use the form on this page or email hello@ropodl.com. Include goals, timeline, and any links that help me understand the work.'
  },
  {
    question: 'How quickly do you reply?',
    answer: 'I usually reply within a few business days. If the request is urgent, say so in the subject line.'
  }
]
usePageSeo(() => ({
  title: page.value?.seoTitle || 'Contact Saroj Poudel',
  description: page.value?.seoDescription || contactDescription,
  image: '/social-card.png',
  imageAlt: 'Contact Saroj Poudel',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': page.value?.seoTitle || 'Contact Saroj Poudel',
      'description': page.value?.seoDescription || contactDescription,
      'mainEntity': {
        '@type': 'Person',
        '@id': `${siteOrigin}/#person`,
        'name': 'Saroj Poudel',
        'email': copy.value.email
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': item.answer }
      }))
    }
  ]
}))
const turnstileSiteKey = runtimeConfig.public.turnstileSiteKey as string
const turnstileContainer = ref<HTMLElement>()
const turnstileToken = ref('')
const successHeading = ref<HTMLElement>()
const verificationMessage = ref(turnstileSiteKey
  ? 'Complete the verification challenge to enable sending.'
  : 'Contact verification is not configured yet.')
let turnstileWidgetId: string | undefined

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  website: ''
})

const sending = ref(false)
const sent = ref(false)
const errorMessage = ref('')

async function sendMessage() {
  if (sending.value) return

  sending.value = true
  sent.value = false
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, turnstileToken: turnstileToken.value }
    })
    sent.value = true
    await nextTick()
    successHeading.value?.focus()
    turnstileToken.value = ''
    Object.assign(form, { name: '', email: '', subject: '', message: '', website: '' })
    if (turnstileWidgetId) window.turnstile?.reset(turnstileWidgetId)
  } catch (error) {
    const responseMessage = error && typeof error === 'object' && 'data' in error
      && typeof error.data === 'object' && error.data !== null && 'statusMessage' in error.data
      && typeof error.data.statusMessage === 'string'
      ? error.data.statusMessage
      : undefined
    errorMessage.value = responseMessage || 'Your message could not be sent. Please try again or email hello@ropodl.com directly.'
    turnstileToken.value = ''
    if (turnstileWidgetId) window.turnstile?.reset(turnstileWidgetId)
  } finally {
    sending.value = false
  }
}

function renderTurnstile() {
  if (!turnstileContainer.value || !turnstileSiteKey || !window.turnstile || turnstileWidgetId) return

  turnstileWidgetId = window.turnstile.render(turnstileContainer.value, {
    'sitekey': turnstileSiteKey,
    'theme': 'dark',
    'action': 'contact',
    'callback': (token) => {
      turnstileToken.value = token
      verificationMessage.value = 'Verification complete. You can send your message.'
      errorMessage.value = ''
    },
    'expired-callback': () => {
      turnstileToken.value = ''
      verificationMessage.value = 'Complete the verification challenge to enable sending.'
      errorMessage.value = 'Verification expired. Please complete the challenge again.'
    },
    'error-callback': () => {
      turnstileToken.value = ''
      verificationMessage.value = 'Verification is unavailable. Please try again.'
      errorMessage.value = 'The verification challenge could not be completed. Please try again.'
    }
  })
}

onMounted(() => {
  if (!turnstileSiteKey) {
    return
  }
  if (window.turnstile) {
    renderTurnstile()
    return
  }

  const script = document.createElement('script')
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
  script.async = true
  script.defer = true
  script.onload = renderTurnstile
  script.onerror = () => {
    verificationMessage.value = 'Verification is unavailable. Please reload the page.'
    errorMessage.value = 'Could not load the verification challenge. Please reload the page.'
  }
  document.head.appendChild(script)
})

onBeforeUnmount(() => {
  if (turnstileWidgetId) window.turnstile?.remove(turnstileWidgetId)
  turnstileWidgetId = undefined
})
</script>

<template>
  <PublicPageMotion
    preset="contact"
    class="mx-auto flex max-w-2xl flex-col gap-8 py-4 sm:gap-10 sm:py-8"
  >
    <header class="space-y-5">
      <p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
        {{ copy.eyebrow || 'Contact' }}
      </p>
      <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
        {{ copy.heading || "Let's make something good." }}
      </h1>
      <p class="font-mono text-base leading-7 text-muted">
        {{ copy.description }}
      </p>
    </header>

    <div class="flex flex-col gap-6 sm:gap-7">
      <div class="grid gap-3 sm:grid-cols-2">
        <Motion
          as="div"
          :while-hover="{ y: -2 }"
          :while-press="{ scale: 0.985 }"
          :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
        >
          <UCard
            class="bg-elevated/50"
            :ui="{ body: 'flex items-start gap-4 p-5' }"
          >
            <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UIcon
                name="i-lucide-mail"
                class="size-5"
              />
            </span>
            <div class="min-w-0">
              <p class="font-mono text-xs uppercase tracking-wider text-muted">
                Email
              </p>
              <a
                :href="`mailto:${copy.email || 'hello@ropodl.com'}`"
                class="mt-1 block break-all font-medium text-highlighted transition-colors hover:text-primary"
              >
                {{ copy.email || 'hello@ropodl.com' }}
              </a>
            </div>
          </UCard>
        </Motion>
        <Motion
          as="div"
          :while-hover="{ y: -2 }"
          :while-press="{ scale: 0.985 }"
          :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
        >
          <UCard
            class="bg-elevated/50"
            :ui="{ body: 'flex items-start gap-4 p-5' }"
          >
            <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UIcon
                name="i-lucide-map-pin"
                class="size-5"
              />
            </span>
            <div>
              <p class="font-mono text-xs uppercase tracking-wider text-muted">
                Based in
              </p>
              <p class="mt-1 font-medium text-highlighted">
                {{ copy.location || 'Kathmandu, Nepal' }}
              </p>
            </div>
          </UCard>
        </Motion>
      </div>

      <Motion
        as="div"
        :while-hover="{ y: -1 }"
        :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
      >
        <UCard
          class="bg-elevated/50"
          :ui="{ body: 'p-5 sm:p-8' }"
        >
          <div
            v-if="sent"
            role="status"
            class="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5"
          >
            <UIcon
              name="i-lucide-circle-check"
              class="mt-0.5 size-5 shrink-0 text-primary"
            />
            <div>
              <h2
                ref="successHeading"
                tabindex="-1"
                class="font-semibold text-highlighted"
              >
                Thanks for reaching out.
              </h2>
              <p class="mt-1 font-mono text-sm leading-6 text-muted">
                Your message has been sent. I’ll get back to you soon.
              </p>
            </div>
          </div>
          <form
            v-else
            class="space-y-5"
            @submit.prevent="sendMessage"
          >
            <input
              v-model="form.website"
              name="website"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              class="absolute -left-[10000px] size-px opacity-0"
            >
            <div class="grid gap-5 sm:grid-cols-2">
              <UFormField
                label="Your name"
                name="name"
                required
              >
                <UInput
                  v-model="form.name"
                  autocomplete="name"
                  placeholder="Your name"
                  required
                  class="w-full"
                  :disabled="sending"
                />
              </UFormField>
              <UFormField
                label="Email address"
                name="email"
                required
              >
                <UInput
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  placeholder="you@example.com"
                  required
                  class="w-full"
                  :disabled="sending"
                />
              </UFormField>
            </div>
            <UFormField
              label="Subject"
              name="subject"
              required
            >
              <UInput
                v-model="form.subject"
                placeholder="What would you like to talk about?"
                required
                class="w-full"
                :disabled="sending"
              />
            </UFormField>
            <UFormField
              label="Message"
              name="message"
              required
            >
              <UTextarea
                v-model="form.message"
                placeholder="Tell me a little about it..."
                :rows="5"
                required
                class="w-full"
                :disabled="sending"
              />
            </UFormField>
            <p
              v-if="errorMessage"
              role="alert"
              class="font-mono text-sm text-red-400"
            >
              {{ errorMessage }}
            </p>
            <div class="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <div
                role="group"
                aria-label="Message verification"
                class="space-y-2"
              >
                <p
                  id="verification-instructions"
                  role="status"
                  aria-live="polite"
                  class="font-mono text-xs text-muted"
                >
                  {{ verificationMessage }}
                </p>
                <div
                  v-if="turnstileSiteKey"
                  ref="turnstileContainer"
                  aria-describedby="verification-instructions"
                />
              </div>
              <UButton
                type="submit"
                color="primary"
                variant="solid"
                size="lg"
                class="accent-bloom"
                :loading="sending"
                :disabled="sending || !turnstileToken"
              >
                {{ sending ? 'Sending…' : 'Send a message' }}
                <template #trailing>
                  <UIcon name="i-lucide-arrow-up-right" />
                </template>
              </UButton>
            </div>
          </form>
        </UCard>
      </Motion>

      <section
        class="space-y-5"
        aria-labelledby="contact-faq-heading"
      >
        <header class="space-y-3">
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            FAQ
          </p>
          <h2
            id="contact-faq-heading"
            class="text-2xl font-bold tracking-tight text-highlighted sm:text-3xl"
          >
            Before you write
          </h2>
        </header>
        <div class="divide-y divide-default rounded-xl border border-default">
          <details
            v-for="item in faqs"
            :key="item.question"
            class="group p-4 sm:p-5"
          >
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-highlighted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
              {{ item.question }}
              <UIcon
                name="i-lucide-plus"
                class="size-4 shrink-0 text-primary transition-transform group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p class="mt-3 font-mono text-sm leading-7 text-muted">
              {{ item.answer }}
            </p>
          </details>
        </div>
      </section>
    </div>
  </PublicPageMotion>
</template>
