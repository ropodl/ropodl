<script lang="ts" setup>
const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);

definePageMeta({
  layout: "admin",
});
useHead({
  title: "Add New Tag",
});
</script>
<template>
  <v-container :fluid="isFluid">
    <v-row>
      <v-col cols="12"> This </v-col>
    </v-row>
  </v-container>
</template>
