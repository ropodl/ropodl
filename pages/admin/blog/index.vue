<script setup>
import { Icon } from "@iconify/vue";
import { itemsPerPageOptions } from "@/utils/constants";

const blog = useAdminBlogStore();
const {
  blogs: items,
  loading,
  pagination,
  filters,
  headers,
} = storeToRefs(blog);
const { all } = blog;

const { setBreadcrumb } = useAdminBreadcrumbStore();
setBreadcrumb([
  {
    title: "All Blogs",
  },
]);

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Blogs",
});

const search = ref("");
const debouncedSearch = ref("");
const selected = ref([]);
const debounceTimeout = ref(null);
const isDebouncing = ref(false);

// Apply debounce to search input
watch(search, (newValue) => {
  // Clear any existing timeout
  if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
  // Show the indicator while debouncing
  isDebouncing.value = true;
  // Set a new timeout to update the debounced search value
  debounceTimeout.value = setTimeout(() => {
    debouncedSearch.value = newValue;
    debounceTimeout.value = null;
    isDebouncing.value = false;
  }, 500); // 500ms debounce delay
});

const deleteBulk = () => {
  selected.value = [];
};
// server side table
const loadBlogs = async ({ sortBy }) => {
  // Use the debounced search value
  await all(sortBy, debouncedSearch.value, filters.value);
};

// Watch for changes in debounced search to trigger data reload
watch(debouncedSearch, () => {
  // Reset to first page when search changes
  pagination.value.currentPage = 1;
  // Reload data with current options
  loadBlogs({
    page: pagination.value.currentPage,
    itemsPerPage: pagination.value.itemsPerPage,
    sortBy: [],
    search: debouncedSearch.value,
  });
});

const removeId = async (id) => {
  await useAxios
    .delete(`/api/blog/${id}`)
    .then((res) => {})
    .catch((err) => {});
};

const getColor = (item) => {
  if (item) return "success";
  else return "primary";
};

const reload = () => {
  pagination.value.currentPage = 1;
  loadBlogs({
    page: 1,
    itemsPerPage: pagination.value.itemsPerPage,
    sortBy: [],
  });
};
// filters
const showFilter = ref(false);
const hasActiveFilters = computed(() => {
  return Object.values(filters.value).some((value) => value !== null);
});
</script>
<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">Blogs</div>
      </v-col>
      <v-col cols="12" md="4"></v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <v-btn
            color="primary"
            class="text-capitalize"
            to="/admin/blog/create"
          >
            Add new Blog
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0" cols="12" md="3">
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
            <template v-slot:append-inner v-if="isDebouncing || loading">
              <v-progress-circular
                indeterminate
                size="16"
                width="2"
              ></v-progress-circular>
            </template>
          </v-text-field>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4"> </v-col>
      <v-col class="py-0" cols="12" md="5">
        <div v-auto-animate class="d-flex align-center justify-end">
          <template v-if="selected.length > 0">
            <v-btn
              v-tooltip="'Delete Bulk Item'"
              border
              icon
              theme="dark"
              size="small"
              class="mr-3"
              @click="deleteBulk"
            >
              <v-icon>
                <Icon icon="mdi:bin-outline" />
              </v-icon>
            </v-btn>
          </template>
          <v-btn
            v-tooltip="'Reload'"
            border
            icon
            size="small"
            class="mr-3"
            @click="reload"
          >
            <v-icon>
              <Icon icon="mdi:reload" />
            </v-icon>
          </v-btn>
          <v-btn
            v-tooltip="'Filters'"
            border
            icon
            :color="hasActiveFilters ? 'primary' : ''"
            size="small"
            @click="showFilter = !showFilter"
          >
            <v-badge
              :color="hasActiveFilters ? 'error' : 'transparent'"
              :dot="hasActiveFilters"
            >
              <v-icon>
                <Icon icon="mdi:filter-outline" />
              </v-icon>
            </v-badge>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row v-auto-animate>
      <template v-if="showFilter">
        <v-col cols="12" md="3" class="pb-0">
          <v-select
            v-model="filters.status"
            clearable
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
      </template>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card border rounded="lg">
          <v-data-table-server
            v-auto-animate
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
            <template #item.created_at="{ item }">
              {{ useDateFormat(item.created_at, "MMM DD, YYYY") }}
            </template>
            <template #item.status="{ item }">
              <v-chip
                class="w-100 justify-center"
                :color="getColor(item.status)"
                rounded="lg"
              >
                {{ item.status ? "Published" : "Draft" }}
              </v-chip>
            </template>
            <template #item.actions="{ item: { id, title } }">
              <lazy-admin-shared-blogs-preview-post :id />
              <v-btn
                v-tooltip="'Edit Post'"
                icon
                rounded="lg"
                class="mr-2"
                variant="text"
                size="small"
                :to="`/admin/blog/${id}`"
              >
                <v-icon>
                  <Icon icon="mdi:pencil" />
                </v-icon>
              </v-btn>
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
