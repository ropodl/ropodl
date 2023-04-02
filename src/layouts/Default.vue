<script setup>
import {
  mdiEmailOpen,
  mdiPhone,
  mdiCake,
  mdiMapMarkerRadius,
  mdiChevronDown,
} from "@mdi/js";

const socials = [
  {
    name: "Linkedin",
    icon: "fa:fab fa-linkedin",
    link: "https://linkedin.com/in/ropodl/",
  },
  {
    name: "Instagram",
    icon: "fa:fab fa-instagram",
    link: "https://instagram.com/ropodl/",
  },
  {
    name: "GitHub",
    icon: "fa:fab fa-github",
    link: "https://github.com/ropodl/",
  },
  {
    name: "Dribbble",
    icon: "fa:fab fa-dribbble",
    link: "https://dribbble.com/ropodl/",
  },
];
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" lg="3">
        <v-card border flat rounded="xl" class="mb-3">
          <v-img class="align-end pa-3" src="/image/me2.jpg">
            <v-card border flat rounded="xl">
              <v-list>
                <v-list-item>
                  <v-list-item-title>Saroj Poudel</v-list-item-title>
                  <v-list-item-subtitle
                    >Web/Graphic Designer</v-list-item-subtitle
                  >
                </v-list-item>
              </v-list>
            </v-card>
          </v-img>
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
                  <v-icon
                    color="primary"
                    :icon="mdiEmailOpen"
                    style="opacity: 1"
                  ></v-icon>
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
                >
                  <v-icon color="primary" :icon="social['icon']"></v-icon>
                </v-btn>
              </v-hover>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card
          border
          flat
          rounded="xl"
          style="position: sticky; top: 16px; z-index: 1"
        >
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
            <!-- <v-tab exact to="/blog" class="rounded-0 text-capitalize">
              Blog
            </v-tab> -->
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
