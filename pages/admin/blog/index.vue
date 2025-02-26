<script setup>
import { Icon } from "@iconify/vue";
import { itemsPerPageOptions } from "@/utils/constants";

const blog = useAdminBlogStore();
const { blogs: items, loading, pagination } = storeToRefs(blog);
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

const rawSearch = ref("");
const debouncedSearch = ref("");
const selected = ref([]);
const debounceTimeout = ref(null);
const isDebouncing = ref(false);

// Apply debounce to search input
watch(rawSearch, (newValue) => {
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

const headers = [
  {
    title: "Title",
    key: "title",
  },
  { title: "Created At", key: "created_at" },
  {
    title: "Status",
    key: "status",
    align: "center",
    sortable: false,
    width: 100,
  },
  {
    title: "Actions",
    key: "actions",
    align: "center",
    sortable: false,
    width: 200,
  },
];
const deleteBulk = () => {
  selected.value = [];
};
// server side table
const loadBlogs = async ({ page, itemsPerPage, sortBy, search }) => {
  // Use the debounced search value
  await all(page, itemsPerPage, sortBy, debouncedSearch.value);
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
  const { error } = await useFetch("/api/blog/" + id, {
    method: "DELETE",
  });

  if (error.value) return console.log(error.value);
};

const getColor = (item) => {
  if (item) return "success";
  else return "primary";
};
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
            v-model="rawSearch"
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
            <v-tooltip theme="light" text="Delete Bulk Item">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
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
            </v-tooltip>
          </template>
          <v-tooltip theme="light" text="Filter">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" border icon theme="dark" size="small">
                <v-icon>
                  <Icon icon="mdi:filter-outline" />
                </v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card border rounded="lg">
          <v-data-table-server
            v-model="selected"
            v-model:page="pagination.currentPage"
            v-model:items-per-page="pagination.itemsPerPage"
            :items-length="pagination.totalItems"
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
              {{ useDateFormat(item.created_at, "YYYY-MM-DD | HH:mm a") }}
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
              <lazy-admin-shared-blogs-view-post :id />
              <v-tooltip theme="light" text="Edit Post">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
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
                </template>
              </v-tooltip>
              <AdminSharedDelete
                type="Blog"
                :title="title"
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
        <div class="d-flex justify-center">
          <v-pagination
            v-model="pagination.currentPage"
            :length="pagination.totalPages"
            density="compact"
            :total-visible="7"
            rounded="lg"
          ></v-pagination>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="d-flex align-center justify-end">
          Items Per Page:&nbsp;
          <v-select
            v-model="pagination.itemsPerPage"
            density="compact"
            variant="outlined"
            rounded="lg"
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
