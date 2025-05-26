<script setup lang="ts">
import { itemsPerPageOptions } from "@/utils/constants";
// useAdminBlogStore
const blog = useAdminBlogStore();
const {
  blogs: items,
  loading,
  pagination,
  showFilters,
  isFiltered,
  filters,
  headers,
  searching,
  currentDisplayedRange,
} = storeToRefs(blog);
const { all, resetFilters } = blog;

const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Tags",
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
const loadBlogs = (options: Options) => {
  all(options.sortBy || []);
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
  loadBlogs({
    sortBy: [],
  });
};

const breadcrumbs = [
  {
    title: "Home",
    to: "/admin/",
  },
  {
    title: "All blogs",
    to: "/admin/blog",
  },
  {
    title: "Category",
    to: "/admin/blog/category",
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
  <v-container :fluid="isFluid">
    <lazy-admin-layout-page-title title="All Tags" :items="breadcrumbs">
      <v-btn color="primary" class="text-capitalize" to="/admin/blog/create">
        Add new
      </v-btn>
    </lazy-admin-layout-page-title>
    <v-row justify="space-between">
      <v-col class="py-md-0" cols="12" sm="6" md="4">
        <div class="d-flex align-center justify-start">
          <v-text-field
            v-model.trim="search"
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
            icon
            size="small"
            class="mr-3"
            @click="reload"
          >
            <v-icon icon="mdi-reload" />
          </v-btn>
          <v-btn
            v-tooltip="'Filters'"
            border
            icon
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
    </v-row>
    <v-row v-auto-animate>
      <template v-if="showFilters">
        <v-col cols="12" sm="4" md="3" class="pb-0">
          <v-select
            v-model="filters.status"
            clearable
            persistent-clear
            density="compact"
            rounded="lg"
            placeholder="Filter By Status"
            hide-details
            :items="[
              { title: 'Published', value: true },
              {
                title: 'Draft',
                value: false,
              },
            ]"
          />
        </v-col>
        <v-col cols="12" md="3" class="pb-0">
          <v-date-input
            v-model="filters.date"
            clearable
            persistent-clear
            color="primary"
            density="compact"
            rounded="lg"
            variant="outlined"
            prepend-icon=""
            append-inner-icon="mdi-calendar"
            location="bottom"
            weeks-in-month="static"
            placeholder="Filter By Date"
            multiple="range"
            hide-details
          />
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
            @update:options="loadBlogs"
          >
            <template #item.created_at="{ item: { created_at } }">
              {{ useDateFormat(created_at, "MMM DD, YYYY") }}
            </template>
            <template #item.status="{ item: { status } }">
              <v-chip
                class="w-100 justify-center"
                :color="getColor(status)"
                rounded="lg"
              >
                {{ status ? "Published" : "Draft" }}
              </v-chip>
            </template>
            <template #item.actions="{ item: { id, title } }">
              <lazy-admin-shared-blogs-preview-post :id />
              <v-btn
                v-tooltip="'Edit Post'"
                icon="mdi-pencil"
                rounded="lg"
                class="mr-2"
                variant="text"
                size="small"
                :to="`/admin/blog/${id}`"
              ></v-btn>
              <lazy-admin-shared-delete
                type="Blog"
                :title
                @delete-action="removeId(id)"
              />
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center">
      <template v-if="pagination">
        <v-col cols="12" md="3" class="py-0">
          Showing
          <v-chip density="compact">
            {{ currentDisplayedRange.start }} - {{ currentDisplayedRange.end }}
          </v-chip>
          out of {{ pagination.totalItems }}
        </v-col>
        <v-col cols="12" md="6" class="py-0">
          <v-pagination
            v-model="pagination.currentPage"
            :disabled="loading"
            :length="pagination.totalPages"
            density="compact"
            rounded="lg"
          ></v-pagination>
        </v-col>
        <v-col cols="12" md="3" class="py-0">
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
      </template>
    </v-row>
  </v-container>
</template>
