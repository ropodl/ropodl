<script setup lang="ts">
import type { Portfolio } from '~/types/portfolio';
import { useDateFormat, useDebounceFn } from '@vueuse/core';
import type { DataTableHeader } from 'vuetify';

definePageMeta({
  layout: "admin",
  middleware: ['is-auth']
})

const searchQuery = ref("");
const pagination = ref({
  current_page: 1,
  per_page: 10,
  total: 1
});
const filters = ref({
  status: null,
});

const headers = ref<DataTableHeader[]>([
  { title: 'Title', key: 'title', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Created At', key: 'created_at', sortable: true },
  { title: 'Actions', key: 'actions', align: 'center', sortable: false },
]);

const portfolios = ref<Portfolio[]>([
  {
  id: 123,
  title: "Title",
  slug: 'hi',
  status: 'draft'
}
]);

const getUpdate = (options: { key: string; order?: boolean }[]) => {
  const params = <any>{
    search: searchQuery.value,
    page: pagination.value.current_page,
    per_page: pagination.value.per_page,
    sort_by: options[0],
    status: filters.value.status,
  };
};

// Add debounced search handler
const handleSearch = useDebounceFn((value: string) => {
  searchQuery.value = value;
  pagination.value.current_page = 1; // Reset to first page when searching
  getUpdate([]);
}, 300);

const getColor = (value: string) => {
  return value === 'published' ? 'green' : 'yellow';
};

const colorMapper = {
  published : "green",
  draft: "yellow"
}
</script>
<template>
    <v-container>
      <v-row
        align="center"
        class="mb-1"
      >
        <v-col
          cols="12"
          md="6"
        >
          <div class="text-h4 font-weight-bold">Portfolio</div>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-center">
            <!-- <v-spacer class="hidden-sm-and-down"></v-spacer> -->
            <!-- <v-btn
              flat
              color="primary"
              prepend-icon="carbon:add"
              text="Add New"
              @click="router.visit('/admin/portfolio/create')"
            ></v-btn> -->
          </div>
        </v-col>
      </v-row>
      <v-card
        class="position-sticky top-0 mb-3"
        style="z-index: 1"
      >
        <v-card-text>
          <v-row align="center">
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="searchQuery"
                hide-details
                clearable
                persistent-clear
                rounded="lg"
                placeholder="Search portfolios"
                @update:model-value="handleSearch"
              >
                <template #prepend-inner>
                  <v-icon icon="carbon:search" />
                </template>
              </v-text-field>
            </v-col>
            <v-spacer />
            <v-col
              cols="12"
              md="6"
            >
              <div class="d-flex">
                <v-spacer />
                <v-btn
                  v-tooltip:top="'Filters'"
                  flat
                  height="40"
                  variant="tonal"
                  icon="carbon:filter"
                  >
                  Filters
                </v-btn>
                <!-- @click="right = !right" -->
                <!-- <v-icon
                  start
                  icon="carbon:filter"
                /> -->
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12">
          <v-card rounded="lg">
            <v-data-table-server
              :headers
              :items="portfolios"
              :items-length="pagination.total"
              :page="pagination.current_page"
              :items-per-page="pagination.per_page"
              hide-default-footer
              @update:sort-by="getUpdate"
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
                {{ useDateFormat(value, 'MMMM DD, YYYY') }}
              </template>
              <template #[`item.actions`]="{ item }">
                <v-bottom-sheet
                  inset
                  persistent
                  scrollable
                >
                  <template #activator="{ props: activatorProps }">
                    <v-btn
                    v-tooltip="{ text: 'View Portfolio', location: 'top' }"
                      v-bind="activatorProps"
                      size="small"
                      icon="carbon:view"
                    />
                  </template>

                  <template #default="{ isActive }">
                    <v-card
                      rounded="t"
                      :title="item.title"
                    >
                      <v-card-text>
                        <!-- <dynamic :content="item.content" /> -->
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          text="Close Dialog"
                          @click="isActive.value = false"
                        />
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-bottom-sheet>
                <v-btn
                  v-tooltip="{ text: 'Edit Portfolio', location: 'top' }"
                  size="small"
                  icon="carbon:edit"
                />
                <v-menu>
                  <!-- <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      v-tooltip="{ text: 'More Actions', location: 'top' }"
                      size="small"
                      icon="carbon:chevron-down"
                    ></v-btn>
                  </template> -->
                  <v-list density="compact">
                    <!-- <template
                      v-for="({ icon, title, method }, index) in actions"
                      :key="index"
                    >
                      <v-list-item
                        :value="index"
                        :prepend-icon="icon"
                        :title
                        @click="method && method(item.id)"
                      ></v-list-item>
                    </template> -->
                  </v-list>
                </v-menu>
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
            <!-- <v-pagination
              v-model="paginate.current_page"
              density="compact"
              :total-visible="6"
              :length="pagination.last_page"
              @update:model-value="
                (value) => {
                  paginate.current_page = value;
                  getUpdate([]);
                }
              "
            ></v-pagination> -->
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-center justify-end">
            <span class="mr-3">Items Per Page:</span>
            <!-- <v-select
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
            /> -->
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>