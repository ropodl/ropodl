<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import type { PortfolioType } from '@/types/portfolio';
import { itemsPerPage } from '@/utils/constants/pagination';
import { Head, router } from '@inertiajs/vue3';
import { defineAsyncComponent, ref } from 'vue';

const breadcrumbs = defineAsyncComponent(() => import('@/components/admin/layout/breadcrumbs.vue'));
const addNewDialog = defineAsyncComponent(
  () => import('@/components/admin/shared/portfolio/type/addNewDialog.vue'),
);

const { types, search, pagination } = defineProps<{
  types: PortfolioType[];
  search?: string;
  pagination: pagination;
}>();

const searchQuery = ref(search);
const paginate = ref(pagination);

const getUpdate = (options: { key: string; order?: boolean }[]) => {
  const params = {
    search: searchQuery.value,
    page: paginate.value.current_page,
    per_page: paginate.value.per_page,
    sort_by: options[0],
  };

  router.get(route('portfolio.index'), params, {
    showProgress: true,
    async: true,
    preserveState: false,
    preserveScroll: false,
    replace: true,
    only: ['types', 'pagination'],
  });
};

const bread = ref<BreadcrumbItem[]>([
  {
    title: 'portfolio',
    href: '/admin/portfolio',
  },
  {
    title: 'types',
    href: '/admin/portfolio-type',
  },
]);

const headers = ref([
  {
    title: 'Title',
    value: 'title',
  },
  { title: 'Actions', value: 'actions' },
]);
</script>
<template>
  <Head>
    <title>Portfolio Type</title>
  </Head>
  <AuthenticatedLayout title="Portfolio Type">
    <v-container>
      <breadcrumbs :items="bread" />
      <v-row align="center">
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field hide-details></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex">
            <v-spacer></v-spacer>
            <add-new-dialog />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card rounded="lg">
            <v-data-table-server
              :headers
              hide-default-footer
              :items="types"
              :items-length="10"
              :items-per-page="10"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-hover v-slot:default="{ isHovering, props }">
                  <v-btn
                    v-bind="props"
                    icon
                    size="small"
                    rounded="lg"
                    :variant="isHovering ? 'tonal' : 'text'"
                    @click="router.visit(`/admin/portfolio/${item.id}`)"
                  >
                    <v-icon icon="carbon:edit"></v-icon>
                  </v-btn>
                </v-hover>
                <v-dialog max-width="500">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                      v-bind="activatorProps"
                      color="surface-variant"
                      text="Open Dialog"
                      variant="flat"
                    ></v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card title="Dialog">
                      <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          text="Close Dialog"
                          @click="isActive.value = false"
                        ></v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </template>
            </v-data-table-server>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex justify-start">
            <v-pagination
              v-model="paginate.current_page"
              density="compact"
              :total-visible="5"
              :length="paginate.last_page"
              @update:model-value="
                (value) => {
                  paginate.current_page = value;
                  getUpdate([]);
                }
              "
            ></v-pagination>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-center justify-end">
            <span class="mr-3">Items Per Page:</span>
            <v-select
              v-model="paginate.per_page"
              hide-details
              density="compact"
              max-width="100"
              :items="itemsPerPage"
              @update:model-value="
                (value) => {
                  paginate.per_page = value;
                  getUpdate([]);
                }
              "
            ></v-select>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </AuthenticatedLayout>
</template>