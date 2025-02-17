<script setup>
import { Icon } from "@iconify/vue";

const user = useSupabaseUser();

const drawer = ref(true);

const navitems = ref([
  {
    icon: "mdi:home-outline",
    title: "Home",
    routes: "/admin/",
  },
  {
    icon: "mdi:pencil-outline",
    title: "Blog",
    subitems: [
      { title: "All Blogs", routes: "/admin/blog" },
      { title: "Add New", routes: "/admin/blog/create" },
      { title: "Categories", routes: "/admin/categories" },
      { title: "Tags", routes: "/admin/tags" },
    ],
  },
  {
    icon: "mdi:image-outline",
    title: "Portfolio",
    subitems: [
      { title: "All Portfolio", routes: "/admin/portfolio" },
      { title: "Add New", routes: "/admin/portfolio/create" },
      { title: "Work Type", routes: "/admin/portfolio/type" },
    ],
  },
  {
    icon: "mdi:phone-outline",
    title: "Contact Request",
    routes: "/admin/contact-request",
  },
]);
</script>
<template>
  <v-app-bar
    border
    elevation="0"
    height="50"
    order="1"
    style="border-top: 0; border-left: 0; border-right: 0"
  >
    <v-container fluid class>
      <v-row align="center">
        <v-app-bar-nav-icon
          rounded="0"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="white"
              rounded="0"
              height="50"
              v-bind="props"
              class="text-capitalize"
            >
              <v-icon start>
                <Icon icon="mdi:globe" />
              </v-icon>
              Website
              <v-icon end size="sm">
                <Icon icon="mdi:chevron-down" />
              </v-icon>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item
              title="Visit Site"
              target="_blank"
              to="/"
            ></v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-btn rounded="0" height="50">notifications</v-btn>
        <lazy-admin-shared-admin-nav-drop />
      </v-row>
    </v-container>
  </v-app-bar>
  <!-- nav drawer -->
  <v-navigation-drawer v-model="drawer" order="0">
    <v-list density="compact" class="pa-2">
      <template v-for="{ title, subtitle, icon, subitems, routes } in navitems">
        <template v-if="subtitle">
          <v-list-subheader>{{ subtitle }}</v-list-subheader>
        </template>
        <!-- main like dashboard -->
        <template v-if="subitems">
          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" rounded="lg" :title>
                <template v-slot:prepend>
                  <v-icon>
                    <Icon :icon />
                  </v-icon>
                </template>
              </v-list-item>
            </template>
            <span v-for="{ title, miniitems, routes } in subitems">
              <!-- child's option -->
              <span v-if="miniitems">
                <v-list-group rounded="lg">
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" rounded="lg" :title />
                  </template>
                  <!-- grand child -->
                  <template v-if="miniitems">
                    <template v-for="{ routes, title } in miniitems">
                      <v-list-item :title :to="routes" />
                    </template>
                  </template>
                </v-list-group>
              </span>
              <!-- child -->
              <span v-else>
                <v-list-item rounded="lg" exact :title :to="routes" />
              </span>
            </span>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item rounded="lg" :title :to="routes">
            <template v-slot:prepend>
              <v-icon>
                <Icon :icon />
              </v-icon>
            </template>
          </v-list-item>
        </template>
      </template>
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item
          :title="user.email"
          subtitle="THis is a test"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
