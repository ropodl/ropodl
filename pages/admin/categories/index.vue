<script setup>
import { VDataTableServer } from "vuetify/labs/VDataTable";

const category = useCategory();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Categories",
});

const loading = ref(true);
const itemsPerPage = ref(10);
const selected = ref([]);

let headers = [
  {
    title: "Title",
    align: "start",
    sortable: false,
    key: "title",
  },
  { title: "Slug", align: "end", key: "slug" },
  { title: "Description", align: "end", key: "description" },
];

const loadCategories = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  await category.getAllCategories(page, itemsPerPage);
  loading.value = false;
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">Categories</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field placeholder="Category Name"></v-text-field>
        <v-text-field placeholder="Slug"></v-text-field>
        <v-textarea placeholder="Category Description"></v-textarea>
        <v-btn block height="50" variant="tonal" class="text-capitalize"
          >Add New Category</v-btn
        >
      </v-col>
      <v-col cols="12" md="8">
        <v-data-table-server
          show-select
          v-model="selected"
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items-length="category.categories.pagination?.totalItems"
          :items="category.categories.categories"
          :loading="loading"
          item-value="name"
          @update:options="loadCategories"
        ></v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>
