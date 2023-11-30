<script lang="ts" setup>
import { Icon } from "@iconify/vue";
</script>
<template>
  <v-snackbar
    dense
    rounded="pill"
    :model-value="true"
    theme="light"
    color="#4c5068"
    :timeout="-1"
  >
    <v-icon class="mr-3">
      <Icon icon="mdi:wifi-strength-alert-outline" />
    </v-icon>
    Looks like you are currently offline.
  </v-snackbar>
</template>
<style>
.v-banner__content {
  align-content: center !important;
  display: grid !important;
}
</style>
