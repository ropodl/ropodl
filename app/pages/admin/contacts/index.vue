<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
interface ContactItem { id: string, name: string, email: string, subject: string, message: string, status: 'new' | 'read' | 'replied' | 'archived', createdAt: string | number }
interface ContactPage { items: ContactItem[], page: number, pageSize: number, totalPages: number, totalItems: number }
const route = useRoute()
const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const pageSize = computed(() => [10, 25, 50, 100].includes(Number(route.query.pageSize)) ? Number(route.query.pageSize) : 10)
const { data: response, refresh, error } = await useFetch<ContactPage>('/api/admin/contacts', { query: computed(() => ({ page: page.value, pageSize: pageSize.value })) })
const selected = ref<ContactItem | null>(null)
const actionError = ref('')
async function updateStatus(item: ContactItem, status: ContactItem['status']) {
  actionError.value = ''
  try {
    await $fetch(`/api/admin/contacts/${item.id}`, { method: 'PATCH', body: { status } })
    item.status = status
    if (selected.value?.id === item.id) selected.value.status = status
  } catch (e) {
    actionError.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || 'Could not update this message.'
  }
}
async function remove(item: ContactItem) {
  if (!window.confirm(`Delete the message “${item.subject}”?`)) return
  try {
    await $fetch(`/api/admin/contacts/${item.id}`, { method: 'DELETE' })
    selected.value = null
    await refresh()
  } catch (e) {
    actionError.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || 'Could not delete this message.'
  }
}
const statusOptions = [
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Replied', value: 'replied' },
  { label: 'Archived', value: 'archived' }
] satisfies { label: string, value: ContactItem['status'] }[]
const labelDate = (date: string | number) => new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date))
</script>

<template>
  <AdminShell>
    <AdminPageHeader
      eyebrow="Website"
      title="Contact inbox"
      :description="`${response?.totalItems || 0} messages received through the contact form.`"
    />
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
        v-if="error"
        role="alert"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
        title="Could not load messages."
      />
      <AdminSection v-else>
        <UEmpty
          v-if="!response?.items.length"
          variant="naked"
          icon="i-lucide-inbox"
          title="No contact messages yet."
        />
        <ul
          v-else
          class="divide-y divide-default"
        >
          <li
            v-for="item in response.items"
            :key="item.id"
            class="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              class="min-w-0 flex-1 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              @click="selected = item; item.status === 'new' && updateStatus(item, 'read')"
            >
              <span class="flex items-center gap-2">
                <span
                  class="size-2 shrink-0 rounded-full"
                  :class="item.status === 'new' ? 'bg-primary' : 'bg-accented'"
                />
                <span class="truncate text-sm font-medium text-highlighted">{{ item.subject }}</span>
                <UBadge
                  color="neutral"
                  variant="subtle"
                  size="sm"
                  class="capitalize"
                >
                  {{ item.status }}
                </UBadge>
              </span>
              <span class="mt-1 block truncate text-xs text-muted">{{ item.name }} · {{ item.email }} · {{ labelDate(item.createdAt) }}</span>
            </button>
            <div class="flex gap-2">
              <UButton
                :href="`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject}`)}`"
                color="neutral"
                variant="outline"
                size="sm"
                icon="i-lucide-reply"
              >
                Reply
              </UButton>
              <USelect
                :model-value="item.status"
                :items="statusOptions"
                size="sm"
                aria-label="Message status"
                class="w-28"
                @update:model-value="updateStatus(item, $event as ContactItem['status'])"
              />
              <UButton
                color="error"
                variant="subtle"
                size="sm"
                icon="i-lucide-trash-2"
                @click="remove(item)"
              >
                Delete
              </UButton>
            </div>
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
    <UModal
      :open="!!selected"
      :title="selected?.subject"
      :ui="{ content: 'max-w-2xl' }"
      @update:open="!$event && (selected = null)"
    >
      <template #description>
        <span v-if="selected">
          {{ selected.name }} · <a
            class="text-primary hover:underline"
            :href="`mailto:${selected.email}`"
          >{{ selected.email }}</a>
        </span>
      </template>
      <template #body>
        <template v-if="selected">
          <p class="whitespace-pre-wrap break-words text-sm leading-7 text-toned">
            {{ selected.message }}
          </p>
          <p class="mt-5 text-[11px] text-dimmed">
            {{ labelDate(selected.createdAt) }}
          </p>
        </template>
      </template>
    </UModal>
  </AdminShell>
</template>
