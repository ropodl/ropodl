<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

await navigateTo('/admin/contact', { replace: true });
</script>

<template />
