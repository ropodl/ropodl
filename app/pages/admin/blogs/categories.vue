<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>

<template>
  <AdminTaxonomyManager
    kind="categories"
    title="Blog categories"
    description="Group related articles together."
  />
</template>
