<script setup>
definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Contact Page | Saroj Poudel",
  meta: [
    {
      name: "description",
      content:
        "Graphic Designer and Web Developer from Nepal specializing in VueJs and Express JS",
    },
  ],
});
defineOgImage({
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
});
</script>
<template>
  <LazySharedForm />
</template>
