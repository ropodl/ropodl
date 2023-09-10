<script setup>
import { defineAsyncComponent } from "vue";

import { useTitle } from "@vueuse/core";
useTitle("Home Page | Saroj Poudel");

const Hero = defineAsyncComponent(() => import("@/components/shared/Hero.vue"));
const Query = defineAsyncComponent(() =>
  import("@/components/shared/Query.vue")
);
const Loves = defineAsyncComponent(() =>
  import("@/components/shared/Loves.vue")
);
const Portfolio = defineAsyncComponent(() =>
  import("@/components/shared/Portfolio.vue")
);
const Clients = defineAsyncComponent(() =>
  import("@/components/shared/Clients.vue")
);
const Form = defineAsyncComponent(() => import("@/components/shared/Form.vue"));
</script>
<template>
  <Hero />
  <Query />
  <Loves />
  <Clients />
  <Portfolio />
  <!-- <Form /> -->
</template>
