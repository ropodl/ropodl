<script setup>
defineProps({
  routes: {
    type: Array,
  },
});

const routes = [
  {
    title: "Dashboard",
    to: "/admin/",
  },
];

const signOut = async () => {
  navigateTo("/", { replace: true, external: true });
};
</script>
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        rounded="lg"
        variant="tonal"
        color="transparent"
        height="50"
        width="50"
        v-bind="props"
      >
        <v-avatar rounded="lg" size="35">
          <v-img :src="user.image?.url"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item v-for="(item, index) in routes" :to="item['to']">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item title="Sign Out" @click="signOut"></v-list-item>
    </v-list>
  </v-menu>
</template>
