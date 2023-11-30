<script setup>
defineProps({
  routes: {
    type: Array,
  },
});

const { signOut } = useAuth();
const user = useUserStore();
const { me } = user;
</script>
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        rounded="0"
        variant="tonal"
        color="transparent"
        height="60"
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
      <v-divider></v-divider>
      <v-list-item title="Sign Out" @click="signOut()"></v-list-item>
    </v-list>
  </v-menu>
</template>
