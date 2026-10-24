<script setup lang="ts">
interface ProjectRecord {
  slug: string
  title: string
  summary: string
  imageUrl: string | null
  createdAt: string | number
  type?: { title: string, slug: string } | null
}

interface ProjectType { title: string, slug: string }
interface PaginatedResponse<T> { items: T[], page: number, totalPages: number }
const route = useRoute()
const router = useRouter()
const requestFetch = useRequestFetch()
// Independent requests start together so server rendering waits for one round trip instead of several.
const [{ data: response, pending, error }, { data: typeResponse, error: typeError }, { data: page }] = await Promise.all([
  useFetch<PaginatedResponse<ProjectRecord>>('/api/projects', { query: { page: 1, pageSize: 50 }, default: () => ({ items: [], page: 1, totalPages: 1 }) }),
  useFetch<PaginatedResponse<ProjectType>>('/api/project-types', { query: { pageSize: 50 }, default: () => ({ items: [], page: 1, totalPages: 1 }) }),
  useFetch<{ content: Record<string, string>, seoTitle: string, seoDescription: string }>('/api/pages/projects')
])
const [{ data: allProjects, error: allProjectsError }, { data: allProjectTypes, error: allTypesError }] = await Promise.all([
  useAsyncData('all-projects-for-client-filter', async () => {
    const firstPage = response.value
    if (!firstPage) return []
    const remainingPages = await Promise.all(
      Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
        requestFetch<PaginatedResponse<ProjectRecord>>('/api/projects', { query: { page: index + 2, pageSize: 50 } })
      )
    )
    return [...firstPage.items, ...remainingPages.flatMap(page => page.items)]
  }, { watch: [response] }),
  useAsyncData('all-project-types-for-client-filter', async () => {
    const firstPage = typeResponse.value
    if (!firstPage) return []
    const remainingPages = await Promise.all(
      Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
        requestFetch<PaginatedResponse<ProjectType>>('/api/project-types', { query: { page: index + 2, pageSize: 50 } })
      )
    )
    return [...firstPage.items, ...remainingPages.flatMap(page => page.items)]
  }, { watch: [typeResponse] })
])
const projects = computed(() => allProjects.value ?? response.value?.items ?? [])
const searchText = ref('')
const selectedType = ref('')
const filteredProjects = computed(() => {
  const term = searchText.value.trim().toLocaleLowerCase()
  return projects.value.filter((project) => {
    const matchesText = !term || `${project.title} ${project.summary}`.toLocaleLowerCase().includes(term)
    const matchesType = !selectedType.value || project.type?.slug === selectedType.value
    return matchesText && matchesType
  })
})
const projectsPerPage = 10
const totalPages = computed(() => Math.max(1, Math.ceil(filteredProjects.value.length / projectsPerPage)))
const currentPage = computed(() => Math.min(Math.max(1, Number(route.query.page) || 1), totalPages.value))
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * projectsPerPage
  return filteredProjects.value.slice(start, start + projectsPerPage)
})
watch([searchText, selectedType], () => {
  if (route.query.page) {
    const query = { ...route.query }
    delete query.page
    void router.replace({ path: route.path, query })
  }
})
const copy = computed(() => page.value?.content || {})
const siteOrigin = useSiteOrigin()
usePageSeo(() => ({
  title: page.value?.seoTitle || 'Projects — Saroj Poudel',
  description: page.value?.seoDescription || 'Selected digital products, websites, and creative work by Saroj Poudel.',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': page.value?.seoTitle || 'Projects — Saroj Poudel',
    'description': page.value?.seoDescription || 'Selected digital products, websites, and creative work by Saroj Poudel.',
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': filteredProjects.value.slice(0, 10).map((project, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `${siteOrigin}/projects/${project.slug}`,
        'name': project.title,
        'image': project.imageUrl ? new URL(project.imageUrl, siteOrigin).href : undefined
      }))
    }
  }
}))

function year(value: string | number) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'UTC' }).format(new Date(value))
}
</script>

