<script setup lang="ts">
import { itemsPerPageOptions } from "@/utils/constants";

const portfolio = useAdminPortfolioStore();
const {
  portfolios: items,
  loading,
  pagination,
  filters,
  headers,
  showFilters,
  hasActiveFilters,
} = storeToRefs(portfolio);
const { all } = portfolio;

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Portfolio",
});

const search = ref("");
const debouncedSearch = ref("");
const selected = ref([]);
const debounceTimeout = ref(null);
const isDebouncing = ref(false);

const deleteBulk = () => {
  //   blog.removeBulk(selected.value);
  selected.value = [];
};
// server side table
const loadPortfolio = async ({ sortBy }) => {
  await all(sortBy, debouncedSearch.value, filters.value);
};

// Watch for changes in debounced search to trigger data reload
watch(debouncedSearch, () => {
  // Reset to first page when search changes
  pagination.value.currentPage = 1;
  // Reload data with current options
  loadPortfolio({
    sortBy: [],
  });
});

const removeId = async (id: string) => {
  await useAxios
    .delete(`/api/portfolio/${id}`)
    .then((res) => {})
    .catch((err) => {});
};

const reload = () => {
  pagination.value.currentPage = 1;
  loadPortfolio({ sortBy: [] });
};

const breadcrumbs = [
  {
    title: "Home",
    to: "/admin/",
  },
  {
    title: "All Portfolio",
    to: "/admin/",
  },
];
</script>
<template>
  <v-container>
    <lazy-admin-layout-page-title title="All Portfolio" :items="breadcrumbs">
      <v-btn
        color="primary"
        class="text-capitalize"
        to="/admin/portfolio/create"
      >
        Add new Portfolio
      </v-btn>
    </lazy-admin-layout-page-title>
    <v-row justify="space-between">
      <v-col class="py-md-0" cols="12" sm="6" md="4">
        <div class="d-flex align-center justify-start">
          <v-text-field
            v-model="search"
            density="compact"
            placeholder="Type to search..."
            hide-details
            clearable
            persistent-clear
            rounded="lg"
          >
            <template #append-inner v-if="isDebouncing || loading">
              <v-progress-circular
                indeterminate
                size="16"
                width="2"
              ></v-progress-circular>
            </template>
          </v-text-field>
        </div>
      </v-col>
      <v-col class="py-md-0" cols="12" sm="6" md="4">
        <div v-auto-animate class="d-flex align-center justify-end">
          <template v-if="selected.length > 0">
            <v-btn
              v-tooltip="'Delete Bulk Item'"
              border
              icon="mdi-delete-outline"
              theme="dark"
              size="small"
              class="mr-3"
              @click="deleteBulk"
            ></v-btn>
          </template>
          <v-btn
            v-tooltip="'Reload'"
            border
            icon="mdi-reload"
            size="small"
            class="mr-3"
            @click="reload"
          />
          {{ showFilters }}
          <v-btn
            v-tooltip="'Filters'"
            border
            icon="mdi-filter-outline"
            :color="hasActiveFilters ? 'primary' : ''"
            size="small"
            @click="showFilters = !showFilters"
          >
            <v-badge
              :color="hasActiveFilters ? 'error' : 'transparent'"
              :dot="hasActiveFilters"
            >
              <v-icon icon="mdi-filter-outline" />
            </v-badge>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card border rounded="lg">
          <v-data-table-server
            v-model="selected"
            show-select
            :headers
            :loading
            :items
            :items-per-page="pagination.itemsPerPage"
            :items-length="pagination.totalItems"
            item-value="id"
            @update:options="loadPortfolio"
          >
            <template v-slot:item.actions="{ item: { id, title } }">
              <v-btn
                v-tooltip="'Edit Portfolio'"
                icon="mdi-pencil"
                class="mr-2"
                size="small"
                rounded="lg"
                variant="text"
                :to="`/admin/portfolio/${id}`"
              ></v-btn>
              <lazy-admin-shared-delete
                :title
                type="Porfolio"
                @delete-action="removeId(id)"
              />
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3">
        Showing
        <v-chip density="comfortable">
          {{ (pagination.currentPage - 1) * pagination.itemsPerPage + 1 }} -
          {{
            Math.min(
              pagination.currentPage * pagination.itemsPerPage,
              pagination.totalItems
            )
          }}
        </v-chip>
        out of {{ pagination.totalItems }}
      </v-col>
      <v-col cols="12" md="6">
        <v-pagination
          v-model="pagination.currentPage"
          :disabled="loading"
          :length="pagination.totalPages"
          density="compact"
          rounded="lg"
        ></v-pagination>
      </v-col>
      <v-col cols="12" md="3">
        <div class="d-flex align-center justify-end">
          Items Per Page:&nbsp;
          <v-select
            v-model="pagination.itemsPerPage"
            density="compact"
            variant="outlined"
            rounded="lg"
            :disabled="loading"
            hide-details
            single-line
            :items="itemsPerPageOptions"
            style="max-width: 90px"
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
