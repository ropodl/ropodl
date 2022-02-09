<template>
  <v-app-bar elevation="0" color="transparent" max-height="60">
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="4">
          <v-avatar size="32">
            <v-img src="avatar.png"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" md="4"> </v-col>
        <v-col cols="12" md="4">
          <v-btn text tile height="60" v-for="(link, i) in navLinks" :key="i">{{
            link.title
          }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      navLinks: [
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Project",
        },
        {
          title: "About",
        },
        {
          title: "Contact",
        },
      ],
    };
  },
};
</script>

<style></style>
