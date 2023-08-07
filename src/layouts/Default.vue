<script setup>
import { defineAsyncComponent } from "vue";

const Navbar = defineAsyncComponent(() =>
  import("@/components/layout/Navbar.vue")
);
const Footer = defineAsyncComponent(() =>
  import("@/components/layout/Footer.vue")
);
</script>
<template>
  <Navbar />
  <router-view></router-view>
  <Footer/>
</template>
