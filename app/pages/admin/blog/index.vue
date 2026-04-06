<script setup lang="ts">
import { itemsPerPage } from '@/utils/shared/pagination';
import { computed, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import useApiFetch from '~/utils/shared/useApiFetch';
import type { blog } from '~/types/blog';

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
const statusFilter = ref<'all' | 'draft' | 'published' | 'archived'>('all');

const handleSearch = useDebounceFn((value: string) => {
  searchQuery.value = value;
  pagination.value.current_page = 1;
  getUpdate([]);
}, 300);

const getUpdate = async (_options: unknown) => {
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
  return value === 'published' ? 'success' : 'warning';
};

const visibleBlogs = computed(() => {
  if (statusFilter.value === 'all') {
    return blogs.value;
  }

  return blogs.value.filter((item) => item.status === statusFilter.value);
});

const pagination = ref({
  total: 0,
  current_page: 1,
  per_page: 10,
  last_page: 1,
});
</script>

<template>
  <v-container class="admin-page">
    <section class="admin-hero">
      <div class="admin-hero__kicker">Blog</div>
      <div class="admin-hero__title">Blog Posts</div>
      <div class="admin-hero__copy">
        Manage posts, filter by status, and open any article for editing.
      </div>
    </section>

    <v-card class="admin-panel">
      <v-card-text class="pa-6">
        <div class="admin-split-header">
          <div>
            <div class="admin-split-header__title">All Posts</div>
            <div class="admin-split-header__copy">
              Review drafts, published posts, and archived entries.
            </div>
          </div>
          <v-btn color="primary" prepend-icon="carbon:add" to="/admin/blog/create">
            Add New
          </v-btn>
        </div>

        <div class="admin-toolbar">
          <div class="admin-toolbar__search">
            <v-text-field
              v-model="searchQuery"
              hide-details
              clearable
              persistent-clear
              placeholder="Search blogs"
              @update:model-value="handleSearch"
            >
              <template #prepend-inner>
                <v-icon icon="carbon:search" />
              </template>
            </v-text-field>
          </div>

          <v-select
            v-model="statusFilter"
            hide-details
            label="Status"
            :items="[
              { title: 'All', value: 'all' },
              { title: 'Published', value: 'published' },
              { title: 'Draft', value: 'draft' },
              { title: 'Archived', value: 'archived' },
            ]"
            item-title="title"
            item-value="value"
            max-width="180"
          />
        </div>

        <v-data-table-server
          :loading="loading"
          :headers="headers"
          :items="visibleBlogs"
          :items-length="statusFilter === 'all' ? pagination.total : visibleBlogs.length"
          :page="pagination.current_page"
          :items-per-page="pagination.per_page"
          hide-default-footer
          @update:options="getUpdate"
        >
          <template #[`item.title`]="{ item }">
            <div>
              <div class="font-weight-medium">{{ item.title }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.slug }}</div>
            </div>
          </template>

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
            <v-btn
              icon="carbon:edit"
              size="small"
              variant="text"
              :to="`/admin/blog/${item.id}`"
            />
          </template>
        </v-data-table-server>

        <v-row align="center" class="mt-4">
          <v-col cols="12" md="6">
            <v-pagination
              v-model="pagination.current_page"
              density="comfortable"
              :total-visible="5"
              :length="pagination.last_page"
              @update:model-value="
                (value) => {
                  pagination.current_page = value;
                  getUpdate([]);
                }
              "
            />
          </v-col>

          <v-col cols="12" md="6">
            <div class="d-flex align-center justify-end">
              <span class="mr-3 text-medium-emphasis">Items Per Page:</span>
              <v-select
                v-model="pagination.per_page"
                hide-details
                density="comfortable"
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
      </v-card-text>
    </v-card>
  </v-container>
</template>
