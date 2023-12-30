<script setup lang="ts">
const { params } = useRoute();
const { id } = params;

const { data, error } = await useFetch(`/api/frontend/portfolio/${id}`);
const { title } = data.value;
</script>
<template>
  <NuxtLayout name="page-title">
    <template #title>
      {{ title }}
    </template>
    {{ data }}
  </NuxtLayout>
</template>
