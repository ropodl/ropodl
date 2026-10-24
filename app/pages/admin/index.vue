<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

interface SiteMetrics {
  since: string
  contactConversions: number
  articleFeedback: {
    yes: number
    no: number
    byArticle: { slug: string, yes: number, no: number }[]
  }
}

const { data: metrics, pending: metricsPending, error: metricsError } = await useFetch<SiteMetrics>('/api/admin/metrics')
</script>

<template>
  <AdminShell>
    <template #default="{ user }">
      <AdminPageHeader
        eyebrow="Project workspace"
        :title="`Welcome back, ${user?.name?.split(' ')[0] || 'there'}`"
        description="Here’s what’s happening with your project."
      >
        <template #actions>
          <UButton
            to="/"
            icon="i-lucide-external-link"
          >
            Open project
          </UButton>
        </template>
      </AdminPageHeader>

      <div class="space-y-9 sm:space-y-11">
        <section
          class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Workspace status"
        >
          <article class="rounded-xl border border-default bg-muted p-4 sm:p-5">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Website</span>
              <span class="flex size-8 items-center justify-center rounded-lg bg-success/10 text-success">
                <UIcon
                  name="i-lucide-globe-2"
                  class="size-4"
                />
              </span>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <span class="size-1.5 rounded-full bg-success" />
              <p class="text-sm font-medium text-highlighted">
                Live
              </p>
            </div>
            <p class="mt-1 text-[11px] text-dimmed">
              Projects are online
            </p>
          </article>
          <article class="rounded-xl border border-default bg-muted p-4 sm:p-5">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Email routing</span>
              <span class="flex size-8 items-center justify-center rounded-lg bg-elevated text-toned">
                <UIcon
                  name="i-lucide-mail"
                  class="size-4"
                />
              </span>
            </div>
            <p class="mt-4 text-sm font-medium text-highlighted">
              hello@ropodl.com
            </p>
            <p class="mt-1 text-[11px] text-dimmed">
              Forwarding is enabled
            </p>
          </article>
          <article class="rounded-xl border border-default bg-muted p-4 sm:p-5">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Image storage</span>
              <span class="flex size-8 items-center justify-center rounded-lg bg-elevated text-toned">
                <UIcon
                  name="i-lucide-images"
                  class="size-4"
                />
              </span>
            </div>
            <p class="mt-4 text-sm font-medium text-highlighted">
              Connected
            </p>
            <p class="mt-1 text-[11px] text-dimmed">
              Project uploads are available
            </p>
          </article>
          <article class="rounded-xl border border-default bg-muted p-4 sm:p-5">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">Signed in as</span>
              <span class="flex size-8 items-center justify-center rounded-lg bg-elevated text-toned">
                <UIcon
                  name="i-lucide-shield-check"
                  class="size-4"
                />
              </span>
            </div>
            <p class="mt-4 truncate text-sm font-medium text-highlighted">
              {{ user?.email }}
            </p>
            <p class="mt-1 text-[11px] text-dimmed">
              Administrator account
            </p>
          </article>
        </section>

        <AdminSection
          title="Site signals"
          description="Anonymous activity from the last 30 days."
          aria-label="Site signals"
        >
          <UEmpty
            v-if="metricsPending"
            variant="naked"
            loading
            title="Loading site metrics…"
          />
          <UAlert
            v-else-if="metricsError"
            role="status"
            color="error"
            variant="subtle"
            icon="i-lucide-circle-alert"
            title="Site metrics are unavailable. Apply the latest database migration to enable them."
          />
          <template v-else-if="metrics">
            <div class="grid gap-5 sm:grid-cols-3">
              <div>
                <p class="text-xs text-muted">
                  Contact messages sent
                </p>
                <p class="mt-2 text-2xl font-semibold text-highlighted">
                  {{ metrics.contactConversions }}
                </p>
              </div>
              <div>
                <p class="text-xs text-muted">
                  Articles marked useful
                </p>
                <p class="mt-2 text-2xl font-semibold text-highlighted">
                  {{ metrics.articleFeedback.yes }}
                </p>
              </div>
              <div>
                <p class="text-xs text-muted">
                  Articles needing work
                </p>
                <p class="mt-2 text-2xl font-semibold text-highlighted">
                  {{ metrics.articleFeedback.no }}
                </p>
              </div>
            </div>
            <ul
              v-if="metrics.articleFeedback.byArticle.length"
              class="divide-y divide-default border-t border-default"
              aria-label="Feedback by article"
            >
              <li
                v-for="article in metrics.articleFeedback.byArticle"
                :key="article.slug"
                class="flex items-center justify-between gap-4 py-3 text-xs last:pb-0"
              >
                <NuxtLink
                  :to="`/blogs/${article.slug}`"
                  class="min-w-0 truncate text-toned hover:text-highlighted"
                >
                  {{ article.slug }}
                </NuxtLink>
                <span class="shrink-0 text-muted">{{ article.yes }} useful · {{ article.no }} not quite</span>
              </li>
            </ul>
          </template>
        </AdminSection>

        <section aria-labelledby="content-heading">
          <div class="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2
                id="content-heading"
                class="text-base font-semibold text-highlighted"
              >
                Create content
              </h2>
              <p class="mt-1 text-xs text-muted">
                Add new articles and projects to your project.
              </p>
            </div>
            <span class="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-dimmed sm:inline">Quick access</span>
          </div>

          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <NuxtLink
              to="/admin/blogs/create"
              class="group rounded-xl border border-default bg-muted p-5 transition-colors hover:border-accented hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div class="flex items-start justify-between">
                <span class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <UIcon
                    name="i-lucide-file-plus-2"
                    class="size-5"
                  />
                </span>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="size-4 text-dimmed transition-colors group-hover:text-toned"
                />
              </div>
              <h3 class="mt-5 text-sm font-semibold text-highlighted">
                New blog post
              </h3>
              <p class="mt-1.5 text-xs leading-5 text-muted">
                Write an article, choose a featured image, and publish it.
              </p>
              <span class="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-toned">Create article <UIcon
                name="i-lucide-arrow-right"
                class="size-3.5 transition-transform group-hover:translate-x-0.5"
              /></span>
            </NuxtLink>
            <NuxtLink
              to="/admin/projects/create"
              class="group rounded-xl border border-default bg-muted p-5 transition-colors hover:border-accented hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div class="flex items-start justify-between">
                <span class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <UIcon
                    name="i-lucide-folder-plus"
                    class="size-5"
                  />
                </span>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="size-4 text-dimmed transition-colors group-hover:text-toned"
                />
              </div>
              <h3 class="mt-5 text-sm font-semibold text-highlighted">
                New project
              </h3>
              <p class="mt-1.5 text-xs leading-5 text-muted">
                Add a project with its own slug and cover image.
              </p>
              <span class="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-toned">Create project <UIcon
                name="i-lucide-arrow-right"
                class="size-3.5 transition-transform group-hover:translate-x-0.5"
              /></span>
            </NuxtLink>
            <NuxtLink
              to="/admin/media"
              class="group rounded-xl border border-default bg-muted p-5 transition-colors hover:border-accented hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div class="flex items-start justify-between">
                <span class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <UIcon
                    name="i-lucide-images"
                    class="size-5"
                  />
                </span>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="size-4 text-dimmed transition-colors group-hover:text-toned"
                />
              </div>
              <h3 class="mt-5 text-sm font-semibold text-highlighted">
                Media library
              </h3>
              <p class="mt-1.5 text-xs leading-5 text-muted">
                Browse and upload images, then reuse them in the visual editor.
              </p>
              <span class="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-toned">Open file explorer <UIcon
                name="i-lucide-arrow-right"
                class="size-3.5 transition-transform group-hover:translate-x-0.5"
              /></span>
            </NuxtLink>
          </div>
        </section>
      </div>
    </template>
  </AdminShell>
</template>
