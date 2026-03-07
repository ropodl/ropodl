<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useApiFetch } from '~/utils/shared/useApiFetch';
import { useAuth } from '~/composables/admin/auth/useAuth';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

interface ContactRequest {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

const requests = ref<ContactRequest[]>([]);
const loading = ref(true);
const search = ref('');
const { can } = useAuth();

const headers = [
  { title: 'Date', key: 'createdAt' },
  { title: 'Name', key: 'name' },
  { title: 'Subject', key: 'subject' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
] as const;

const fetchRequests = async () => {
  loading.value = true;
  try {
    const res = await useApiFetch<{ data: ContactRequest[] }>('admin/contact');
    requests.value = res.data;
  } catch (error) {
    console.error('Failed to fetch contact requests', error);
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (item: ContactRequest, status: string) => {
  try {
    await useApiFetch(`admin/contact/${item.id}/status`, {
      method: 'PATCH',
      body: { status },
    });
    item.status = status as any;
  } catch (error) {
    console.error('Failed to update status', error);
  }
};

const deleteRequest = async (id: number) => {
  if (!confirm('Are you sure you want to delete this request?')) return;
  try {
    await useApiFetch(`admin/contact/${id}`, { method: 'DELETE' });
    await fetchRequests();
  } catch (error) {
    console.error('Failed to delete request', error);
  }
};

const filteredRequests = computed(() => {
  if (!search.value) return requests.value;
  const s = search.value.toLowerCase();
  return requests.value.filter(
    (r) =>
      r.name.toLowerCase().includes(s) ||
      r.email.toLowerCase().includes(s) ||
      r.subject.toLowerCase().includes(s)
  );
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'unread':
      return 'warning';
    case 'read':
      return 'info';
    case 'replied':
      return 'success';
    case 'archived':
      return 'grey';
    default:
      return 'primary';
  }
};

onMounted(fetchRequests);
</script>

<template>
  <v-container>
    <v-row align="center" class="mb-4">
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">Contact Requests</div>
        <div class="text-subtitle-1 text-medium-emphasis">
          Manage inquiries from your website visitors
        </div>
      </v-col>
    </v-row>

    <v-card rounded="lg" elevation="0" border>
      <v-card-text>
        <v-text-field
          v-model="search"
          placeholder="Search inquiries..."
          prepend-inner-icon="carbon:search"
          hide-details
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-4"
        />

        <v-data-table
          :headers="headers"
          :items="filteredRequests"
          :loading="loading"
          hover
        >
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleDateString() }}
          </template>

          <template #[`item.status`]="{ item }">
            <v-chip
              size="small"
              :color="getStatusColor(item.status)"
              variant="flat"
              class="text-capitalize"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-menu location="bottom end">
              <template #activator="{ props }">
                <v-btn
                  icon="carbon:overflow-menu-vertical"
                  variant="text"
                  size="small"
                  rounded="lg"
                  v-bind="props"
                />
              </template>
              <v-list density="compact" rounded="lg">
                <v-list-item
                  v-if="item.status !== 'replied'"
                  title="Mark as Replied"
                  prepend-icon="carbon:email"
                  @click="updateStatus(item, 'replied')"
                />
                <v-list-item
                  v-if="item.status !== 'archived'"
                  title="Archive"
                  prepend-icon="carbon:archive"
                  @click="updateStatus(item, 'archived')"
                />
                <v-divider class="my-1" />
                <v-list-item
                  v-if="can('contact.delete')"
                  title="Delete"
                  prepend-icon="carbon:trash-can"
                  color="error"
                  @click="deleteRequest(item.id)"
                />
              </v-list>
            </v-menu>
          </template>

          <template #expanded-row="{ columns, item }">
            <tr>
              <td :colspan="columns.length" class="pa-4 bg-grey-lighten-4">
                <div class="text-subtitle-2 font-weight-bold mb-1">
                  Message from {{ item.email }}:
                </div>
                <div class="text-body-2">{{ item.message }}</div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>
