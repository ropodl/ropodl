<script setup>
import { Icon } from "@iconify/vue";
const snackbar = useSnackbar();
</script>
<template>
  <v-snackbar
    dense
    rounded="pill"
    theme="light"
    :model-value="true"
    :color="snackbar.snackbar.color"
    class="global-snackbar"
  >
    <!-- v-model="snackbar.snackbar.show" -->
    {{ snackbar.snackbar.text }}a
    <template v-slot:actions>
      <v-btn icon variant="tonal" theme="dark" color="primary">
        <v-icon>
          <Icon icon="mdi:close" />
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<style scoped>
.v-snackbar__actions {
  margin: 0 !important;
}
</style>
