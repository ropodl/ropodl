<script setup lang="ts">
const { data: page } = await useFetch<{ content: Record<string, string>, seoTitle: string, seoDescription: string }>('/api/pages/about')
const copy = computed(() => page.value?.content || {})
const siteOrigin = useSiteOrigin()
const skills = computed(() => [...new Set([
  ...(copy.value.skills || 'Vue.js, Nuxt, TypeScript, Node.js, Express.js, Hono, UI design, HTML, CSS, JavaScript, Git, Laravel, SEO, Figma, Adobe XD, Illustrator, Photoshop').split(',')
].map(item => item.trim()).filter(Boolean))])
const experience = computed(() => (copy.value.experience || '').split('\n').map((line) => {
  const [title, company, period, highlights = ''] = line.split('|').map(item => item.trim())
  return { title, company, period, highlights: highlights.split(';').map(item => item.trim()).filter(Boolean) }
}).filter(item => item.title))
const workSteps = computed(() => (copy.value.howIWorkSteps || '').split('\n').map((line) => {
  const [title, description] = line.split('|').map(item => item.trim())
  return { title, description }
}).filter(item => item.title))
const faqs = [
  {
    question: 'What do you specialize in?',
    answer: 'Full-stack product work with Vue, Nuxt, and Laravel — from interface design through backend services, launch, and ongoing maintenance.'
  },
  {
    question: 'Do you handle both design and development?',
    answer: 'Yes. I shape the interface and build the underlying functionality so the experience stays coherent from sketch to production.'
  },
  {
    question: 'Where are you based?',
    answer: 'Kathmandu, Nepal. I collaborate with local teams and remote clients.'
  },
  {
    question: 'How do engagements usually start?',
    answer: 'With a clear goal: who the product is for, what success looks like, and the constraints around timeline and stack. From there I shape, build, launch, and keep improving.'
  }
]
const aboutDescription = 'Learn about Saroj Poudel, a full-stack developer and designer based in Kathmandu, Nepal.'
usePageSeo(() => ({
  title: page.value?.seoTitle || 'About Saroj Poudel',
  description: page.value?.seoDescription || aboutDescription,
  image: '/saroj-poudel.webp',
  imageAlt: 'Saroj Poudel',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      'name': page.value?.seoTitle || 'About Saroj Poudel',
      'description': page.value?.seoDescription || aboutDescription,
      'mainEntity': { '@id': `${siteOrigin}/#person` }
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
</script>

<template>
  <PublicPageMotion
    preset="profile"
    class="space-y-16 py-4 sm:space-y-20 sm:py-8"
  >
    <section class="flex flex-col items-start gap-8 sm:gap-10">
      <div class="w-full max-w-3xl space-y-6">
        <header class="space-y-4">
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {{ copy.eyebrow || 'A little about me' }}
          </p>
          <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
            {{ copy.heading || 'Developer by craft, designer by instinct.' }}
          </h1>
        </header>
        <div class="space-y-4 font-mono text-sm leading-7 text-muted sm:text-base">
          <p>
            {{ copy.paragraph1 }}
          </p>
          <p>
            {{ copy.paragraph2 }}
          </p>
          <p>
            {{ copy.paragraph3 }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Motion
            v-for="skill in skills"
            :key="skill"
            as="span"
            :while-hover="{ y: -1, scale: 1.03 }"
            :transition="{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }"
          >
            <UBadge
              color="neutral"
              variant="outline"
            >
              {{ skill }}
            </UBadge>
          </Motion>
        </div>
        <UButton
          to="/contact"
          color="primary"
          variant="solid"
          size="lg"
          class="accent-bloom"
        >
          {{ copy.button || 'Get in touch' }}
          <template #trailing>
            <UIcon name="i-lucide-arrow-up-right" />
          </template>
        </UButton>
      </div>
    </section>

    <section class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-elevated/60 to-elevated/30 p-6 sm:p-10">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/10 blur-3xl"
      />
      <div class="relative grid gap-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-center sm:gap-12">
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {{ copy.valueEyebrow || 'The value I bring' }}
          </p>
          <h2 class="mt-4 text-2xl font-bold leading-tight tracking-tight text-highlighted sm:text-3xl">
            {{ copy.valueHeading || 'Thoughtful design. Solid engineering. One complete experience.' }}
          </h2>
        </div>
        <p class="font-mono text-sm leading-7 text-muted sm:text-base">
          {{ copy.valueDescription || 'I connect visual design with full-stack development to help ideas become useful, polished products. From shaping the interface to building, launching, and maintaining it, I keep the details working together.' }}
        </p>
      </div>
    </section>

    <section class="space-y-6">
      <header class="max-w-2xl space-y-4">
        <p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {{ copy.howIWorkEyebrow || 'A considered process' }}
        </p>
        <h2 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
          {{ copy.howIWorkTitle || 'How I work' }}
        </h2>
        <p class="font-mono text-sm leading-7 text-muted sm:text-base">
          {{ copy.howIWorkIntro || 'Good work comes from understanding the problem, making deliberate choices, and following through beyond the first release.' }}
        </p>
      </header>

      <div class="grid gap-3 sm:grid-cols-2">
        <Motion
          v-for="(step, index) in workSteps"
          :key="step.title"
          as="article"
          :while-hover="{ y: -2 }"
          :while-press="{ scale: 0.985 }"
          :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
        >
          <UCard
            class="h-full bg-elevated/40 transition-colors hover:bg-elevated/70"
            :ui="{ body: 'flex h-full gap-4 p-5 sm:p-6' }"
          >
            <span class="flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 font-mono text-xs font-semibold text-primary">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div class="space-y-2">
              <h3 class="font-semibold text-highlighted">
                {{ step.title }}
              </h3>
              <p class="font-mono text-sm leading-6 text-muted">
                {{ step.description }}
              </p>
            </div>
          </UCard>
        </Motion>
      </div>
    </section>

    <section
      class="space-y-6"
      aria-labelledby="about-faq-heading"
    >
      <header class="max-w-2xl space-y-4">
        <p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          FAQ
        </p>
        <h2
          id="about-faq-heading"
          class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
        >
          Common questions
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

    <section class="mb-6 space-y-6 sm:mb-8">
      <header class="max-w-2xl space-y-4">
        <p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {{ copy.journey || 'The journey' }}
        </p>
        <h2 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
          {{ copy.experienceTitle || 'Experience' }}
        </h2>
        <p class="max-w-sm font-mono text-sm leading-7 text-muted">
          {{ copy.experienceIntro }}
        </p>
      </header>

      <ol class="divide-y divide-default border-y border-default">
        <Motion
          v-for="item in experience"
          :key="item.company"
          as="li"
          :while-hover="{ x: 3 }"
          :while-press="{ scale: 0.995 }"
          :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
          class="py-6 sm:py-8"
        >
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div class="space-y-2">
              <h3 class="text-lg font-semibold text-highlighted">
                {{ item.title }}
              </h3>
              <p class="text-sm text-primary">
                {{ item.company }}
              </p>
              <ul
                v-if="item.highlights.length"
                class="max-w-2xl list-disc space-y-1.5 pl-4 pt-1 font-mono text-sm leading-6 text-muted marker:text-primary/60"
              >
                <li
                  v-for="highlight in item.highlights"
                  :key="highlight"
                >
                  {{ highlight }}
                </li>
              </ul>
            </div>
            <span class="shrink-0 font-mono text-xs text-muted">{{ item.period }}</span>
          </div>
        </Motion>
      </ol>
    </section>
    <LazyContactCta hydrate-on-visible />
  </PublicPageMotion>
</template>
