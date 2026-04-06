<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
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
  username: string | null;
  createdAt: string;
}

const logs = ref<AuditLog[]>([]);
const loading = ref(false);
const pagination = ref({
  total: 0,
  count: 0,
  limit: 20,
  offset: 0,
});

const headers = [
  { title: 'When', key: 'createdAt' },
  { title: 'Action', key: 'action' },
  { title: 'Entity', key: 'entity' },
  { title: 'Entity ID', key: 'entityId' },
  { title: 'User', key: 'username' },
  { title: 'IP', key: 'ipAddress' },
] as const;

const fetchLogs = async () => {
  loading.value = true;
  try {
    const res = await useApiFetch<{ meta: typeof pagination.value; data: AuditLog[] }>('admin/audit', {
      query: {
        limit: pagination.value.limit,
        offset: pagination.value.offset,
      },
    });

    logs.value = res.data;
    pagination.value = res.meta;
  } catch (error) {
    console.error('Failed to fetch audit logs', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchLogs);
</script>

<template>
  <v-container class="admin-page">
    <section class="admin-hero">
      <div class="admin-hero__kicker">Trace log</div>
      <div class="admin-hero__title">See how the system has been touched.</div>
      <div class="admin-hero__copy">
        Audit activity, follow the trail of edits, and spot unexpected changes quickly.
      </div>
    </section>

    <v-card class="admin-panel">
      <v-data-table
        :headers="headers"
        :items="logs"
        :loading="loading"
        hover
      >
        <template #[`item.createdAt`]="{ value }">
          {{ useDateFormat(value, 'MMM DD, YYYY HH:mm').value }}
        </template>

        <template #[`item.action`]="{ value }">
          <v-chip size="small" variant="tonal">{{ value }}</v-chip>
        </template>

        <template #[`item.entity`]="{ value }">
          <span class="text-capitalize">{{ value }}</span>
        </template>

        <template #[`item.entityId`]="{ value }">
          {{ value ?? '-' }}
        </template>

        <template #[`item.username`]="{ value }">
          {{ value || 'System' }}
        </template>

        <template #[`item.ipAddress`]="{ value }">
          {{ value || '-' }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
