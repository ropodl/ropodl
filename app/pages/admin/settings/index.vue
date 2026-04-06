<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

await navigateTo('/admin/settings/appearance', { replace: true });
</script>

<template />
