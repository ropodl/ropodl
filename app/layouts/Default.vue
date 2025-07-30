<script setup>
const { mdAndUp } = useDisplay();
</script>
<template>
  <template v-if="mdAndUp">
    <lazy-layout-navbar />
  </template>
  <v-main style="margin-top: 50px">
    <slot />
  </v-main>
  <lazy-layout-footer />
  <lazy-layout-snackbar />
</template>
