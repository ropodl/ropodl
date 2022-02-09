<template>
  <div class="footer-link">
    <v-container>
      <v-row class="pb-8 pt-16">
        <v-col cols="12" md="12" class="py-0">
          <div class="d-flex flex-wrap justify-center">
            <v-btn text class="mr-3" v-for="(nav, i) in navLinks" :key="i">
              {{ nav.title }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "FooterLink",
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
