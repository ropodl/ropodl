<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<style>
::selection {
  color: white;
  background: rgba(var(--v-theme-primary),1);
}
</style>
