<template>
  <v-row>
    <v-col
      class="d-flex justify-end"
      cols="12"
      xs="12"
      sm="12"
      md="3"
      lg="3"
      xl="3"
    >
      <v-avatar rounded="lg" width="200px" height="200px">
        <v-img src="/me2.jpg">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-avatar>
    </v-col>

    <v-col cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
      <div class="mb-6">
        <h1
          class="display-2 font-weight-bold d-flex justify-space-between"
          style="text-transform: uppercase"
        >
          <span>Saroj Poudel</span>
        </h1>
        <h5 class="primary--text display-1 font-weight-light">
          Web Designer & Developer
        </h5>
      </div>
      <v-row no-gutters class="mb-6">
        <v-col cols="6" sm="6" md="4" lg="4" xl="4" class="py-0">
          <p class="ma-0 pa-0 title">April 27, 1994</p>
          <p class="ma-0 pa-0 caption">BIRTH</p>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="4" xl="4" class="py-0">
          <p class="ma-0 pa-0 title">Nepali</p>
          <p class="ma-0 pa-0 caption">NATIONALITY</p>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="4" xl="4" class="py-0">
          <p class="ma-0 pa-0 title">Nepali, English</p>
          <p class="ma-0 pa-0 caption">LANGUAGE</p>
        </v-col>
      </v-row>

      <v-row no-gutters class="mb-6">
        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
          <v-btn
            v-for="(social, i) in sociallinks"
            :key="i"
            icon
            large
            class="mr-6"
            color="primary"
            router
            link
            :href="social.link"
            target="_blank"
          >
            <v-icon>{{ social.icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      sociallinks: [
        {
          title: "Instagram",
          icon: "fab fa-instagram",
          link: "https://www.instagram.com/ropodl",
        },
        {
          title: "Github",
          icon: "fab fa-github",
          link: "https://www.github.com/ropodl",
        },
        {
          title: "Twitter",
          icon: "fab fa-twitter",
          link: "https://www.twitter.com/ropodl",
        },
        {
          title: "Dribble",
          icon: "fab fa-dribbble",
          link: "https://dribbble.com/ropodl",
        },
        {
          title: "Email",
          icon: "fas fa-envelope",
          link: "mailto:sarox14@gmail.com",
        },
      ],
    };
  },
};
</script>

<style></style>
