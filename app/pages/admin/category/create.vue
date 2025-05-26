<script lang="ts" setup>
const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);
</script>
<template>
  <v-container :fluid="isFluid">
    <v-row>
      <v-col cols="12"> This </v-col>
    </v-row>
  </v-container>
</template>
