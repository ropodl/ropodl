<script setup>
import { Icon } from "@iconify/vue";

const user = useSupabaseUser();

const drawer = ref(true);
const search = ref(false);

const navItems = ref([
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
    color="rgba(var(--v-theme-background),0.8)"
    class="blur-8"
    style="border-top: 0; border-left: 0; border-right: 0"
  >
    <v-container fluid class="py-0">
      <v-row align="center" justify="space-between">
        <v-col class="pa-0" cols="12" md="4">
          <div class="d-flex align-center justify-start">
            <v-app-bar-nav-icon
              height="50"
              rounded="0"
              @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <lazy-admin-layout-breadcrumbs />
          </div>
        </v-col>
        <v-col class="pa-0" cols="12" md="4">
          <div class="d-flex align-center justify-center overflow-x-scroll">
            <v-btn
              border
              :ripple="false"
              height="40"
              width="200"
              class="justify-start"
              @click="search = true"
            >
              <span>Search...</span>
              <v-card-text class="d-flex align-center pe-0 py-0">
                <v-icon
                  class="mr-1"
                  size="small"
                  icon="mdi-apple-keyboard-command"
                />
                + k</v-card-text
              >
            </v-btn>
          </div>
        </v-col>
        <v-col class="pa-0" cols="12" md="4">
          <div class="d-flex align-center justify-end">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  color="white"
                  rounded="0"
                  height="50"
                  v-bind="props"
                  class="text-capitalize pa-0"
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
            <v-btn rounded="0" height="50">notifications</v-btn>
            <lazy-admin-shared-admin-nav-drop />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
  <!-- search bar -->
  <lazy-admin-layout-search-bar v-model="search" :navItems :profileItems="[]" />
  <!-- nav drawer -->
  <v-navigation-drawer
    v-model="drawer"
    color="rgba(var(--v-theme-background),0.8)"
    class="blur-8"
  >
    <v-list density="compact" class="pa-2">
      <template v-for="{ title, subtitle, icon, subitems, routes } in navItems">
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
      <v-divider></v-divider>
      <v-menu
        attach="body"
        location="right"
        :content-props="{
          style: 'top: unset important; bottom: 0;',
        }"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            block
            :ripple="false"
            color="transparent"
            height="70"
            class="justify-start pl-0"
            content-class="w-100"
            rounded="0"
          >
            <template #append>
              <v-icon>
                <Icon icon="mdi:unfold-more-horizontal" />
              </v-icon>
            </template>
            <v-list-item>
              <template #prepend>
                <v-avatar rounded="lg">
                  <v-img src="/image/portfolio/api(new)/api.avif"></v-img>
                </v-avatar>
              </template>
              <v-list-item-title class="text-start">
                Saroj Poudel
              </v-list-item-title>
              <v-list-item-subtitle class="text-start">
                {{ user.email }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-btn>
        </template>
        <v-card>
          <template v-for="(item, index) in [{ title: 'items' }]" :key="index">
            <v-list-item>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-power" title="Sign Out" />
        </v-card>
      </v-menu>
    </template>
  </v-navigation-drawer>
</template>
