<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
          <v-avatar size="256">
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
            <!-- <h1 class="display-2 font-weight-bold d-flex justify-space-between" style="text-transform:uppercase;">
                BETA TESTING</h1> -->
            <h1
              class="display-2 font-weight-bold d-flex justify-space-between"
              style="text-transform:uppercase;"
            >
              <span>Saroj Poudel</span>
              <!-- <span>
                <v-btn icon color="primary" @click="darkmode">
                  <v-icon v-if="!this.$vuetify.theme.dark">brightness_3</v-icon>
                  <v-icon v-if="this.$vuetify.theme.dark"
                    >brightness_high</v-icon
                  >
                </v-btn>
              </span> -->
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
                icon
                outlined
                style="border:0px;"
                color="primary"
                router
                link
                href="https://www.github.com/erskull"
                target="_blank"
              >
                <v-icon>fab fa-github</v-icon>
              </v-btn>
              <v-btn
                icon
                outlined
                style="border:0px;"
                color="primary"
                router
                link
                href="https://www.twitter.com/ropodl"
                target="_blank"
              >
                <v-icon>fab fa-twitter</v-icon>
              </v-btn>
              <v-btn
                icon
                outlined
                style="border:0px;"
                color="primary"
                router
                link
                href="https://dribbble.com/erskull"
                target="_blank"
              >
                <v-icon>fab fa-dribbble</v-icon>
              </v-btn>
              <v-btn
                icon
                outlined
                style="border:0px;"
                color="primary"
                router
                link
                href="mailto:sarox14@gmail.com"
                target="_blank"
              >
                <v-icon>fas fa-envelope</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <workhistory />
      <myspeciality />
      <skills />
      <portfolio />
      <v-row class="mb-6">
        <v-col cols="12" md="4">
          <a
            target="_blank"
            href="https://cdn.dribbble.com/users/1462542/screenshots/13964553/media/de7681bf963d621cf0804f95d24f63f7.jpg"
          >
            <v-card class="rounded-lg ma-0 pa-0">
              <v-img
                width="100%"
                height="200px"
                src="https://cdn.dribbble.com/users/1462542/screenshots/13964553/media/de7681bf963d621cf0804f95d24f63f7.jpg"
              ></v-img>
            </v-card>
          </a>
        </v-col>
        <v-col cols="12" md="4">
          <a
            target="_blank"
            href="https://cdn.dribbble.com/users/1462542/screenshots/14226800/media/510b014866a5d2873bbde1ff8a285218.png"
          >
            <v-card class="rounded-lg ma-0 pa-0">
              <v-img
                width="100%"
                height="200px"
                src="https://cdn.dribbble.com/users/1462542/screenshots/14226800/media/510b014866a5d2873bbde1ff8a285218.png"
              ></v-img>
            </v-card>
          </a>
        </v-col>
        <v-col cols="12" md="4">
          <a
            target="_blank"
            href="https://cdn.dribbble.com/users/1462542/screenshots/11289842/media/e89ef0017af23e8cf0f6f10bc79ccf0a.png"
          >
            <v-card class="rounded-lg ma-0 pa-0">
              <v-img
                width="100%"
                height="200px"
                src="https://cdn.dribbble.com/users/1462542/screenshots/11289842/media/e89ef0017af23e8cf0f6f10bc79ccf0a.png"
              ></v-img>
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
            src="avatar.png"
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
import Contacts from "../components/contacts.vue";
import Education from "../components/education.vue";
import portfolio from "../components/portfolio.vue";
export default {
  components: { portfolio, Education, Contacts },
  name: "App",
  data() {
    return {
      fab: false,
      dark: true
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
