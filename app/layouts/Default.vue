<script setup lang="ts">
const route = useRoute();
const { mdAndUp } = useDisplay();

const paddedNav = ref(["blogs-slug", "index"]);

const isBlog = computed(() => {
  if (paddedNav.value.includes(route.name?.toString() ?? "")) return "";
  else return "mt-16";
});
</script>

<template>
  <template v-if="mdAndUp">
    <lazy-layout-navbar />
  </template>
  <v-main :class="isBlog">
    <slot />
  </v-main>
  <lazy-layout-footer />
  <lazy-layout-snackbar />
</template>
