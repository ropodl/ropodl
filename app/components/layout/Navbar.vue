<script setup lang="ts">
import { pages } from "@/utils/constants";

const current = ref("/");
</script>
<template>
  <v-card
    flat
    rounded="lg"
    location="top"
    class="position-fixed pa-1"
    style="
      top: 10px;
      z-index: 1010;
      background-color: rgba(var(--v-theme-surface), 0.7);
      backdrop-filter: blur(8px);
    "
  >
    <v-tabs
      v-model="current"
      color="primary"
      density="compact"
      hide-slider
      show-arrows
      rounded="lg"
    >
      <template v-for="{ icon, title, to } in pages">
        <v-tab
          color="brand"
          rounded="lg"
          :to
          :value="to"
          :variant="current === to ? 'tonal' : 'text'"
        >
          {{ title }}.
        </v-tab>
      </template>
    </v-tabs>
  </v-card>
</template>
