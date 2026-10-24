<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

useSeoMeta({ title: 'Admin dashboard', description: 'ropodl website administration.', robots: 'noindex, nofollow' })

await navigateTo('/admin', { replace: true })
</script>
