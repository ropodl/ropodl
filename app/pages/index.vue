<script setup lang="ts">
import { blogPostFormats, type BlogPostFormat } from '../utils/blog-post-formats'

interface ProjectRecord {
  slug: string
  title: string
  summary: string
  imageUrl: string | null
  createdAt: string | number
  type?: { title: string, slug: string } | null
}

interface BlogPost {
  slug: string
  title: string
  summary: string
  createdAt: string | number
  postFormat?: BlogPostFormat
  category?: { title: string, slug: string } | null
}

interface PaginatedResponse<T> { items: T[], page: number, totalPages: number }

const nuxtApp = useNuxtApp()
const getCachedPayload = (key: string) => nuxtApp.payload.data[key] || nuxtApp.static.data[key]

const [{ data: projects }, { data: posts }, { data: page }] = await Promise.all([
  useFetch<PaginatedResponse<ProjectRecord>>('/api/projects', {
    default: () => ({ items: [], page: 1, totalPages: 1 }),
    getCachedData: getCachedPayload
  }),
  useFetch<PaginatedResponse<BlogPost>>('/api/blogs', {
    default: () => ({ items: [], page: 1, totalPages: 1 }),
    getCachedData: getCachedPayload
  }),
  useFetch<{ content: Record<string, string>, seoTitle: string, seoDescription: string }>('/api/pages/home', {
    getCachedData: getCachedPayload
  })
])
const copy = computed(() => page.value?.content || {})
const blogsHeading = computed(() => copy.value.blogsHeading?.trim() || 'Blog')
const blogsEyebrow = computed(() => {
  const heading = blogsHeading.value.toLocaleLowerCase()
  const configuredEyebrow = copy.value.blogsEyebrow?.trim()

  if (configuredEyebrow && configuredEyebrow.toLocaleLowerCase() !== heading) return configuredEyebrow
  return heading === 'latest writing' ? 'On the blog' : 'Latest writing'
})
const siteOrigin = useSiteOrigin()

const featuredProjects = computed(() => projects.value?.items.slice(0, 3) ?? [])
const recentPosts = computed(() => posts.value?.items.slice(0, 3) ?? [])
const hasPosts = computed(() => recentPosts.value.length > 0)
const homeDescription = 'Full-stack developer and designer in Kathmandu. Selected work with Vue, Nuxt, and Laravel.'

usePageSeo(() => ({
  title: page.value?.seoTitle || 'Saroj Poudel — Full-stack developer & designer',
  description: page.value?.seoDescription || homeDescription,
  image: '/social-card.png',
  imageAlt: 'Saroj Poudel — Full-stack developer and designer',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': page.value?.seoTitle || 'Saroj Poudel — Full-stack developer & designer',
    'description': page.value?.seoDescription || homeDescription,
    'mainEntity': { '@id': `${siteOrigin}/#person` },
    'hasPart': {
      '@type': 'ItemList',
      'name': 'Selected projects',
      'itemListElement': featuredProjects.value.map((project, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `${siteOrigin}/projects/${project.slug}`,
        'name': project.title
      }))
    }
  }
}))

function formatDate(value: string | number) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(value))
}

function formatLabel(value: BlogPostFormat) {
  return value === 'standard' ? 'Post' : blogPostFormats.find(format => format.value === value)?.label || 'Post'
}

function year(value: string | number) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'UTC' }).format(new Date(value))
}
</script>

