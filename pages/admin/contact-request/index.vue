<script setup lang="ts">
import { itemsPerPageOptions } from "@/utils/constants";

const contact = useAdminContactStore();
const {
  requests: items,
  loading,
  pagination,
  showFilters,
  isFiltered,
  filters,
  headers,
  searching,
  currentDisplayedRange,
} = storeToRefs(contact);
const { all, resetFilters } = contact;

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Contact Request",
});

const selected = ref([]);

const deleteBulk = () => {
  selected.value = [];
};

// server side table
interface Options {
  sortBy: Array<{
    key?: string;
    order: string;
  }>;
}
// server side table
const loadPortfolio = async (options: Options) => {
  await all(options.sortBy || []);
};

const removeId = (id: string) => {
  useAxios
    .delete(`/api/blog/${id}`)
    .then(() => {})
    .catch(() => {});
};

const getColor = (item: boolean) => {
  return item ? "success" : "primary";
};

const reload = () => {
  if (pagination.value) pagination.value.currentPage = 1;
  loadPortfolio({
    sortBy: [],
  });
};

const breadcrumbs = [
  {
    title: "Home",
    to: "/admin/",
  },
  {
    title: "Contact Requests",
    to: "/admin/contact-request",
  },
];
// search logic
const search = ref("");
const debouncedSearch = ref("");
watch(search, (val) => {
  searching.value = true;
  if (val === null) {
    all([], search.value);
  } else searchFn();
});

const searchFn = useDebounceFn(async () => {
  all([], search.value);
}, 900);
</script>
<template>
  <v-container>
    <lazy-admin-layout-page-title
      title="Contact Requests"
      :items="breadcrumbs"
    />
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
            <template #append-inner v-if="searching">
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
          <v-btn
            v-tooltip="'Filters'"
            border
            icon="mdi-filter-outline"
            :color="isFiltered ? 'primary' : ''"
            size="small"
            @click="showFilters = !showFilters"
          >
            <v-badge
              :color="isFiltered ? 'error' : 'transparent'"
              :dot="isFiltered"
            >
              <v-icon icon="mdi-filter-outline" />
            </v-badge>
          </v-btn>
        </div>
      </v-col>
      <template v-if="isFiltered">
        <v-col cols="12" md="2" class="pb-0">
          <v-btn
            block
            border
            height="40"
            prepend-icon="mdi-close"
            @click="resetFilters"
            >Clear Filters</v-btn
          >
        </v-col>
      </template>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card border rounded="lg">
          <v-data-table-server
            v-model="selected"
            v-model:page="pagination.currentPage"
            v-model:items-per-page="pagination.itemsPerPage"
            v-model:items-length="pagination.totalItems"
            show-select
            :headers
            :items
            :loading
            :search="debouncedSearch"
            hide-default-footer
            item-value="id"
            @update:options="loadPortfolio"
          >
            <template #item.status="{ item: { status } }">
              <v-chip
                class="w-100 justify-center"
                :color="getColor(status)"
                rounded="lg"
              >
                {{ status ? "Published" : "Draft" }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item: { id, title } }">
              <lazy-admin-shared-contact-preview-message :id />
              <v-btn
                v-tooltip="'Edit Portfolio'"
                icon="mdi-pencil-outline"
                class="mr-2"
                size="small"
                rounded="lg"
                variant="text"
                :to="`/admin/portfolio/${id}`"
              ></v-btn>
              <lazy-admin-shared-delete
                :title
                type="Portfolio"
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
        <v-chip density="compact">
          {{ currentDisplayedRange.start }} - {{ currentDisplayedRange.end }}
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
