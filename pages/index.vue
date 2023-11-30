<script setup>
definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "Home Page | Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
});

defineOgImage({
  provider: "satori",
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
});
</script>
<template>
  <LazySharedHero />
  <LazySharedQuery />
  <LazySharedLoves />
  <LazySharedClients />
  <LazySharedPortfolio />
</template>
