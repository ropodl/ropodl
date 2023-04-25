<script setup>
import {
  mdiCake,
  mdiDownload,
  mdiEmailOpen,
  mdiMapMarkerRadius,
  mdiPhone,
} from "@mdi/js";

const socials = [
  {
    name: "Linkedin",
    icon: "fa:fa-brands fa-linkedin",
    link: "https://linkedin.com/in/ropodl/",
  },
  {
    name: "Instagram",
    icon: "fa:fa-brands fa-instagram",
    link: "https://instagram.com/ropodl/",
  },
  {
    name: "GitHub",
    icon: "fa:fa-brands fa-github",
    link: "https://github.com/ropodl/",
  },
  {
    name: "Dribbble",
    icon: "fa:fa-brands fa-dribbble",
    link: "https://dribbble.com/ropodl/",
  },
];
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" lg="3">
        <v-card border flat rounded="xl" class="mb-3">
          <v-img
            eager
            height="272"
            alt="Saroj Poudel"
            class="align-end pa-3 hidden-sm-and-down"
            src="/image/me2_optimized.webp"
          >
            <v-card border flat rounded="xl">
              <v-list>
                <v-list-item>
                  <v-list-item-title>Saroj Poudel</v-list-item-title>
                  <v-list-item-subtitle>
                    Full Stack Developer
                  </v-list-item-subtitle>
                  <template #append>
                    <v-tooltip location="top" text="Download Resume">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          icon
                          download
                          target="_blank"
                          color="primary"
                          v-bind="props"
                          size="small"
                          variant="tonal"
                          href="https://raw.githubusercontent.com/ropodl/ropodl/main/public/doc/resume.pdf"
                        >
                          <v-icon :icon="mdiDownload"></v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-img>
          <v-list class="hidden-md-and-up">
            <v-list-item>
              <template #prepend>
                <v-avatar size="50">
                  <v-img
                    alt="Saroj Poudel"
                    src="/image/me2_optimized.webp"
                  ></v-img>
                </v-avatar>
              </template>
              <v-list-item-title class="text-h6 mb-1"
                >Saroj Poudel</v-list-item-title
              >
              <v-list-item-subtitle>Full Stack Developer</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card border flat rounded="xl" class="mb-3">
          <v-list
            color="red"
            lines="two"
            density="compact"
            style="background-color: transparent"
          >
            <v-list-item>
              <template #prepend>
                <v-avatar class="hidden-md">
                  <v-icon color="primary" :icon="mdiEmailOpen"></v-icon>
                </v-avatar>
              </template>
              <v-list-item-title>Email Address</v-list-item-title>
              <v-list-item-subtitle>sarox14@gmail.com</v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <template #prepend>
                <v-avatar class="hidden-md">
                  <v-icon color="primary" :icon="mdiPhone"></v-icon>
                </v-avatar>
              </template>
              <v-list-item-title>Phone Number</v-list-item-title>
              <v-list-item-subtitle>+977 9849808471</v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <template #prepend>
                <v-avatar class="hidden-md">
                  <v-icon color="primary" :icon="mdiCake"></v-icon>
                </v-avatar>
              </template>
              <v-list-item-title>Birthday</v-list-item-title>
              <v-list-item-subtitle>
                27<sup>th</sup> April, 1994
              </v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <template #prepend>
                <v-avatar class="hidden-md">
                  <v-icon color="primary" :icon="mdiMapMarkerRadius"></v-icon>
                </v-avatar>
              </template>
              <v-list-item-title>Location</v-list-item-title>
              <v-list-item-subtitle>
                Maitrinagar, Kalanki
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card border flat rounded="xl" class="mb-3">
          <v-row no-gutters>
            <v-col cols="3" v-for="(social, i) in socials">
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  v-bind="props"
                  block
                  rounded="0"
                  size="x-large"
                  height="60"
                  :color="isHovering ? 'primary' : 'transparent'"
                  variant="tonal"
                  target="_blank"
                  :href="social['link']"
                  :aria-label="social['name']"
                >
                  <v-icon color="primary" :icon="social['icon']"></v-icon>
                </v-btn>
              </v-hover>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="9">
        <v-card border flat rounded="xl">
          <v-tabs grow height="50" align-tabs="center">
            <v-tab exact to="/" class="rounded-0 text-capitalize">
              About
            </v-tab>
            <v-tab exact to="/resume" class="rounded-0 text-capitalize">
              Resume
            </v-tab>
            <v-tab exact to="/portfolio" class="rounded-0 text-capitalize">
              Portfolio
            </v-tab>
            <v-tab exact to="/contact" class="rounded-0 text-capitalize">
              Contact
            </v-tab>
          </v-tabs>
        </v-card>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>
