<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRoute()
</script>

<template>
  <AdminShell>
    <AdminContentForm
      collection="projects"
      :slug="String(route.params.slug)"
    />
  </AdminShell>
</template>
