<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<template>
  <v-main>
    <LazyLayoutNavbar />
    <LazyLayoutPageTitle
      :title="route['name']"
      :items="[
        { title: 'Home', to: '/' },
        { title: route['name'], to: route['fullPath'] },
      ]"
    />
    <slot />
    <LazyLayoutFooter />
  </v-main>
</template>
