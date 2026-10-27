<script setup lang="ts">
import { contentBlockHeadingId, readContentBlockDocument } from '#shared/content-blocks'

interface ProjectRecord {
  title: string
  slug: string
  summary: string
  seoTitle: string
  seoDescription: string
  content: string
  imageUrl: string | null
  createdAt: string | number
  type?: { title: string, slug: string } | null
  previous?: { slug: string, title: string } | null
  next?: { slug: string, title: string } | null
  related?: { slug: string, title: string, summary: string, imageUrl: string | null, createdAt: string | number }[]
}

const route = useRoute()
const siteOrigin = useSiteOrigin()
const { data: project, error } = await useFetch<ProjectRecord>(() => `/api/projects/${encodeURIComponent(String(route.params.slug))}`)
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || 'Could not load this project.'
  })
}
const blockDocument = computed(() => readContentBlockDocument(project.value?.content || ''))
const sections = computed(() => blockDocument.value?.blocks.flatMap((block, index) =>
  block.type === 'heading'
    ? [{ id: contentBlockHeadingId(block.text, index), title: block.text, level: block.level }]
    : []
) || [])

usePageSeo(() => {
  if (!project.value) return { title: 'Projects — Saroj Poudel', description: '' }

  const pageUrl = `${siteOrigin}/projects/${project.value.slug}`
  const image = project.value.imageUrl
    ? new URL(project.value.imageUrl, siteOrigin).href
    : `${siteOrigin}/social-card.png`

  return {
    title: project.value.seoTitle || project.value.title,
    description: project.value.seoDescription || project.value.summary || '',
    image: project.value.imageUrl || '/social-card.png',
    imageAlt: `${project.value.title} — project cover`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${pageUrl}#creative-work`,
        'name': project.value.title,
        'headline': project.value.title,
        'description': project.value.seoDescription || project.value.summary,
        'url': pageUrl,
        'mainEntityOfPage': pageUrl,
        'image': image,
        'dateCreated': new Date(project.value.createdAt).toISOString(),
        'creator': { '@id': `${siteOrigin}/#person` },
        'author': { '@id': `${siteOrigin}/#person` },
        'genre': project.value.type?.title,
        'inLanguage': 'en'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${siteOrigin}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Projects', 'item': `${siteOrigin}/projects` },
          { '@type': 'ListItem', 'position': 3, 'name': project.value.title, 'item': pageUrl }
        ]
      }
    ]
  }
})
</script>

