<script setup lang="ts">
const tag = defineModel<any[]>();

const pagination = ref({
  itemsPerPage: 10,
  currentPage: 1,
  totalItems: 1,
  totalPages: 1,
});

const items = ref<any[]>([]);
const loading = ref(false);

const getTags = async (loadMore = false) => {
  loading.value = true;
  if (loadMore && pagination.value.currentPage < pagination.value.totalPages) {
    pagination.value.currentPage += 1;
  } else if (!loadMore) {
    pagination.value.currentPage = 1;
    items.value = [];
  }
  try {
    const res = await useAxios.get("/api/blog-tag", {
      params: {
        page: pagination.value.currentPage,
        itemsPerPage: pagination.value.itemsPerPage,
      },
    });
    if (loadMore) {
      items.value = [...items.value, ...res.tags];
    } else {
      items.value = res.tags;
    }
    pagination.value = res.pagination;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getTags();
});
</script>
<template>
  <v-card class="mb-3">
    <v-card-title>Tags</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pb-0">
      <v-autocomplete
        v-model="tag"
        :items
        :loading
        placeholder="Select tags"
        item-title="name"
        item-value="name"
        chips
        closable-chips
        multiple
      >
        <template v-slot:chip="{ props, item }">
          <v-chip v-bind="props" size="large" :text="item.raw.name"></v-chip>
        </template>

        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :subtitle="item.raw.group"
            :title="item.raw.name"
          ></v-list-item>
        </template>
      </v-autocomplete>
    </v-card-text>
  </v-card>
</template>

<style></style>
