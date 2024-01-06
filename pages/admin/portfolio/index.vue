<script setup lang="ts">
import { Icon } from "@iconify/vue";

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Portfolio",
});

const loading = <any>ref(true);
const selected = <any>ref([]);
const portfolios = <any>ref([]);
const pagination = <any>ref({
  itemsPerPage: 10,
  currentPage: 1,
  totalItems: 1,
  totalPages: 1,
});

const headers = [
  {
    title: "Featured Image",
    key: "image",
    width: 0,
    align: "center",
  },
  {
    title: "Title",
    key: "title",
    align: "start",
  },
  {
    title: "Actions",
    key: "actions",
    width: 150,
    align: "center",
  },
];
const deleteBulk = () => {
  //   blog.removeBulk(selected.value);
  selected.value = [];
};
// server side table
const loadBlogs = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  const { data, error } = await useFetch("/api/portfolio", {
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
  portfolios.value = data.value;
  loading.value = false;
};

const removeId = (id: any) => {
  console.log(id);
};
</script>
<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">Portfolios</div>
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
            variant="tonal"
            height="50"
            class="text-capitalize px-10"
            to="/admin/portfolio/create"
          >
            Add new Portfolio
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        {{ portfolios }}
        <v-card border rounded="lg">
          <v-data-table-server
            v-model="selected"
            show-select
            :headers
            :loading
            :items-per-page="pagination.itemsPerPage"
            :items="portfolios"
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
                  <v-list-item-title class="font-weight-bold">
                    <template v-if="item.status === false">
                      <span class="text-warning">Draft - </span>
                    </template>
                    {{ item.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.excerpt
                  }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                color="success"
                rounded="lg"
                variant="tonal"
                class="mr-2"
                :to="`/admin/portfolio/${item.id}`"
              >
                <v-icon>
                  <Icon icon="mdi:pencil" />
                </v-icon>
              </v-btn>
              <AdminSharedDelete
                type="Blog"
                :title="item.title"
                @delete-action="removeId(item.id)"
              />
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
