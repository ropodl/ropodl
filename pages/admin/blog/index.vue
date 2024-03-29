<script setup lang="ts">
import { Icon } from "@iconify/vue";

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
    title: "Image",
    key: "image",
    width: 0,
  },
  {
    title: "Title",
    key: "title",
  },
  {
    title: "Actions",
    key: "actions",
    width: 150,
  },
];
const deleteBulk = () => {
  //   blog.removeBulk(selected.value);
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

const removeId = async (id: string) => {
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
              variant="tonal"
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
            variant="tonal"
            height="50"
            class="text-capitalize px-10"
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
            <template v-slot:item.image="{ item }">
              <div>
                <v-img
                  cover
                  width="160"
                  class="border rounded-lg"
                  :aspect-ratio="16 / 9"
                  :src="item.featured_image?.url"
                ></v-img>
              </div>
            </template>
            <template v-slot:item.title="{ item }">
              <v-list lines="three">
                <v-list-item class="pl-0">
                  <v-list-item-title class="font-weight-bold">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.excerpt
                  }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </template>
            <template v-slot:item.actions="{ item: { id, title } }">
              <v-btn
                icon
                color="success"
                rounded="lg"
                variant="tonal"
                class="mr-2"
                :to="`/admin/blog/${id}`"
              >
                <v-icon>
                  <Icon icon="mdi:pencil" />
                </v-icon>
              </v-btn>
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
