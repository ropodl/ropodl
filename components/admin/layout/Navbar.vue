<script setup>
import { Icon } from "@iconify/vue";

const drawer = ref(true);

const navitems = reactive([
  {
    icon: "mdi:home",
    title: "Home",
    routes: "/admin/",
  },
  {
    icon: "mdi:pencil",
    title: "Blog",
    subitems: [
      { title: "All Blogs", routes: "/admin/blog" },
      { title: "Add New", routes: "/admin/blog/create" },
      { title: "Categories", routes: "/admin/categories" },
      { title: "Tags", routes: "/admin/tags" },
    ],
  },
  {
    icon: "mdi:image",
    title: "Portfolio",
    subitems: [
      { title: "All Blogs", routes: "/admin/portfolio" },
      { title: "Add New", routes: "/admin/portfolio/create" },
      { title: "Work Type", routes: "/admin/portfolio/type" },
    ],
  },
  {
    icon: "mdi:phone",
    title: "Contact Request",
    routes: "/admin/contact-request",
  },
]);
</script>
<template>
  <v-app-bar
    border
    height="50"
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
            <v-list-item title="Visit Site" to="/"></v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <LazyAdminSharedAdminNavDrop />
      </v-row>
    </v-container>
  </v-app-bar>
  <!-- nav drawer -->
  <v-navigation-drawer v-model="drawer" absolute>
    <v-list class="nav overflow-visible" density="compact">
      <template v-for="navitem in navitems">
        <v-list-subheader v-if="navitem.subtitle">
          {{ navitem.subtitle }}
        </v-list-subheader>
        <template v-if="navitem.subitems">
          <v-list-group v-model="navitem.active">
            <template v-slot:activator="{ props }">
              <!-- main like dashboard -->
              <v-list-item v-bind="props">
                <template v-slot:prepend>
                  <v-icon>
                    <Icon :icon="navitem['icon']" />
                  </v-icon>
                </template>
                <v-list-item-title>
                  {{ navitem.title }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <span v-for="subitem in navitem.subitems">
              <span v-if="subitem.miniitems">
                <v-list-group>
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props">
                      <!-- child's option -->
                      <v-list-item-title>
                        {{ subitem.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-if="subitem.miniitems">
                    <v-list-item
                      v-for="mini in subitem.miniitems"
                      :to="mini.routes"
                    >
                      <!-- grand child -->
                      <v-list-item-title>
                        {{ mini.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list-group>
              </span>
              <span v-else>
                <v-list-item exact :to="subitem.routes">
                  <!-- child -->
                  <v-list-item-title>
                    {{ subitem.title }}
                  </v-list-item-title>
                </v-list-item>
              </span>
            </span>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item :to="navitem.routes">
            <template v-slot:prepend>
              <v-icon>
                <Icon :icon="navitem['icon']" />
              </v-icon>
            </template>
            <v-list-item-title>
              {{ navitem.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
