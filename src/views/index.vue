<script setup>
import { defineAsyncComponent } from "vue";

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

const socials = [
  {
    name: "Instagram",
    icon: "fa:fa-brands fa-instagram",
    link: "https://instagram.com/ropodl/",
  },
  {
    name: "Dribbble",
    icon: "fa:fa-brands fa-dribbble",
    link: "https://dribbble.com/ropodl/",
  },
  {
    name: "Linkedin",
    icon: "fa:fa-brands fa-linkedin-in",
    link: "https://linkedin.com/in/ropodl/",
  },
  {
    name: "GitHub",
    icon: "fa:fa-brands fa-github",
    link: "https://github.com/ropodl/",
  },
];
</script>
<template>
  <Hero />
  <Query />
  <Loves />
  <Clients />
  <Portfolio />
  <Form />
</template>
