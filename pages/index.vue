<script setup>
definePageMeta({
  keepalive: true,
});

useSeoMeta({
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogTitle: "Saroj Poudel",
  ogDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogUrl: "https://ropodl.vercel.app",
  twitterTitle: "Saroj Poudel",
  twitterDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  twitterCard: "summary_large_image",
});

defineOgImageComponent("Main", {
  headline: "Website",
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
});
</script>
<template>
  <LazySharedHero />
</template>
