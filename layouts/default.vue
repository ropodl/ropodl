<template>
  <v-app dark>
    <v-main>
      <v-alert tile type="error" dense>Currently on development</v-alert>
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
.list-style-none {
  list-style: none;
}
</style>
