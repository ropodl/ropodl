<script setup lang="ts">
const category = defineModel();

const pagination = ref({
  itemsPerPage: 10,
  currentPage: 1,
  totalItems: 1,
  totalPages: 1,
});

const items = ref<any[]>([]);
const loading = ref(false);

const getCategories = async (loadMore = false) => {
  loading.value = true;
  if (loadMore && pagination.value.currentPage < pagination.value.totalPages) {
    pagination.value.currentPage += 1;
  } else if (!loadMore) {
    pagination.value.currentPage = 1;
    items.value = [];
  }
  try {
    const res = await useAxios.get("/api/blog-category", {
      params: {
        page: pagination.value.currentPage,
        itemsPerPage: pagination.value.itemsPerPage,
      },
    });
    if (loadMore) {
      items.value = [...items.value, ...res.categories];
    } else {
      items.value = res.categories;
    }
    pagination.value = res.pagination;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getCategories();
});
</script>
<template>
  <v-card class="mb-3">
    <v-card-title>Category</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-select
        v-model="category"
        placeholder="Select a category"
        :items
        :loading
        item-title="title"
        item-value="id"
        clearable
      >
        <template
          #append-item
          v-if="pagination.currentPage < pagination.totalPages"
        >
          <v-divider></v-divider>
          <v-list-item
            title="Load More Categories"
            @click="getCategories(true)"
          ></v-list-item>
        </template>
      </v-select>
      <v-btn block>Add New Category</v-btn>
    </v-card-text>
  </v-card>
</template>
