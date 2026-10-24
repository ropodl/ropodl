<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>

<template>
  <AdminTaxonomyManager
    kind="tags"
    title="Blog tags"
    description="Add keywords to help organize articles."
  />
</template>
