<template>
  <v-app dark>
    <v-main>
      <!-- <v-alert tile type="error" dense>Currently on development</v-alert> -->
      <Layout-Navbar />
      <Nuxt keep-alive />
      <Layout-Footer />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>
<style lang="scss">
.h-100 {
  height: 100%;
}
.list-style-none {
  list-style: none;
}
</style>
