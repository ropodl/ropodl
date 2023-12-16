<script setup>
definePageMeta({
  layout: "default",
  keepalive: true,
});

useSeoMeta({
  title: "Home Page | Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
});

defineOgImageComponent("Main", {
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
});
</script>
<template>
  <LazySharedHero />
</template>
