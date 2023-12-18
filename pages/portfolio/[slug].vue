<script setup lang="ts">
const { params } = useRoute();
const { slug } = params;
</script>
<template>
  <NuxtLayout name="page-title">
    <template #title>{{ slug }}</template>
  </NuxtLayout>
</template>
