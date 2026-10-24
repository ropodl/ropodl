<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
interface AuditItem { id: string, action: string, entity: string, entityId: string | null, userEmail: string | null, ipAddress: string | null, createdAt: string | number }
interface AuditPage { items: AuditItem[], page: number, pageSize: number, totalPages: number }
const route = useRoute()
const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const pageSize = computed(() => [10, 25, 50, 100].includes(Number(route.query.pageSize)) ? Number(route.query.pageSize) : 10)
const { data: response, error } = await useFetch<AuditPage>('/api/admin/audit', { query: computed(() => ({ page: page.value, pageSize: pageSize.value })) })
const dateLabel = (value: string | number) => new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
</script>

<template>
  <AdminShell>
    <AdminPageHeader
      eyebrow="System"
      title="Audit log"
      description="Recent changes made by administrators."
    />
    <div class="space-y-5">
      <UAlert
        v-if="error"
        role="alert"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
        title="Could not load audit activity."
      />
      <AdminSection v-else>
        <UEmpty
          v-if="!response?.items.length"
          variant="naked"
          icon="i-lucide-history"
          title="No recorded activity yet."
        />
        <ul
          v-else
          class="divide-y divide-default"
        >
          <li
            v-for="item in response.items"
            :key="item.id"
            class="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)] sm:items-center"
          >
            <time class="text-xs text-muted">{{ dateLabel(item.createdAt) }}</time>
            <p class="text-sm text-highlighted">
              <span class="capitalize">{{ item.action }}</span> {{ item.entity }} <span
                v-if="item.entityId"
                class="font-mono text-xs text-dimmed"
              >({{ item.entityId.slice(0, 10) }})</span>
            </p>
            <p class="truncate text-xs text-muted">
              {{ item.userEmail || 'Administrator' }}<span v-if="item.ipAddress"> · {{ item.ipAddress }}</span>
            </p>
          </li>
        </ul>
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
