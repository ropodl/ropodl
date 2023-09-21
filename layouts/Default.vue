<script setup>
onBeforeRouteLeave(() => {
  alert("test")
})
</script>
<template>
  <v-main>
    <LazyLayoutNavbar />
    <slot />
    <LazyLayoutFooter />
  </v-main>
</template>
