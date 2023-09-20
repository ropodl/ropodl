<script setup>
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
  },
];

const logout = () => {
  localStorage.removeItem("user_auth_token");
  user.userData = [];
  navigateTo("/", { replace: true });
};
</script>
<template>
  <v-app-bar height="50" class="px-5">
    <v-container fluid class>
      <v-row align="center">
        <v-app-bar-nav-icon
          rounded="0"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        This is vue project
        <v-spacer></v-spacer>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn rounded="0" height="50" width="40" v-bind="props">
              <v-avatar size="35">
                <v-img src="/favicon.ico"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in routes"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item title="Sign Out" @click="logout"></v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" class="border-0">
    <v-list density="compact">
      <template v-for="(route, index) in routes">
        <v-list-item :to="route['link']" :title="route['title']">
          <!-- <v-list-item-title>{{ route["title"] }}</v-list-item-title> -->
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped></style>
