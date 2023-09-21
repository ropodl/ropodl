<script setup>
import { Icon } from "@iconify/vue";
const snackbar = useSnackbar();
</script>
<template>
  <v-snackbar dense rounded="pill" theme="light" v-model="snackbar.snackbar.show" :color="snackbar.snackbar.color" class="global-snackbar">
    {{ snackbar.snackbar.text }}
    <template v-slot:actions>
      <v-btn icon variant="tonal" theme="dark" color="white" @click="snackbar.snackbar.show = false">
        <v-icon>
          <Icon icon="mdi:close" />
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<style>
.global-snackbar .v-snackbar__actions {
  margin: 0 !important;
}
</style>
