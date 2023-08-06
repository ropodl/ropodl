<script setup>
const links = [
  {
    title: "Home",
    href: "/",
  },
];
</script>
<template>
  <v-container
    style="position: absolute; top: 10px; left: 0; right: 0; z-index: 10"
  >
    <v-card
      flat
      color="transparent"
      height="60"
      class="d-flex align-center pa-5"
    >
      <v-row justify="space-between">
        <v-col cols="12" md="4"></v-col>
        <!-- <v-col cols="12" md="4"></v-col> -->
        <v-col cols="12" md="6">
          <div class="d-flex">
            <v-spacer></v-spacer>
            <ul class="nav-link d-flex">
              <li v-for="(link, i) in links">
                <router-link :to="link['href']">
                  {{ link["title"] }}
                </router-link>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
ul.nav-link {
  list-style: none;
  li {
    a {
      color: white;
      text-decoration: none;
    }
  }
}
</style>
