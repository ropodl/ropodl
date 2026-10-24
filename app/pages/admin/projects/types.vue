<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>

<template>
  <AdminTaxonomyManager
    kind="work-types"
    title="Project work types"
    description="Organize projects by the kind of work they represent."
  />
</template>
