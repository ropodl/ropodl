<script setup>
defineProps({
  routes: {
    type: Array,
  },
});

const { loggedIn, session, clear } = useUserSession();
const user = useUserStore();
const { me } = user;

const routes = [
  {
    title: "Dashboard",
    to: "/admin/",
  },
];
</script>
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        rounded="0"
        variant="tonal"
        color="transparent"
        height="50"
        width="40"
        v-bind="props"
      >
        <v-avatar size="35">
          <v-img :src="me?.image"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item v-for="(item, index) in routes" :to="item['to']">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      {{ loggedIn }}{{ session }}
      <v-divider></v-divider>
      <v-list-item title="Sign Out" @click="clear()"></v-list-item>
    </v-list>
  </v-menu>
</template>
