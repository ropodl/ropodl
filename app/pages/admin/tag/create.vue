<script lang="ts" setup>
const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);
</script>
<template>
  <v-container :fluid="isFluid"> fluid </v-container>
</template>

<style></style>
