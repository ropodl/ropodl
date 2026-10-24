<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>

<template>
  <AdminShell>
    <AdminContentForm collection="blogs" />
  </AdminShell>
</template>
