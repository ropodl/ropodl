<template>
  <v-breadcrumbs class="text-lowercase py-0" :items="breadcrumbs.items">
  </v-breadcrumbs>
</template>
<script setup>
const breadcrumbs = useAdminBreadcrumbStore();
</script>
