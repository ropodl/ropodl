<script lang="ts" setup>
const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

useHead({
  title: "Work Type",
});
</script>
<template>
  <v-container :fluid="isFluid">
    <v-row>
      <v-col cols="12">Hello from work type</v-col>
    </v-row>
  </v-container>
</template>

<style></style>
