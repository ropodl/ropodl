<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          class="d-flex align-center justify-center"
          cols="12"
          xs="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
        >
          <v-avatar :size="512 / 3">
            <v-img src="/saroj.jpg">
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
              style="text-transform:uppercase;"
            >
              <span>Saroj Poudel</span>
            </h1>
            <h5 class="primary--text display-1 font-weight-light">
              Web Designer
            </h5>
          </div>
          <v-row no-gutters class="mb-6">
            <v-col cols="6" sm="6" md="4" lg="4" xl="4" class="py-0">
              <p class="ma-0 pa-0 title">APRIL 27, 1994</p>
              <p class="ma-0 pa-0 caption">BIRTH</p>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4" class="py-0">
              <p class="ma-0 pa-0 title">NEPAL</p>
              <p class="ma-0 pa-0 caption">NATIONALITY</p>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4" class="py-0">
              <p class="ma-0 pa-0 title">NEPALI, ENGLISH</p>
              <p class="ma-0 pa-0 caption">LANGUAGE</p>
            </v-col>
          </v-row>

          <v-row no-gutters class="mb-6">
            <v-col
              cols="12"
              xs="12"
              sm="4"
              md="4"
              lg="4"
              xl="4"
              class="d-flex justify-space-between"
            >
              <v-btn
                v-for="social in sociallinks"
                :key="social"
                icon
                large
                style="border:0px;"
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
      <workhistory />
      <myspeciality />
      <skills />
      <portfolio />
      <v-row class="mb-6 d-flex">
        <v-col
          v-for="image in images"
          :key="image.i"
          class="mx-auto"
          cols="12"
          sm="6"
          md="4"
        >
          <a target="_blank" :href="image.src">
            <v-card class="rounded-lg ma-0 pa-0">
              <v-img width="100%" height="250px" :src="image.src">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </a>
        </v-col>
      </v-row>
      <experience />
      <education />
      <contacts />

      <v-row no-gutters>
        <v-col cols="12" class="d-flex justify-end align-center ma-0 pa-0">
          <v-img
            eager
            class="avatar"
            src="/icon.png"
            max-height="50"
            max-width="50"
            contain
          ></v-img>
          <p class="ma-0 pa-0">
            <span class="display-1 font-weight-black primary--text"
              >erskull</span
            >
          </p>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      fab: false,
      dark: true,
      sociallinks: [
        {
          id: "1",
          title: "Github",
          icon: "fab fa-github",
          link: "https://www.github.com/erskull"
        },
        {
          id: "2",
          title: "Twitter",
          icon: "fab fa-twitter",
          link: "https://www.twitter.com/ropodl"
        },
        {
          id: "3",
          title: "Dribble",
          icon: "fab fa-dribbble",
          link: "https://dribbble.com/erskull"
        },
        {
          id: "4",
          title: "Email",
          icon: "fas fa-envelope",
          link: "mailto:sarox14@gmail.com"
        }
      ],
      images: [
        {
          id: "1",
          src:
            "https://cdn.dribbble.com/users/1462542/screenshots/15078907/media/77d0f57efb1d67aeb81b8b520e143b36.png"
        },
        {
          id: "2",
          src:
            "https://cdn.dribbble.com/users/1462542/screenshots/13964553/media/de7681bf963d621cf0804f95d24f63f7.jpg"
        },
        {
          id: "3",
          src:
            "https://cdn.dribbble.com/users/1462542/screenshots/14226800/media/510b014866a5d2873bbde1ff8a285218.png"
        }
      ]
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 300;
    }
  }
};
</script>
<style lang="scss">
* {
  scrollbar-color: #121212 #1c1e1f;
}

*::selection {
  color: white !important;
  background: #ef5047 !important;
}

*::-moz-selection {
  color: white !important;
  background: #ef5047 !important;
}

div.v-input__slot {
  border-bottom: 2px solid #ef5047 !important;
}
</style>
