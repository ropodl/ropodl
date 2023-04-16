<script setup>
import { defineAsyncComponent } from "vue";

import { useNetwork } from "@vueuse/core";
const { isOnline } = useNetwork();

const GoTop = defineAsyncComponent(() =>
  import("@/components/layout/GoTop.vue")
);

const OfflineBanner = defineAsyncComponent(() =>
  import("@/components/layout/OfflineBanner.vue")
);
</script>
<template>
  <v-app>
    <v-main>
      <v-layout v-auto-animate>
        <OfflineBanner v-if="!isOnline" />
      </v-layout>
      <router-view />
    </v-main>
    <GoTop />
  </v-app>
</template>
<style>
::selection {
  color: white;
  background: rgba(var(--v-theme-primary), 1);
}
@media (min-width: 1280px) and (min-width: 1920px) {
  .v-container {
    max-width: 1366px !important;
  }
  .v-container.v-container--fluid {
    max-width: 100%;
  }
}
</style>
