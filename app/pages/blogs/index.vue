<script setup lang="ts">
import { blogPostFormats, type BlogPostFormat } from '../../utils/blog-post-formats'

interface BlogPost {
  slug: string
  title: string
  summary: string
  imageUrl: string | null
  createdAt: string | number
  postFormat: BlogPostFormat
  category?: { title: string, slug: string } | null
  tags?: { title: string, slug: string }[]
}

interface PaginatedResponse<T> { items: T[], page: number, totalPages: number }
const route = useRoute()
const router = useRouter()
const requestFetch = useRequestFetch()
// Independent requests start together so server rendering waits for one round trip instead of several.
const [{ data: response, pending, error }, { data: page }] = await Promise.all([
  useFetch<PaginatedResponse<BlogPost>>('/api/blogs', { query: { page: 1 }, default: () => ({ items: [], page: 1, totalPages: 1 }) }),
  useFetch<{ content: Record<string, string>, seoTitle: string, seoDescription: string }>('/api/pages/blogs')
])
const { data: allPosts, error: allPostsError } = await useAsyncData('all-blog-posts-for-client-filter', async () => {
  const firstPage = response.value
  if (!firstPage) return []
  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
      requestFetch<PaginatedResponse<BlogPost>>('/api/blogs', { query: { page: index + 2 } })
    )
  )
  return [...firstPage.items, ...remainingPages.flatMap(page => page.items)]
}, { watch: [response] })
const posts = computed(() => allPosts.value ?? response.value?.items ?? [])
const searchText = ref('')
const selectedFormat = ref(typeof route.query.format === 'string' ? route.query.format : '')
const selectedCategory = ref(typeof route.query.category === 'string' ? route.query.category : '')
const selectedTag = ref(typeof route.query.tag === 'string' ? route.query.tag : '')
const categories = computed(() => [...new Map(posts.value.flatMap(post => post.category ? [[post.category.slug, post.category] as const] : [])).values()].sort((a, b) => a.title.localeCompare(b.title)))
const filteredPosts = computed(() => {
  const term = searchText.value.trim().toLocaleLowerCase()
  return posts.value.filter((post) => {
    const searchableText = `${post.title} ${post.summary} ${post.category?.title || ''} ${(post.tags || []).map(tag => tag.title).join(' ')}`.toLocaleLowerCase()
    const matchesText = !term || searchableText.includes(term)
    const matchesFormat = !selectedFormat.value || (post.postFormat || 'standard') === selectedFormat.value
    const matchesCategory = !selectedCategory.value || post.category?.slug === selectedCategory.value
    const matchesTag = !selectedTag.value || post.tags?.some(tag => tag.slug === selectedTag.value)
    return matchesText && matchesFormat && matchesCategory && matchesTag
  })
})
const postsPerPage = 10
const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / postsPerPage)))
const currentPage = computed(() => Math.min(Math.max(1, Number(route.query.page) || 1), totalPages.value))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  return filteredPosts.value.slice(start, start + postsPerPage)
})
watch([searchText, selectedFormat, selectedCategory, selectedTag], () => {
  const query = { ...route.query }
  delete query.page
  if (selectedFormat.value) query.format = selectedFormat.value
  else delete query.format
  if (selectedCategory.value) query.category = selectedCategory.value
  else delete query.category
  if (selectedTag.value) query.tag = selectedTag.value
  else delete query.tag
  void router.replace({ path: route.path, query })
})
const copy = computed(() => page.value?.content || {})
const siteOrigin = useSiteOrigin()
usePageSeo(() => ({
  title: page.value?.seoTitle || 'Blog — Saroj Poudel',
  description: page.value?.seoDescription || 'Notes, ideas, and things I have learned while building for the web.',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': page.value?.seoTitle || 'Blog — Saroj Poudel',
    'description': page.value?.seoDescription || 'Notes, ideas, and things I have learned while building for the web.',
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': filteredPosts.value.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `${siteOrigin}/blogs/${post.slug}`,
        'name': post.title
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
</script>

<template>
  <PublicPageMotion
    preset="blog-list"
    class="block space-y-12 py-8 sm:py-12"
  >
    <header class="flex max-w-2xl items-end justify-between gap-4">
      <div class="space-y-5">
        <p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {{ copy.eyebrow || 'Blog' }}
        </p>
        <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
          {{ copy.heading || 'Blog' }}
        </h1>
        <p class="font-mono text-base leading-7 text-muted">
          {{ copy.description }}
        </p>
      </div>
      <a
        href="/feed.xml"
        class="mb-1 inline-flex shrink-0 items-center gap-2 rounded-lg border border-default px-3 py-2 text-xs text-muted transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      ><UIcon
        name="i-lucide-rss"
        class="size-4"
      />RSS</a>
    </header>

    <section
      aria-label="Recent blog posts"
      class="space-y-4"
    >
      <div
        v-if="!pending && !error && !allPostsError && posts.length"
        class="grid gap-3 sm:grid-cols-3"
      >
        <label
          class="sr-only"
          for="blog-search"
        >Search blog posts</label>
        <input
          id="blog-search"
          v-model="searchText"
          type="search"
          placeholder="Search blog posts…"
          class="min-h-11 rounded-lg border border-default bg-elevated/40 px-3 text-sm text-highlighted outline-none transition-colors placeholder:text-muted focus:border-primary"
        >
        <label
          class="sr-only"
          for="blog-format-filter"
        >Filter by post format</label>
        <select
          id="blog-format-filter"
          v-model="selectedFormat"
          class="min-h-11 rounded-lg border border-default bg-elevated/40 px-3 text-sm text-highlighted outline-none transition-colors focus:border-primary"
        >
          <option value="">
            All post formats
          </option>
          <option
            v-for="format in blogPostFormats"
            :key="format.value"
            :value="format.value"
          >
            {{ format.label }}
          </option>
        </select>
        <label
          class="sr-only"
          for="blog-category-filter"
        >Filter by category</label>
        <select
          id="blog-category-filter"
          v-model="selectedCategory"
          class="min-h-11 rounded-lg border border-default bg-elevated/40 px-3 text-sm text-highlighted outline-none transition-colors focus:border-primary"
        >
          <option value="">
            All categories
          </option>
          <option
            v-for="category in categories"
            :key="category.slug"
            :value="category.slug"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
      <div
        v-if="pending"
        class="rounded-xl border border-default bg-elevated/40 p-6 text-sm text-muted"
      >
        Loading articles…
      </div>
      <div
        v-else-if="error || allPostsError"
        class="rounded-xl border border-default bg-elevated/40 p-6 text-sm text-muted"
      >
        Articles are temporarily unavailable.
      </div>
      <div
        v-else-if="!posts?.length"
        class="rounded-xl border border-default bg-elevated/40 p-8 text-center text-sm text-muted"
      >
        No published articles yet.
      </div>
      <div
        v-else-if="!filteredPosts.length"
        class="rounded-xl border border-default bg-elevated/40 p-8 text-center text-sm text-muted"
      >
        No blog posts match these filters.
      </div>
      <p
        v-if="filteredPosts.length"
        class="text-xs text-muted"
        aria-live="polite"
      >
        Showing {{ (currentPage - 1) * postsPerPage + 1 }}–{{ Math.min(currentPage * postsPerPage, filteredPosts.length) }} of {{ filteredPosts.length }} blog posts
      </p>

      <Motion
        v-for="(post, index) in paginatedPosts"
        :key="post.slug"
        as="div"
        :while-hover="{ y: -2 }"
        :while-press="{ scale: 0.985 }"
        :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
      >
        <NuxtLink
          prefetch-on="visibility"
          :to="`/blogs/${post.slug}`"
          :aria-label="`Read blog post: ${post.title}`"
          :title="`Read ${post.title}`"
          class="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <UCard
            class="bg-elevated/50 transition-colors group-hover:bg-elevated"
            :ui="{ body: 'p-6 sm:p-8' }"
          >
            <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div
                v-if="post.imageUrl"
                class="overflow-hidden rounded-lg sm:order-2 sm:w-48"
              >
                <NuxtImg
                  :src="post.imageUrl"
                  alt=""
                  width="768"
                  height="480"
                  sizes="sm:100vw md:192px"
                  format="webp"
                  quality="76"
                  :loading="currentPage === 1 && index === 0 ? 'eager' : 'lazy'"
                  :fetchpriority="currentPage === 1 && index === 0 ? 'high' : 'auto'"
                  decoding="async"
                  :style="{ viewTransitionName: `blog-cover-${post.slug}` }"
                  class="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
              </div>
              <div class="max-w-2xl space-y-4">
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
                    v-if="currentPage === 1 && index === 0"
                    class="text-primary"
                  >Featured</span>
                </div>
                <h2 class="text-xl font-semibold tracking-tight text-highlighted transition-colors group-hover:text-primary sm:text-2xl">
                  {{ post.title }}
                </h2>
                <p
                  v-if="post.summary"
                  class="font-mono text-sm leading-7 text-muted"
                >
                  {{ post.summary }}
                </p>
              </div>
              <span
                class="inline-flex shrink-0 items-center gap-2 text-sm text-muted transition-colors group-hover:text-primary sm:order-3"
              >
                Read
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="size-4"
                />
              </span>
            </div>
          </UCard>
        </NuxtLink>
      </Motion>
      <ContentPagination
        v-if="filteredPosts.length"
        :page="currentPage"
        :total-pages="totalPages"
      />
    </section>
    <LazyContactCta hydrate-on-visible />
  </PublicPageMotion>
</template>
