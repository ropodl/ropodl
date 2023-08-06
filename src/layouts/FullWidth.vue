<script setup>
import { defineAsyncComponent } from "vue";

const Footer = defineAsyncComponent(() =>
  import("@/components/layout/Footer.vue")
);
</script>
<template>
  <router-view></router-view>
  <Footer />
</template>

<style lang="scss" scoped></style>
