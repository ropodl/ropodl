<script setup lang="ts">
import type { Portfolio } from '~/types/portfolio';
import { useDateFormat, useDebounceFn } from '@vueuse/core';
import { useApiFetch } from '~/utils/shared/useApiFetch';
import { useAuth } from '~/composables/admin/auth/useAuth';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const portfolios = ref<Portfolio[]>([]);
const loading = ref(true);
const search = ref('');
const { can } = useAuth();

const pagination = ref({
  current_page: 1,
  per_page: 10,
  total: 0,
  last_page: 1,
});

const headers = [
  { title: 'Title', key: 'title', sortable: true },
  { title: 'Type', key: 'workType', sortable: false },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Created At', key: 'createdAt', sortable: true },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
] as const;

const fetchPortfolios = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: pagination.value.current_page.toString(),
      per_page: pagination.value.per_page.toString(),
      search: search.value,
    });
    
    const response = await useApiFetch<{ data: Portfolio[], pagination: any }>(`admin/portfolio?${params}`);
    portfolios.value = response.data;
    pagination.value = response.pagination;
  } catch (error) {
    console.error('Failed to fetch portfolios', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = useDebounceFn(() => {
  pagination.value.current_page = 1;
  fetchPortfolios();
}, 500);

const deletePortfolio = async (id: number) => {
  if (!confirm('Are you sure you want to delete this portfolio item?')) return;
  try {
    await useApiFetch(`admin/portfolio/${id}`, { method: 'DELETE' });
    await fetchPortfolios();
  } catch (error) {
    console.error('Failed to delete portfolio', error);
  }
};

onMounted(fetchPortfolios);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published': return 'success';
    case 'archived': return 'error';
    default: return 'warning';
  }
};
</script>

<template>
  <v-container>
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <div class="text-h4 font-weight-bold">Portfolios</div>
        <div class="text-subtitle-1 text-medium-emphasis">Showcase your best work</div>
      </v-col>
      <v-col v-if="can('portfolio.create')" cols="12" md="6" class="text-right">
        <v-btn
          color="primary"
          prepend-icon="carbon:add"
          rounded="lg"
          to="/admin/portfolio/create"
        >
          Add New Item
        </v-btn>
      </v-col>
    </v-row>

    <v-card rounded="lg" elevation="0" border>
      <v-card-text>
        <v-text-field
          v-model="search"
          placeholder="Search portfolios..."
          prepend-inner-icon="carbon:search"
          hide-details
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-4"
          @update:model-value="handleSearch"
        />

        <v-data-table-server
          v-model:items-per-page="pagination.per_page"
          v-model:page="pagination.current_page"
          :headers="headers"
          :items="portfolios"
          :items-length="pagination.total"
          :loading="loading"
          hover
          @update:options="fetchPortfolios"
        >
          <template #[`item.title`]="{ item }">
            <div class="font-weight-medium text-primary cursor-pointer" @click="$router.push(`/admin/portfolio/${item.id}`)">
              {{ item.title }}
            </div>
          </template>

          <template #[`item.workType`]="{ value }">
            <v-chip size="small" variant="tonal" rounded="lg">
              {{ value || 'Uncategorized' }}
            </v-chip>
          </template>

          <template #[`item.status`]="{ value }">
            <v-chip
              size="small"
              :color="getStatusColor(value)"
              variant="flat"
              class="text-capitalize"
            >
              {{ value }}
            </v-chip>
          </template>

          <template #[`item.createdAt`]="{ value }">
            <span class="text-medium-emphasis">
              {{ useDateFormat(value, 'MMM DD, YYYY').value }}
            </span>
          </template>
          
          <template #[`item.actions`]="{ item }">
            <v-btn
              v-if="can('portfolio.update')"
              icon="carbon:edit"
              variant="text"
              size="small"
              rounded="lg"
              color="primary"
              class="mr-1"
              :to="`/admin/portfolio/${item.id}`"
            />
            <v-btn
              v-if="can('portfolio.delete')"
              icon="carbon:trash-can"
              variant="text"
              size="small"
              rounded="lg"
              color="error"
              @click="deletePortfolio(item.id)"
            />
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </v-container>
</template>
