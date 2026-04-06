<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useApiFetch } from '~/utils/shared/useApiFetch';

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
  updatedAt?: string;
}

const requests = ref<ContactRequest[]>([]);
const loading = ref(true);
const search = ref('');
const detailsOpen = ref(false);
const detailsLoading = ref(false);
const selectedRequest = ref<ContactRequest | null>(null);

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

const openRequest = async (item: ContactRequest) => {
  detailsLoading.value = true;
  detailsOpen.value = true;
  try {
    const res = await useApiFetch<{ success: boolean; data: ContactRequest }>(
      `admin/contact/${item.id}`
    );
    selectedRequest.value = res.data;

    const target = requests.value.find((request) => request.id === item.id);
    if (target) {
      Object.assign(target, res.data);
    }
  } catch (error) {
    console.error('Failed to fetch contact request', error);
  } finally {
    detailsLoading.value = false;
  }
};

const updateStatus = async (
  item: ContactRequest,
  status: ContactRequest['status']
) => {
  try {
    const res = await useApiFetch<{ success: boolean; data: ContactRequest }>(
      `admin/contact/${item.id}/status`,
      {
        method: 'PATCH',
        body: { status },
      }
    );

    item.status = res.data.status;
    if (selectedRequest.value?.id === item.id) {
      selectedRequest.value = res.data;
    }
  } catch (error) {
    console.error('Failed to update status', error);
  }
};

const deleteRequest = async (id: number) => {
  if (!confirm('Are you sure you want to delete this request?')) return;
  try {
    await useApiFetch(`admin/contact/${id}`, { method: 'DELETE' });
    requests.value = requests.value.filter((request) => request.id !== id);

    if (selectedRequest.value?.id === id) {
      selectedRequest.value = null;
      detailsOpen.value = false;
    }
  } catch (error) {
    console.error('Failed to delete request', error);
  }
};

const filteredRequests = computed(() => {
  if (!search.value) return requests.value;
  const needle = search.value.toLowerCase();

  return requests.value.filter(
    (request) =>
      request.name.toLowerCase().includes(needle) ||
      request.email.toLowerCase().includes(needle) ||
      request.subject.toLowerCase().includes(needle) ||
      request.message.toLowerCase().includes(needle)
  );
});

const stats = computed(() => ({
  total: requests.value.length,
  unread: requests.value.filter((request) => request.status === 'unread').length,
  replied: requests.value.filter((request) => request.status === 'replied').length,
}));

const getStatusColor = (status: ContactRequest['status']) => {
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
  <v-container class="admin-page">
    <section class="admin-hero">
      <div class="admin-hero__kicker">Contact</div>
      <div class="admin-hero__title">Inbox</div>
      <div class="admin-hero__copy">Messages, status, and quick actions.</div>
      <div class="admin-stat-grid mt-4">
        <v-card class="admin-stat-tile">
          <v-card-text class="pa-4">
          <div class="admin-stat-tile__label">Total</div>
          <div class="admin-stat-tile__value">{{ stats.total }}</div>
          </v-card-text>
        </v-card>
        <v-card class="admin-stat-tile">
          <v-card-text class="pa-4">
          <div class="admin-stat-tile__label">Unread</div>
          <div class="admin-stat-tile__value">{{ stats.unread }}</div>
          </v-card-text>
        </v-card>
        <v-card class="admin-stat-tile">
          <v-card-text class="pa-4">
          <div class="admin-stat-tile__label">Replied</div>
          <div class="admin-stat-tile__value">{{ stats.replied }}</div>
          </v-card-text>
        </v-card>
      </div>
    </section>

    <v-card class="admin-panel">
      <v-card-text class="pa-4">
        <div class="admin-toolbar">
          <div class="admin-toolbar__search">
            <v-text-field
              v-model="search"
              placeholder="Search"
              prepend-inner-icon="carbon:search"
              hide-details
            />
          </div>
        </div>

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
            <div class="d-flex justify-end">
              <v-btn
                icon="carbon:view"
                variant="text"
                size="small"
                color="primary"
                class="mr-1"
                @click="openRequest(item)"
              />

              <v-menu location="bottom end">
                <template #activator="{ props }">
                  <v-btn
                    icon="carbon:overflow-menu-vertical"
                    variant="text"
                    size="small"
                    v-bind="props"
                  />
                </template>
                <v-list density="compact" rounded="lg">
                  <v-list-item
                    v-if="item.status === 'unread'"
                    title="Mark as Read"
                    prepend-icon="carbon:view"
                    @click="updateStatus(item, 'read')"
                  />
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
                    title="Delete"
                    prepend-icon="carbon:trash-can"
                    color="error"
                    @click="deleteRequest(item.id)"
                  />
                </v-list>
              </v-menu>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="detailsOpen" max-width="720">
      <v-card class="admin-panel">
        <v-card-title class="d-flex align-center pa-4 text-subtitle-1">
          <div>
            <div>
              {{ selectedRequest?.subject || 'Request Details' }}
            </div>
            <div class="text-body-2 text-medium-emphasis">
              {{ selectedRequest?.name }} • {{ selectedRequest?.email }}
            </div>
          </div>
          <v-spacer />
          <v-chip
            v-if="selectedRequest"
            size="small"
            :color="getStatusColor(selectedRequest.status)"
            variant="flat"
            class="text-capitalize"
          >
            {{ selectedRequest.status }}
          </v-chip>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-skeleton-loader
            v-if="detailsLoading"
            type="article"
          />
          <template v-else-if="selectedRequest">
            <div class="text-caption text-medium-emphasis mb-3">
              Received
              {{ new Date(selectedRequest.createdAt).toLocaleString() }}
            </div>
            <div class="text-body-1" style="white-space: pre-wrap">
              {{ selectedRequest.message }}
            </div>
          </template>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-btn
            v-if="selectedRequest && selectedRequest.status !== 'replied'"
            color="success"
            variant="text"
            @click="selectedRequest && updateStatus(selectedRequest, 'replied')"
          >
            Mark Replied
          </v-btn>
          <v-btn
            v-if="selectedRequest && selectedRequest.status !== 'archived'"
            color="secondary"
            variant="text"
            @click="selectedRequest && updateStatus(selectedRequest, 'archived')"
          >
            Archive
          </v-btn>
          <v-spacer />
          <v-btn variant="text" @click="detailsOpen = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
