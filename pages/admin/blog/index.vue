<script setup lang="ts">
import { Icon } from "@iconify/vue";
// import type { BlogPost } from "./types.ts";

const { read } = useAdminBlogStore();
// await blog.read();
// console.log(blog);

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Blogs",
});

const loading = ref(true);
const selected = ref([]);
const blogs = ref([]);

const pagination = ref({
  itemsPerPage: 10,
  currentPage: 1,
  totalItems: 1,
  totalPages: 1,
});

const headers = [
  {
    title: "Title",
    key: "title",
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
const loadBlogs = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  const { data, error } = await useFetch("/api/blog", {
    params: {
      page,
      itemsPerPage,
      sortBy,
    },
  });
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  blogs.value = data.value?.blogs;
  loading.value = false;
};

const removeId = async (id: number) => {
  const { error } = await useFetch("/api/blog/" + id, {
    method: "DELETE",
  });

  if (error.value) {
    return console.log(error.value);
  }
  // loadBlogs({1,10})
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
          <template v-if="selected.length > 0">
            <v-btn
              icon
              rounded="lg"
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
      <v-col cols="12">
        <v-card border rounded="lg">
          <v-data-table-server
            show-select
            v-model="selected"
            :items-per-page="pagination.itemsPerPage"
            :headers="headers"
            :items="blogs"
            :loading="loading"
            :items-length="pagination.totalItems"
            item-value="id"
            @update:options="loadBlogs"
          >
            <template v-slot:item.actions="{ item: { id, title } }">
              <v-tooltip theme="light" text="View Post">
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
                      <Icon icon="mdi:eye" />
                    </v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
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
  </v-container>
</template>
