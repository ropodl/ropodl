<script setup lang="ts">
const route = useRoute();
const { mdAndUp, smAndDown } = useDisplay();

const paddedNav = ref(["blogs-slug"]);

const isBlog = computed(() => {
  if (paddedNav.value.includes(route.name?.toString() ?? "")) return "";
  else if (smAndDown.value) return "";
  else return "mt-10";
});
</script>

<template>
  <template v-if="mdAndUp">
    <lazy-layout-navbar />
  </template>
  <v-main :class="isBlog">
    <slot />
    <lazy-layout-footer />
  </v-main>
  <lazy-layout-snackbar />
  <template v-if="smAndDown">
    <lazy-layout-bottombar />
  </template>
</template>