<template>
  <PublicPageMotion
    preset="project-list"
    class="block space-y-12 py-8 sm:py-12"
  >
    <header class="max-w-2xl space-y-5">
      <p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
        {{ copy.eyebrow || 'Selected work' }}
      </p>
      <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
        {{ copy.heading || 'Projects' }}
      </h1>
      <p class="font-mono text-base leading-7 text-muted">
        {{ copy.description }}
      </p>
    </header>

    <section
      aria-label="Selected projects"
      class="space-y-5"
    >
      <div
        v-if="!pending && !error && projects.length"
        class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_14rem]"
      >
        <label
          class="sr-only"
          for="project-search"
        >Search projects</label>
        <input
          id="project-search"
          v-model="searchText"
          type="search"
          placeholder="Search projects…"
          class="min-h-11 rounded-lg border border-default bg-elevated/40 px-3 text-sm text-highlighted outline-none transition-colors placeholder:text-muted focus:border-primary"
        >
        <label
          class="sr-only"
          for="project-type-filter"
        >Filter by work type</label>
        <select
          id="project-type-filter"
          v-model="selectedType"
          class="min-h-11 rounded-lg border border-default bg-elevated/40 px-3 text-sm text-highlighted outline-none transition-colors focus:border-primary"
        >
          <option value="">
            All work types
          </option>
          <option
            v-for="type in allProjectTypes || typeResponse?.items || []"
            :key="type.slug"
            :value="type.slug"
          >
            {{ type.title }}
          </option>
        </select>
      </div>
      <div
        v-if="pending"
        class="rounded-xl border border-default bg-elevated/40 p-6 text-sm text-muted"
      >
        Loading projects…
      </div>
      <div
        v-else-if="error || allProjectsError"
        class="rounded-xl border border-default bg-elevated/40 p-6 text-sm text-muted"
      >
        Projects are temporarily unavailable.
      </div>
      <div
        v-else-if="!projects?.length"
        class="rounded-xl border border-default bg-elevated/40 p-8 text-center text-sm text-muted"
      >
        No published projects yet.
      </div>
      <p
        v-if="typeError || allTypesError"
        role="alert"
        class="text-sm text-error"
      >
        Work-type filters are temporarily unavailable.
      </p>
      <div
        v-if="!pending && !error && !allProjectsError && projects.length && !filteredProjects.length"
        class="rounded-xl border border-default bg-elevated/40 p-8 text-center text-sm text-muted"
      >
        No projects match these filters.
      </div>

      <p
        v-if="filteredProjects.length"
        class="text-xs text-muted"
        aria-live="polite"
      >
        Showing {{ (currentPage - 1) * projectsPerPage + 1 }}–{{ Math.min(currentPage * projectsPerPage, filteredProjects.length) }} of {{ filteredProjects.length }} projects
      </p>

      <Motion
        v-for="(project, index) in paginatedProjects"
        :key="project.slug"
        as="div"
        :while-hover="{ y: -2 }"
        :while-press="{ scale: 0.985 }"
        :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
      >
        <NuxtLink
          :to="`/projects/${project.slug}`"
          prefetch-on="visibility"
          :aria-label="`View project case study: ${project.title}`"
          :title="`View ${project.title}`"
          class="group block overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <article class="grid overflow-hidden rounded-xl border border-default bg-elevated/50 transition-colors group-hover:bg-elevated md:grid-cols-2">
            <div class="relative aspect-[16/10] min-h-48 overflow-hidden border-b border-default bg-zinc-950 md:aspect-auto md:border-b-0 md:border-r md:h-full">
              <NuxtImg
                v-if="project.imageUrl"
                :src="project.imageUrl"
                :alt="project.title"
                width="960"
                height="640"
                sizes="sm:100vw md:50vw"
                format="webp"
                quality="78"
                :loading="index === 0 ? 'eager' : 'lazy'"
                :fetchpriority="index === 0 ? 'high' : 'auto'"
                decoding="async"
                :style="{ viewTransitionName: `project-cover-${project.slug}` }"
                class="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              />
              <div
                v-else
                class="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.22),transparent_55%)]"
              >
                <div class="flex size-24 items-center justify-center rounded-3xl border border-white/10 bg-zinc-900/70 text-primary shadow-2xl shadow-black/30">
                  <UIcon
                    name="i-lucide-panels-top-left"
                    class="size-10"
                  />
                </div>
              </div>
              <span class="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">{{ String((currentPage - 1) * projectsPerPage + index + 1).padStart(2, '0') }}</span>
            </div>

            <div class="flex flex-col items-start p-6 sm:p-8 lg:p-10">
              <div class="mb-5 flex w-full items-center justify-between gap-3">
                <UBadge
                  color="primary"
                  variant="subtle"
                >{{ project.type?.title || 'Featured project' }}</UBadge>
                <span class="font-mono text-xs text-muted">{{ year(project.createdAt) }}</span>
              </div>
              <h2 class="line-clamp-3 text-2xl font-bold tracking-tight text-highlighted transition-colors group-hover:text-primary sm:text-3xl">{{ project.title }}</h2>
              <p
                v-if="project.summary"
                class="mt-4 line-clamp-3 font-mono text-sm leading-7 text-muted"
              >{{ project.summary }}</p>
              <span class="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-primary">View case study <UIcon
                name="i-lucide-arrow-up-right"
                class="size-4"
              /></span>
            </div>
          </article>
        </NuxtLink>
      </Motion>
      <ContentPagination
        v-if="filteredProjects.length"
        :page="currentPage"
        :total-pages="totalPages"
      />
    </section>
    <LazyContactCta hydrate-on-visible />
  </PublicPageMotion>
</template>
