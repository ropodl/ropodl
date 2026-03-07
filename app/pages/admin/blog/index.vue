<script setup lang="ts">
import { itemsPerPage } from '@/utils/shared/pagination';
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import useApiFetch from '~/utils/shared/useApiFetch';
import type { blog } from '~/types/blog';
import { useAuth } from '~/composables/admin/auth/useAuth';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const headers = [
  { title: 'Title', key: 'title', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Created At', key: 'created_at', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false },
];

const blogs = ref<blog[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const { can } = useAuth();

// Add debounced search handler
const handleSearch = useDebounceFn((value: string) => {
  searchQuery.value = value;
  pagination.value.current_page = 1; // Reset to first page when searching
  getUpdate([]);
}, 300);

const getUpdate = async (options: any) => {
  loading.value = true;

  await useApiFetch('admin/blog', {
    query: {
      limit: pagination.value.per_page,
      page: pagination.value.current_page,
      search: searchQuery.value,
    },
  })
    .then((res: any) => {
      blogs.value = res.data;
      pagination.value = res.meta;
    })
    .finally(() => {
      loading.value = false;
    });
};

const getColor = (value: string) => {
  return value === 'published' ? 'green' : 'yellow';
};

const pagination = ref({
  total: 0,
  current_page: 1,
  per_page: 10,
  last_page: 1,
});

const rightNav = ref(false);
</script>

<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" md="4">
        <!-- v-model="searchQuery" -->
        <v-text-field
          v-model="searchQuery"
          hide-details
          clearable
          persistent-clear
          rounded="lg"
          placeholder="Search blogs"
          @update:model-value="handleSearch"
        >
          <template #prepend-inner>
            <v-icon icon="carbon:search" />
          </template>
        </v-text-field>
      </v-col>
      <v-spacer />
      <v-col cols="12" md="6">
        <div class="d-flex">
          <v-spacer />
          <v-btn
            v-tooltip:top="'Filters'"
            flat
            class="me-3"
            @click="rightNav = !rightNav"
          >
            <v-icon icon="carbon:filter" />
          </v-btn>
          <v-btn
            v-if="can('blog.create')"
            flat
            color="primary"
            to="/admin/blog/create"
          >
            Add New
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card rounded="lg">
          <v-data-table-server
            :loading
            :headers="headers"
            :items="blogs"
            :items-length="pagination.total"
            :page="pagination.current_page"
            :items-per-page="pagination.per_page"
            hide-default-footer
            @update:options="getUpdate"
          >
            <template #[`item.status`]="{ value }">
              <v-chip
                :color="getColor(value)"
                variant="tonal"
                class="text-capitalize"
              >
                {{ value }}
              </v-chip>
            </template>
            <template #[`item.created_at`]="{ value }">
              {{ useDateFormat(value, 'MMMM D, YYYY') }}
            </template>
            <template #[`item.actions`]="{ item }">
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  v-if="can('blog.update')"
                  v-bind="props"
                  icon
                  size="small"
                  rounded="lg"
                  :variant="isHovering ? 'tonal' : 'text'"
                  :to="`/admin/blog/${item.id}`"
                >
                  <v-icon color="primary" icon="carbon:edit" />
                </v-btn>
              </v-hover>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="6">
        <div class="d-flex justify-start">
          <v-pagination
            v-model="pagination.current_page"
            density="compact"
            :total-visible="5"
            :length="pagination.last_page"
            @update:model-value="
              (value) => {
                pagination.current_page = value;
                getUpdate([]);
              }
            "
          />
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex align-center justify-end">
          <span class="mr-3">Items Per Page:</span>
          <v-select
            v-model="pagination.per_page"
            hide-details
            density="compact"
            max-width="100"
            :items="itemsPerPage"
            @update:model-value="
              (value) => {
                pagination.per_page = value;
                getUpdate([]);
              }
            "
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-navigation-drawer v-model="rightNav" app temporary location="right">
    hi
  </v-navigation-drawer>
</template>