<template>
  <PublicPageMotion
    preset="project"
    class="block"
  >
    <article
      v-if="project"
      id="project-case-study"
      class="-mt-5 pb-8 sm:-mt-8 sm:pb-10"
    >
      <header class="mx-auto max-w-6xl px-4 pb-8 pt-7 sm:px-7 sm:pb-12 sm:pt-10 lg:px-10 lg:pb-16">
        <nav
          aria-label="Breadcrumb"
          class="font-mono text-xs text-muted"
        >
          <ol class="flex flex-wrap items-center gap-2">
            <li>
              <NuxtLink
                prefetch-on="visibility"
                to="/"
                class="transition-colors hover:text-primary"
              >
                Home
              </NuxtLink>
            </li>
            <li
              aria-hidden="true"
              class="text-dimmed"
            >
              /
            </li>
            <li>
              <NuxtLink
                prefetch-on="visibility"
                to="/projects"
                class="transition-colors hover:text-primary"
              >
                Projects
              </NuxtLink>
            </li>
            <li
              aria-hidden="true"
              class="text-dimmed"
            >
              /
            </li>
            <li class="truncate text-highlighted">
              <span aria-current="page">{{ project.title }}</span>
            </li>
          </ol>
        </nav>

        <div class="mt-10 lg:mt-16">
          <div class="max-w-4xl">
            <p class="mb-5 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              <span
                class="size-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              {{ project.type?.title || 'Selected project' }}
            </p>
            <h1 class="text-3xl font-bold tracking-tight text-highlighted sm:text-5xl">
              {{ project.title }}
            </h1>
            <p
              v-if="project.summary"
              class="mt-6 max-w-3xl font-mono text-base leading-7 text-muted sm:mt-8 sm:text-lg"
            >
              {{ project.summary }}
            </p>
            <div class="mt-5 flex flex-wrap items-center gap-2 sm:mt-6">
              <details
                v-if="sections.length"
                class="group relative"
              >
                <summary class="inline-flex min-h-9 cursor-pointer list-none items-center gap-2 rounded-lg border border-default px-3 py-2 text-sm text-muted transition-colors hover:bg-elevated hover:text-highlighted [&::-webkit-details-marker]:hidden">
                  <UIcon
                    name="i-lucide-list"
                    class="size-4"
                  />
                  Contents
                  <UIcon
                    name="i-lucide-chevron-down"
                    class="size-3.5 transition-transform group-open:rotate-180"
                  />
                </summary>
                <nav
                  aria-label="Table of contents"
                  class="absolute left-0 top-full z-20 mt-2 max-h-72 w-72 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-default bg-default p-2 shadow-xl"
                >
                  <a
                    v-for="section in sections"
                    :key="section.id"
                    :href="`#${section.id}`"
                    class="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-elevated hover:text-highlighted"
                    :class="section.level === 3 ? 'pl-6 text-xs' : ''"
                  >
                    {{ section.title }}
                  </a>
                </nav>
              </details>

              <ContentShareActions
                :title="project.title"
                :text="project.summary"
              />
            </div>
          </div>
        </div>

        <Motion
          v-if="project.imageUrl"
          as="figure"
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }"
          class="group relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#101115] shadow-2xl shadow-black/20 sm:mt-14 sm:rounded-[1.75rem]"
        >
          <div class="flex h-10 items-center gap-2 border-b border-white/[0.07] px-4 sm:h-12 sm:px-5">
            <span
              class="size-2.5 rounded-full bg-red-400/80"
              aria-hidden="true"
            />
            <span
              class="size-2.5 rounded-full bg-amber-300/70"
              aria-hidden="true"
            />
            <span
              class="size-2.5 rounded-full bg-emerald-400/70"
              aria-hidden="true"
            />
            <span class="ml-3 truncate font-mono text-[10px] tracking-wide text-zinc-500">PROJECT / {{ project.slug }}</span>
          </div>
          <div class="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,rgba(239,68,68,0.13),transparent_60%)]">
            <NuxtImg
              :src="project.imageUrl"
              :alt="`${project.title} — project cover`"
              width="1600"
              height="1000"
              sizes="sm:100vw md:100vw lg:1200px"
              format="webp"
              quality="82"
              fetchpriority="high"
              decoding="async"
              :style="{ viewTransitionName: `project-cover-${project.slug}` }"
              class="block h-auto w-full shadow-2xl shadow-black/40 transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            />
            <span class="pointer-events-none absolute bottom-5 right-5 hidden rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/70 backdrop-blur sm:block">Project cover</span>
          </div>
        </Motion>
      </header>

      <section
        class="border-y border-default"
        aria-label="Project details and navigation"
      >
        <aside class="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-7 sm:py-10 lg:px-10">
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Project details
            </p>
            <dl class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt class="text-xs text-muted">
                  Discipline
                </dt>
                <dd class="mt-1 text-sm font-medium text-highlighted">
                  {{ project.type?.title || 'Digital experience' }}
                </dd>
              </div>
              <div>
                <dt class="text-xs text-muted">
                  Story format
                </dt>
                <dd class="mt-1 text-sm font-medium text-highlighted">
                  Project case study
                </dd>
              </div>
              <div>
                <dt class="text-xs text-muted">
                  Created by
                </dt>
                <dd class="mt-1 text-sm font-medium text-highlighted">
                  Saroj Poudel
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <section
        id="project-story"
        class="scroll-mt-24"
        aria-label="Project story"
      >
        <div class="mx-auto max-w-6xl px-4 py-8 sm:px-7 sm:py-12 lg:px-10 lg:py-14">
          <div class="min-w-0">
            <RichContent
              v-if="project.content"
              :content="project.content"
              label="Project story gallery"
            />
            <p
              v-else
              class="text-sm text-muted"
            >
              This project does not have any additional details yet.
            </p>
          </div>
        </div>
      </section>

      <div
        v-if="project.previous || project.next"
        class="mx-auto max-w-6xl px-4 sm:px-7 lg:px-10"
      >
        <nav
          aria-label="Adjacent projects"
          class="grid gap-3 border-t border-default py-6 sm:grid-cols-2"
        >
          <Motion
            v-if="project.previous"
            as="div"
            :while-hover="{ x: -2 }"
            :while-press="{ scale: 0.99 }"
            :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
          >
            <NuxtLink
              prefetch-on="visibility"
              :to="`/projects/${project.previous.slug}`"
              class="group block rounded-xl border border-default p-4 transition-colors hover:border-primary/40 hover:bg-elevated/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span class="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors group-hover:text-primary">
                <UIcon
                  name="i-lucide-arrow-left"
                  class="size-3.5"
                  aria-hidden="true"
                />
                Previous project
              </span>
              <span class="mt-2 block font-semibold text-highlighted">{{ project.previous.title }}</span>
            </NuxtLink>
          </Motion>
          <Motion
            v-if="project.next"
            as="div"
            :while-hover="{ x: 2 }"
            :while-press="{ scale: 0.99 }"
            :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
            class="sm:col-start-2"
          >
            <NuxtLink
              prefetch-on="visibility"
              :to="`/projects/${project.next.slug}`"
              class="group block rounded-xl border border-default p-4 text-left transition-colors hover:border-primary/40 hover:bg-elevated/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span class="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors group-hover:text-primary">
                Next project
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-3.5"
                  aria-hidden="true"
                />
              </span>
              <span class="mt-2 block font-semibold text-highlighted">{{ project.next.title }}</span>
            </NuxtLink>
          </Motion>
        </nav>
      </div>

      <div class="mx-auto max-w-6xl px-4 sm:px-7 lg:px-10">
        <LazyContactCta hydrate-on-visible />
      </div>
    </article>
  </PublicPageMotion>
</template>
