<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>

<template>
  <AdminShell>
    <AdminContentForm collection="projects" />
  </AdminShell>
</template>
