<script setup lang="ts">
const { params } = useRoute();
const { id } = params;

const { data, error } = await useFetch(`/api/frontend/portfolio/${id}`);
const { title, main_image, content } = data.value;
</script>
<template>
  <NuxtLayout name="page-title">
    <template #title>
      {{ title }}
    </template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-img :src="main_image.url"></v-img>
        </v-col>
        <v-col cols="12" md="4">
          <LazySharedDynamicContent :content />
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>
