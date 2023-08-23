<script setup>
import { defineAsyncComponent } from "vue";

import { useRoute } from "vue-router";
const route = useRoute();

const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);
</script>

<template>
  <PageTitle
    :title="route['name']"
    :items="[
      { title: 'Home', to: '/' },
      { title: route['name'], to: route['fullPath'] },
    ]"
  />
  <router-view></router-view>
</template>
