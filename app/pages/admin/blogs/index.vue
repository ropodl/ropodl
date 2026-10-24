<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
interface ContentRow { id: string, title: string, slug: string, summary: string, imageUrl: string | null, status: string, createdAt: string | number }
interface PaginatedRows { items: ContentRow[], page: number, pageSize: number, totalPages: number }
const route = useRoute()
const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const pageSize = computed(() => [10, 25, 50, 100].includes(Number(route.query.pageSize)) ? Number(route.query.pageSize) : 10)
const { data: response, pending, error, refresh } = await useFetch<PaginatedRows>('/api/admin/blogs', { query: computed(() => ({ page: page.value, pageSize: pageSize.value })) })
const posts = computed(() => response.value?.items ?? [])
const actionError = ref('')
const deleting = ref<string | null>(null)
const dateLabel = (date: string | number) => new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(date))

async function removePost(post: ContentRow) {
  if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return
  actionError.value = ''
  deleting.value = post.id
  try {
    await $fetch(`/api/admin/blogs/${encodeURIComponent(post.slug)}`, { method: 'DELETE' })
    await refresh()
  } catch (requestError) {
    actionError.value = (requestError as { data?: { statusMessage?: string } }).data?.statusMessage || 'Could not delete this blog post.'
  } finally {
    deleting.value = null
  }
}
</script>

<template>
  <AdminShell>
    <AdminPageHeader
      eyebrow="Content"
      title="Blog posts"
      description="Manage published articles and drafts."
    >
      <template #actions>
        <UButton
          to="/admin/blogs/create"
          icon="i-lucide-plus"
        >
          Create blog post
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
        title="Could not load blog posts."
      />
      <AdminSection v-else>
        <UEmpty
          v-if="pending"
          variant="naked"
          loading
          title="Loading blog posts…"
        />
        <UEmpty
          v-else-if="!posts.length"
          variant="naked"
          icon="i-lucide-notebook-pen"
          title="No blog posts yet"
          description="Create your first article to get started."
          :actions="[{ label: 'Create blog post', to: '/admin/blogs/create', trailingIcon: 'i-lucide-arrow-right', color: 'neutral', variant: 'outline' }]"
        />
        <div v-else>
          <div class="hidden grid-cols-[minmax(0,1fr)_120px_140px_170px] gap-4 border-b border-default pb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-dimmed sm:grid">
            <span>Article</span><span>Status</span><span>Created</span><span>Actions</span>
          </div>
          <ul class="divide-y divide-default">
            <li
              v-for="post in posts"
              :key="post.id"
              class="grid gap-3 py-4 last:pb-0 sm:grid-cols-[minmax(0,1fr)_120px_140px_170px] sm:items-center sm:gap-4"
            >
              <div class="flex min-w-0 items-center gap-3">
                <img
                  v-if="post.imageUrl"
                  :src="post.imageUrl"
                  :alt="`${post.title} thumbnail`"
                  class="size-12 shrink-0 rounded-lg border border-default object-cover"
                >
                <span
                  v-else
                  class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-elevated text-dimmed"
                >
                  <UIcon
                    name="i-lucide-file-text"
                    class="size-5"
                  />
                </span>
                <div class="min-w-0">
                  <h2 class="truncate text-sm font-medium text-highlighted">
                    {{ post.title }}
                  </h2>
                  <p class="mt-1 truncate text-xs text-muted">
                    /blogs/{{ post.slug }}
                  </p>
                </div>
              </div>
              <UBadge
                :color="post.status === 'published' ? 'success' : 'neutral'"
                :variant="post.status === 'archived' ? 'outline' : 'subtle'"
                class="w-fit capitalize"
              >
                {{ post.status }}
              </UBadge>
              <span class="text-xs text-muted">{{ dateLabel(post.createdAt) }}</span>
              <div class="flex gap-2">
                <UButton
                  :to="`/admin/blogs/${post.slug}/edit`"
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
                  :loading="deleting === post.id"
                  :disabled="deleting === post.id"
                  @click="removePost(post)"
                >
                  {{ deleting === post.id ? 'Deleting…' : 'Delete' }}
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
