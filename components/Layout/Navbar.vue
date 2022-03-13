<template>
  <div class="navbar">
    <v-app-bar elevation="0" color="transparent" max-height="50">
      <v-container>
        <v-row align="center">
          <v-col cols="12" sm="6" md="6">
            <v-avatar size="32">
              <v-img src="avatar.png"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn
                text
                tile
                height="60"
                class="text-capitalize"
                v-for="(link, i) in navLinks"
                :key="i"
                >{{ link.title }}</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
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

<style lang="scss">
div.navbar {
  position: sticky;
  top: 0;
  z-index: 9999;
  header {
    &.v-app-bar {
      backdrop-filter: blur(20px);
    }
  }
}
</style>
