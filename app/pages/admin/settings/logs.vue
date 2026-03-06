<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useApiFetch } from '~/utils/shared/useApiFetch';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

interface AuditLog {
  id: number;
  action: string;
  entity: string;
  entityId: number | null;
  ipAddress: string | null;
  createdAt: string;
  username: string | null;
}

const logs = ref<AuditLog[]>([]);
const loading = ref(true);
const search = ref('');

const headers = [
  { title: 'Time', key: 'createdAt' },
  { title: 'User', key: 'username' },
  { title: 'Action', key: 'action' },
  { title: 'Target', key: 'entity' },
  { title: 'IP Address', key: 'ipAddress' },
] as const;

const fetchLogs = async () => {
  loading.value = true;
  try {
    const res = await useApiFetch<{ data: AuditLog[] }>('admin/audit');
    logs.value = res.data;
  } catch (error) {
    console.error('Failed to fetch audit logs', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchLogs);

const getActionColor = (action: string) => {
  if (action.includes('CREATE')) return 'success';
  if (action.includes('UPDATE')) return 'info';
  if (action.includes('DELETE')) return 'error';
  return 'primary';
};
</script>

<template>
  <v-container>
    <v-row align="center" class="mb-4">
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">Audit Logs</div>
        <div class="text-subtitle-1 text-medium-emphasis">Review administrative activity across the system</div>
      </v-col>
    </v-row>

    <v-card rounded="lg" elevation="0" border>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="logs"
          :loading="loading"
          hover
        >
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>

          <template #[`item.username`]="{ value }">
            {{ value || 'System' }}
          </template>

          <template #[`item.action`]="{ value }">
            <v-chip
              size="x-small"
              :color="getActionColor(value)"
              variant="flat"
              class="font-weight-bold"
            >
              {{ value }}
            </v-chip>
          </template>

          <template #[`item.entity`]="{ item }">
            <span class="text-capitalize">{{ item.entity }}</span>
            <span v-if="item.entityId" class="text-caption text-medium-emphasis ml-1">(#{{ item.entityId }})</span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>
