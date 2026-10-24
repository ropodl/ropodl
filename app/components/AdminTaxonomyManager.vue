<script setup lang="ts">
interface TaxonomyItem { id: string, title: string, slug: string, description?: string }
interface TaxonomyPage { items: TaxonomyItem[], page: number, pageSize: number, totalItems: number, totalPages: number }
const props = defineProps<{ kind: 'categories' | 'tags' | 'work-types', title: string, description: string }>()
const route = useRoute()
const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const pageSize = computed(() => [10, 25, 50, 100].includes(Number(route.query.pageSize)) ? Number(route.query.pageSize) : 10)
const { data: response, refresh: refreshPage } = await useFetch<TaxonomyPage>(() => `/api/admin/taxonomies/${props.kind}`, {
  query: computed(() => ({ page: page.value, pageSize: pageSize.value })),
  default: () => ({ items: [], page: 1, pageSize: 10, totalItems: 0, totalPages: 1 })
})
const items = computed(() => response.value?.items ?? [])
const editing = ref<TaxonomyItem | null>(null)
const formOpen = ref(false)
const itemLabel = computed(() => props.kind === 'work-types' ? 'work type' : props.kind === 'categories' ? 'category' : 'tag')
const form = reactive({ title: '', slug: '', description: '' })
const busy = ref(false)
const error = ref('')
const notice = ref('')

async function refresh() {
  await refreshPage()
}
function startEdit(item?: TaxonomyItem) {
  editing.value = item || null
  Object.assign(form, item ? { title: item.title, slug: item.slug, description: item.description || '' } : { title: '', slug: '', description: '' })
  error.value = ''
  notice.value = ''
  formOpen.value = true
}
function closeForm() {
  formOpen.value = false
  editing.value = null
  error.value = ''
}
watch(() => form.title, (title) => {
  if (!editing.value) form.slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
})
async function save() {
  busy.value = true
  error.value = ''
  notice.value = ''
  try {
    await $fetch(`/api/admin/taxonomies/${props.kind}${editing.value ? `/${editing.value.id}` : ''}`, { method: editing.value ? 'PUT' : 'POST', body: form } as never)
    closeForm()
    Object.assign(form, { title: '', slug: '', description: '' })
    await refresh()
    notice.value = 'Saved.'
  } catch (e) {
    error.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || 'Could not save this item.'
  } finally {
    busy.value = false
  }
}
async function remove(item: TaxonomyItem) {
  if (!window.confirm(`Delete “${item.title}”?`)) return
  try {
    await $fetch(`/api/admin/taxonomies/${props.kind}/${item.id}`, { method: 'DELETE' })
    await refresh()
  } catch (e) {
    error.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || 'Could not delete this item.'
  }
}
</script>

<template>
  <AdminShell>
    <AdminPageHeader
      eyebrow="Content settings"
      :title="title"
      :description="description"
    >
      <template #actions>
        <UButton
          icon="i-lucide-plus"
          @click="startEdit()"
        >
          Add {{ itemLabel }}
        </UButton>
      </template>
    </AdminPageHeader>
    <div class="space-y-5">
      <UAlert
        v-if="error && !formOpen"
        role="alert"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
        :title="error"
      />
      <UAlert
        v-if="notice"
        role="status"
        color="success"
        variant="subtle"
        icon="i-lucide-circle-check"
        :title="notice"
      />
      <AdminSection>
        <UEmpty
          v-if="!items.length"
          variant="naked"
          icon="i-lucide-folder-open"
          title="Nothing here yet."
        />
        <ul
          v-else
          class="divide-y divide-default"
        >
          <li
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div class="min-w-0">
              <h2 class="truncate text-sm font-medium text-highlighted">
                {{ item.title }}
              </h2>
              <p class="mt-1 truncate text-xs text-muted">
                /{{ item.slug }}<span v-if="item.description"> · {{ item.description }}</span>
              </p>
            </div>
            <div class="flex shrink-0 gap-2">
              <UButton
                color="neutral"
                variant="outline"
                size="sm"
                icon="i-lucide-pencil"
                @click="startEdit(item)"
              >
                Edit
              </UButton>
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
      :open="formOpen"
      :title="editing ? `Edit ${itemLabel}` : `Add ${itemLabel}`"
      description="Enter the details below."
      :dismissible="!busy"
      :close="{ disabled: busy }"
      @update:open="!$event && closeForm()"
    >
      <template #body>
        <form
          class="space-y-5"
          @submit.prevent="save"
        >
          <UFormField
            label="Title"
            required
          >
            <UInput
              v-model="form.title"
              required
              maxlength="120"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Slug"
            required
          >
            <UInput
              v-model="form.slug"
              required
              maxlength="120"
              class="w-full"
            />
          </UFormField>
          <UFormField
            v-if="kind !== 'tags'"
            label="Description"
          >
            <UTextarea
              v-model="form.description"
              :rows="3"
              maxlength="600"
              class="w-full"
            />
          </UFormField>
          <UAlert
            v-if="error"
            role="alert"
            color="error"
            variant="subtle"
            icon="i-lucide-circle-alert"
            :title="error"
          />
          <div class="flex justify-end gap-2">
            <UButton
              color="neutral"
              variant="outline"
              :disabled="busy"
              @click="closeForm"
            >
              Cancel
            </UButton>
            <UButton
              type="submit"
              :loading="busy"
            >
              {{ busy ? 'Saving…' : editing ? 'Save changes' : 'Create' }}
            </UButton>
          </div>
        </form>
      </template>
    </UModal>
  </AdminShell>
</template>
