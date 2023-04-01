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
        <v-card border flat rounded="xl">
          <div class="hidden-sm-and-down">
            <v-img class="align-end" src="/image/me2.jpg">
              <v-card rounded="0">
                <!-- style="
                  backdrop-filter: blur(10px);
                  background: linear-gradient(
                    to top,
                    #212121,
                    rgba(33, 33, 33, 0.8)
                  );
                " -->
                <v-card-title class="text-h5">Saroj Poudel</v-card-title>
                <v-card-subtitle>Web/Graphic Designer</v-card-subtitle>
              </v-card>
            </v-img>
          </div>
          <div class="hidden-md-and-up">
            <v-list class="bg-transparent">
              <v-list-item>
                <template #prepend>
                  <v-avatar size="50">
                    <v-img src="/image/me2.jpg"></v-img>
                  </v-avatar>
                </template>
                <v-list-item-title>Saroj Poudel</v-list-item-title>
                <v-list-item-subtitle>
                  Web/Graphic Designer
                </v-list-item-subtitle>
                <template #append>
                  <v-btn icon size="small" variant="tonal">
                    <v-icon :icon="mdiChevronDown"></v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </div>
          <v-card-text class="py-0">
            <v-list
              color="red"
              lines="two"
              density="compact"
              style="background-color: transparent"
            >
              <v-list-item class="px-0">
                <template #prepend>
                  <v-avatar class="hidden-md">
                    <v-icon
                      color="primary"
                      size="x-large"
                      :icon="mdiEmailOpen"
                      style="opacity: 1"
                    ></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>Email Address</v-list-item-title>
                <v-list-item-subtitle>sarox14@gmail.com</v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="px-0">
                <template #prepend>
                  <v-avatar class="hidden-md">
                    <v-icon
                      color="primary"
                      size="x-large"
                      :icon="mdiPhone"
                    ></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>Phone Number</v-list-item-title>
                <v-list-item-subtitle>+977 9849808471</v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="px-0">
                <template #prepend>
                  <v-avatar class="hidden-md">
                    <v-icon
                      color="primary"
                      size="x-large"
                      :icon="mdiCake"
                    ></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>Birthday</v-list-item-title>
                <v-list-item-subtitle>
                  27<sup>th</sup> April, 1994
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="px-0">
                <template #prepend>
                  <v-avatar class="hidden-md">
                    <v-icon
                      color="primary"
                      size="x-large"
                      :icon="mdiMapMarkerRadius"
                    ></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>Location</v-list-item-title>
                <v-list-item-subtitle>
                  Maitrinagar, Kalanki
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
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
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card border flat rounded="xl" class="mb-5">
          <v-tabs grow height="60" align-tabs="center">
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
        <v-card border flat rounded="xl">
          <router-view></router-view>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
