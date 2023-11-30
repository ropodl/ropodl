<script setup>
defineProps({
  title: { type: String, default: "Title" },
  items: { type: Array, default: [{ title: "Home", to: "/" }] },
  height: { type: Number, default: 250 },
});
</script>
<template>
  <v-card
    border
    rounded="0"
    class="d-flex align-end justify-center text-center"
    :height="height"
    style="border-top: 0; border-left: 0; border-right: 0"
  >
    <v-card-text>
      <v-card-title class="text-h3 font-weight-black text-uppercase">
        {{ title }}
      </v-card-title>
      <v-breadcrumbs
        class="text-uppercase justify-center"
        :items="items"
      ></v-breadcrumbs>
    </v-card-text>
  </v-card>
</template>
