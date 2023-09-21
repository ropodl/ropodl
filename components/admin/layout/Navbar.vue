<script setup>
import { Icon } from '@iconify/vue';
const drawer = ref(true);

const user = useUser();
const routes = [
  {
    title: "Dashboard",
    link: "/admin",
  },
  {
    title: "Clients",
    link: "/admin/clients",
  }, {
    title: "Blogs",
    link: "/admin/blogs",
  },
];


</script>
<template>
  <v-app-bar height="50">
    <v-container fluid class>
      <v-row align="center">
        <v-app-bar-nav-icon rounded="0" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="white" rounded="0" height="50" v-bind="props" class="text-capitalize">
              <v-icon start>
                <Icon icon="mdi:home" />
              </v-icon> Website
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item title="Visit Site" to="/" target="_blank"></v-list-item>
            <!-- <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item> -->
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <LazyAdminSharedAdminNavDrop />
      </v-row>
    </v-container>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" class="border-0">
    <v-list density="compact">
      <template v-for="(route, index) in routes">
        <v-list-item :to="route['link']" :title="route['title']">
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>