<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
interface ContentRow { id: string, title: string, slug: string, summary: string, imageUrl: string | null, status: string, createdAt: string | number }
interface PaginatedRows { items: ContentRow[], page: number, pageSize: number, totalPages: number }
const route = useRoute()
const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const pageSize = computed(() => [10, 25, 50, 100].includes(Number(route.query.pageSize)) ? Number(route.query.pageSize) : 10)
const { data: response, pending, error, refresh } = await useFetch<PaginatedRows>('/api/admin/projects', { query: computed(() => ({ page: page.value, pageSize: pageSize.value })) })
const projects = computed(() => response.value?.items ?? [])
const actionError = ref('')
const deleting = ref<string | null>(null)
const dateLabel = (date: string | number) => new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(date))

async function removeProject(project: ContentRow) {
  if (!window.confirm(`Delete “${project.title}”? This cannot be undone.`)) return
  actionError.value = ''
  deleting.value = project.id
  try {
    await $fetch(`/api/admin/projects/${encodeURIComponent(project.slug)}`, { method: 'DELETE' })
    await refresh()
  } catch (requestError) {
    actionError.value = (requestError as { data?: { statusMessage?: string } }).data?.statusMessage || 'Could not delete this project.'
  } finally {
    deleting.value = null
  }
}
</script>

<template>
  <AdminShell>
    <AdminPageHeader
      eyebrow="Content"
      title="Projects"
      description="Manage featured work and project drafts."
    >
      <template #actions>
        <UButton
          to="/admin/projects/create"
          icon="i-lucide-plus"
        >
          Create project
        </UButton>
      </template>
    </AdminPageHeader>
    <div class="space-y-5">
      <UAlert
        v-if="actionError"
        role="alert"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
        :title="actionError"
      />
      <UAlert
        v-if="error && !pending"
        role="alert"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
        title="Could not load projects."
      />
      <AdminSection v-else>
        <UEmpty
          v-if="pending"
          variant="naked"
          loading
          title="Loading projects…"
        />
        <UEmpty
          v-else-if="!projects.length"
          variant="naked"
          icon="i-lucide-panels-top-left"
          title="No projects yet"
          description="Add your first project to get started."
          :actions="[{ label: 'Create project', to: '/admin/projects/create', trailingIcon: 'i-lucide-arrow-right', color: 'neutral', variant: 'outline' }]"
        />
        <div v-else>
          <div class="hidden grid-cols-[minmax(0,1fr)_120px_140px_170px] gap-4 border-b border-default pb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-dimmed sm:grid">
            <span>Project</span><span>Status</span><span>Created</span><span>Actions</span>
          </div>
          <ul class="divide-y divide-default">
            <li
              v-for="project in projects"
              :key="project.id"
              class="grid gap-3 py-4 last:pb-0 sm:grid-cols-[minmax(0,1fr)_120px_140px_170px] sm:items-center sm:gap-4"
            >
              <div class="flex min-w-0 items-center gap-3">
                <img
                  v-if="project.imageUrl"
                  :src="project.imageUrl"
                  alt=""
                  class="size-12 shrink-0 rounded-lg border border-default object-cover"
                >
                <span
                  v-else
                  class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-elevated text-dimmed"
                >
                  <UIcon
                    name="i-lucide-panels-top-left"
                    class="size-5"
                  />
                </span>
                <div class="min-w-0">
                  <h2 class="truncate text-sm font-medium text-highlighted">
                    {{ project.title }}
                  </h2>
                  <p class="mt-1 truncate text-xs text-muted">
                    /projects/{{ project.slug }}
                  </p>
                </div>
              </div>
              <UBadge
                :color="project.status === 'published' ? 'success' : 'neutral'"
                :variant="project.status === 'archived' ? 'outline' : 'subtle'"
                class="w-fit capitalize"
              >
                {{ project.status }}
              </UBadge>
              <span class="text-xs text-muted">{{ dateLabel(project.createdAt) }}</span>
              <div class="flex gap-2">
                <UButton
                  :to="`/admin/projects/${project.slug}/edit`"
                  color="neutral"
                  variant="outline"
                  size="sm"
                  icon="i-lucide-pencil"
                >
                  Edit
                </UButton>
                <UButton
                  color="error"
                  variant="subtle"
                  size="sm"
                  icon="i-lucide-trash-2"
                  :loading="deleting === project.id"
                  :disabled="deleting === project.id"
                  @click="removeProject(project)"
                >
                  {{ deleting === project.id ? 'Deleting…' : 'Delete' }}
                </UButton>
              </div>
            </li>
          </ul>
        </div>
      </AdminSection>
      <div
        v-if="response"
        class="flex flex-wrap items-center justify-between gap-4"
      >
        <AdminPageSize :size="response.pageSize" />
        <ContentPagination
          :page="response.page"
          :total-pages="response.totalPages"
        />
      </div>
    </div>
  </AdminShell>
</template>
