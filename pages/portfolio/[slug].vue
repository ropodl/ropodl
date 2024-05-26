<script setup lang="ts">
const { params } = useRoute();
const { slug } = params;

console.log(slug, "this");

const { data: portfolio, error } = await useFetch(
  `/api/frontend/portfolio/${slug}`
);
</script>
<template>
  <NuxtLayout name="page-title">
    <template #title>{{ portfolio.title }}</template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card flat border>
            <v-img :src="portfolio.main_image.url"></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <LazySharedDynamicContent :content="portfolio.content" />
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>