<template>
  <PublicPageMotion
    preset="home"
    class="block"
  >
    <section class="flex flex-col items-start gap-6 py-12 sm:py-20">
      <div class="relative">
        <div
          aria-hidden="true"
          class="absolute -inset-3 rounded-full bg-primary/20 blur-2xl"
        />
        <img
          src="/saroj-poudel-128.webp"
          srcset="/saroj-poudel-128.webp 128w, /saroj-poudel-320.webp 320w, /saroj-poudel.webp 512w"
          sizes="(min-width: 640px) 160px, 128px"
          alt="Saroj Poudel"
          width="160"
          height="160"
          fetchpriority="high"
          decoding="async"
          class="relative size-32 shrink-0 rounded-full object-cover sm:size-40"
        >
      </div>
      <div class="text-2xl font-bold leading-tight tracking-tight text-highlighted sm:text-3xl">
        <h1 class="space-y-1">
          <span class="block">{{ copy.headingLine1 || "Hi, I'm Saroj Poudel." }}</span>
          <span class="block">{{ copy.headingLine2 || "I'm a full-stack developer and designer based in Kathmandu, Nepal." }}</span>
        </h1>
      </div>
      <p class="max-w-2xl font-mono text-base leading-7 text-muted">
        {{ copy.description || "I focus on creating digital experiences that are intuitive, enjoyable, and effective. I've been building things with Vue, Drizzle, and Nuxt, combining design sense with strong engineering to deliver practical solutions." }} Explore my
        <NuxtLink
          to="/projects"
          class="text-highlighted underline decoration-primary/70 underline-offset-4 hover:text-primary hover:decoration-primary"
        >projects</NuxtLink><span v-if="hasPosts">
          and read my
          <NuxtLink
            to="/blogs"
            class="text-highlighted underline decoration-primary/70 underline-offset-4 hover:text-primary hover:decoration-primary"
          >blog</NuxtLink>.
        </span><span v-else>.</span>
      </p>
      <UButton
        to="/contact"
        color="primary"
        variant="solid"
        size="lg"
        class="accent-bloom"
      >
        {{ copy.button || 'Get in touch' }}
        <template #trailing>
          <UIcon name="i-lucide-arrow-right" />
        </template>
      </UButton>
    </section>

    <section
      v-if="hasPosts"
      class="py-10 sm:py-14"
    >
      <div class="mb-6 flex items-end justify-between">
        <div>
          <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {{ blogsEyebrow }}
          </p>
          <h2 class="text-2xl font-bold tracking-tight text-highlighted sm:text-3xl">
            {{ blogsHeading }}
          </h2>
        </div>
        <UButton
          to="/blogs"
          variant="ghost"
          color="neutral"
        >
          {{ copy.blogsLink || 'See all' }}
        </UButton>
      </div>
      <div class="space-y-4">
        <Motion
          v-for="(post, index) in recentPosts"
          :key="post.slug"
          as="article"
          :while-hover="{ y: -2 }"
          :while-press="{ scale: 0.985 }"
          :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
        >
          <NuxtLink
            :to="`/blogs/${post.slug}`"
            prefetch-on="visibility"
            :aria-label="`Read ${post.title}`"
            class="group block rounded-xl border border-default bg-elevated/30 transition-colors hover:border-primary/30 hover:bg-elevated/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div class="flex gap-4 p-5 sm:gap-6 sm:p-6">
              <span class="hidden shrink-0 pt-1 font-mono text-xs tabular-nums text-primary/70 sm:block">{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="min-w-0 flex-1 space-y-3">
                <div class="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted">
                  <UBadge
                    color="primary"
                    variant="subtle"
                    size="sm"
                  >
                    {{ formatLabel(post.postFormat || 'standard') }}
                  </UBadge>
                  <time :datetime="new Date(post.createdAt).toISOString()">{{ formatDate(post.createdAt) }}</time>
                  <span
                    v-if="post.category"
                    class="text-primary/80"
                  >{{ post.category.title }}</span>
                  <span
                    v-if="index === 0"
                    class="text-primary"
                  >Featured</span>
                </div>
                <h3 class="text-xl font-semibold tracking-tight text-highlighted transition-colors group-hover:text-primary sm:text-2xl">
                  {{ post.title }}
                </h3>
                <p
                  v-if="post.summary"
                  class="max-w-2xl font-mono text-sm leading-7 text-muted"
                >
                  {{ post.summary }}
                </p>
              </div>
              <span class="mt-1 inline-flex shrink-0 items-center gap-2 self-start text-xs font-medium text-muted transition-colors group-hover:text-primary">
                {{ copy.blogCardLink || 'Read' }}
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="size-4"
                  aria-hidden="true"
                />
              </span>
            </div>
          </NuxtLink>
        </Motion>
      </div>
    </section>

    <section class="py-10 sm:py-14">
      <div class="flex items-end justify-between">
        <div>
          <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {{ copy.projectsEyebrow || 'Selected work' }}
          </p>
          <h2 class="text-2xl font-bold tracking-tight text-highlighted sm:text-3xl">
            {{ copy.projectsHeading || 'Projects' }}
          </h2>
        </div>
        <UButton
          to="/projects"
          variant="ghost"
          color="neutral"
        >
          {{ copy.projectsLink || 'See all' }}
        </UButton>
      </div>
      <div
        v-if="featuredProjects.length"
        class="mt-6 space-y-4"
      >
        <Motion
          v-for="project in featuredProjects"
          :key="project.slug"
          as="article"
          :while-hover="{ y: -2 }"
          :while-press="{ scale: 0.985 }"
          :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
        >
          <NuxtLink
            :to="`/projects/${project.slug}`"
            prefetch-on="visibility"
            :aria-label="`View ${project.title} project case study`"
            class="group block overflow-hidden rounded-2xl border border-default bg-elevated/50 transition-colors hover:border-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div class="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div class="relative aspect-[16/10] min-h-48 overflow-hidden bg-zinc-950 md:aspect-auto md:h-full">
                <NuxtImg
                  v-if="project.imageUrl"
                  :src="project.imageUrl"
                  :alt="`${project.title} project preview`"
                  width="960"
                  height="640"
                  sizes="sm:100vw md:58vw lg:600px"
                  format="webp"
                  quality="78"
                  loading="lazy"
                  decoding="async"
                  :style="{ viewTransitionName: `project-cover-${project.slug}` }"
                  class="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
                <div
                  v-else
                  class="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.22),transparent_55%)]"
                >
                  <UIcon
                    name="i-lucide-panels-top-left"
                    class="size-12 text-primary"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div class="flex flex-col items-start justify-center p-6 sm:p-8 lg:p-10">
                <div class="mb-5 flex w-full items-center justify-between gap-3">
                  <UBadge
                    color="primary"
                    variant="subtle"
                  >{{ project.type?.title || 'Featured project' }}</UBadge>
                  <time
                    :datetime="new Date(project.createdAt).toISOString()"
                    class="font-mono text-xs text-muted"
                  >{{ year(project.createdAt) }}</time>
                </div>
                <h3 class="line-clamp-3 text-2xl font-bold tracking-tight text-highlighted transition-colors group-hover:text-primary sm:text-3xl">{{ project.title }}</h3>
                <p
                  v-if="project.summary"
                  class="mt-4 line-clamp-3 font-mono text-sm leading-7 text-muted"
                >{{ project.summary }}</p>
                <span class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors group-hover:text-primary">
                  {{ copy.projectCardLink || 'View case study' }}
                  <UIcon
                    name="i-lucide-arrow-up-right"
                    class="size-4"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </NuxtLink>
        </Motion>
      </div>
      <p
        v-else
        class="mt-6 rounded-xl border border-default bg-elevated/40 p-5 text-sm text-muted"
      >
        {{ copy.projectsEmpty || 'New projects are on the way.' }}
      </p>
    </section>
    <LazyContactCta hydrate-on-visible />
  </PublicPageMotion>
</template>
