<script setup>
defineProps({
  title: { type: String, default: "Title" },
  items: { type: Array, default: ["Home"] },
});
</script>
<template>
  <v-card
    color="#3a3d4f"
    rounded="0"
    elevation="10"
    class="d-flex align-end justify-center text-center"
    height="300"
  >
    <v-card-text>
      <v-card-title class="text-h3 font-weight-black text-uppercase">
        {{ title }}
      </v-card-title>
      <v-breadcrumbs class="text-uppercase justify-center" :items="items"></v-breadcrumbs>
    </v-card-text>
  </v-card>
</template>
