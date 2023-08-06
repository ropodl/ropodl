<script setup>
import { defineAsyncComponent } from "vue";

const Navbar = defineAsyncComponent(() =>
  import("@/components/layout/Navbar.vue")
);
</script>
<template>
  <Navbar />
  <router-view></router-view>
</template>
