<script setup>
import { mdiEmailOpen, mdiPhone, mdiCake, mdiMapMarkerRadius } from "@mdi/js";
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" xl="2">
        <v-card
          border
          flat
          rounded="xl"
          color="rgba(33,33,33,0.8)"
          style="
            position: sticky;
            top: 16px;
            backdrop-filter: blur(10px);
            background: linear-gradient(to top, #212121, rgba(33, 33, 33, 0.8));
          "
        >
          <v-img class="d-flex align-end" src="/src/assets/image/me2.jpg">
            <v-card
              v-auto-animate
              transition="v-slide-x-transition"
              rounded="0"
              style="
                backdrop-filter: blur(10px);
                background: linear-gradient(
                  to top,
                  #212121,
                  rgba(33, 33, 33, 0.8)
                );
              "
            >
              <v-card-title class="text-h5">Saroj Poudel</v-card-title>
              <v-card-subtitle>Web Designer</v-card-subtitle>
            </v-card>
          </v-img>
          <v-card-text class="py-0">
            <v-list
              color="red"
              lines="two"
              density="compact"
              style="background-color: transparent"
            >
              <v-list-item>
                <template #prepend>
                  <v-icon
                    color="primary"
                    size="x-large"
                    :icon="mdiEmailOpen"
                    style="opacity: 1"
                  ></v-icon>
                </template>
                <v-list-item-title>Email Address</v-list-item-title>
                <v-list-item-subtitle>sarox14@gmail.com</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon
                    color="primary"
                    size="x-large"
                    :icon="mdiPhone"
                    style="opacity: 1"
                  ></v-icon>
                </template>
                <v-list-item-title>Phone Number</v-list-item-title>
                <v-list-item-subtitle>+977 9849808471</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon
                    color="primary"
                    size="x-large"
                    :icon="mdiCake"
                    style="opacity: 1"
                  ></v-icon>
                </template>
                <v-list-item-title>Birthday</v-list-item-title>
                <v-list-item-subtitle
                  >27<sup>th</sup> April, 1994</v-list-item-subtitle
                >
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon
                    color="primary"
                    size="x-large"
                    :icon="mdiMapMarkerRadius"
                    style="opacity: 1"
                  ></v-icon>
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
              <v-col cols="3">
                <v-btn
                  block
                  rounded="0"
                  size="large"
                  height="50"
                  color="transparent"
                  variant="tonal"
                  target="_blank"
                  href="https://linkedin.com/in/ropodl/"
                >
                  <v-icon color="primary" icon="fa:fab fa-linkedin"></v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn
                  block
                  rounded="0"
                  size="large"
                  height="50"
                  color="transparent"
                  variant="tonal"
                  target="_blank"
                  href="https://instagram.com/ropodl/"
                >
                  <v-icon color="primary" icon="fa:fab fa-instagram"></v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn
                  block
                  rounded="0"
                  size="large"
                  height="50"
                  color="transparent"
                  variant="tonal"
                  target="_blank"
                  href="https://github.com/ropodl"
                >
                  <v-icon color="primary" icon="fa:fab fa-github"></v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn
                  block
                  rounded="0"
                  size="large"
                  height="50"
                  color="transparent"
                  variant="tonal"
                  target="_blank"
                  href="https://dribbble.com/ropodl"
                >
                  <v-icon color="primary" icon="fa:fab fa-dribbble"></v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card border flat rounded="xl">
          <v-card
            border
            flat
            rounded="0"
            color="grey-darken-4"
            class="border-t-0 border-e-0 border-s-0"
            style="position: absolute; top: 0; right: 0"
          >
            <v-tabs height="60" align-tabs="end">
              <v-tab exact to="/" class="rounded-0 text-capitalize">
                About
              </v-tab>
              <v-tab exact to="/resume" class="rounded-0 text-capitalize">
                Resume
              </v-tab>
              <v-tab exact to="/portfolio" class="rounded-0 text-capitalize">
                Portfolio
              </v-tab>
              <v-tab exact to="/blog" class="rounded-0 text-capitalize">
                Blog
              </v-tab>
              <v-tab exact to="/contact" class="rounded-0 text-capitalize">
                Contact
              </v-tab>
            </v-tabs>
          </v-card>
          <router-view></router-view>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
