<script setup>
definePageMeta({
  layout: "default",
});
useHead({
  title: "Home Page | Saroj Poudel",
  meta: [
    {
      name: "description",
      content:
        "Graphic Designer and Web Developer from Nepal specializing in VueJs and Express JS",
    },
  ],
});
</script>
<template>
  <LazySharedHero />
  <LazySharedQuery />
  <LazySharedLoves />
  <LazySharedClients />
  <LazySharedPortfolio />
</template>
