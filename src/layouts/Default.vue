<script setup>
import {
  mdiEmailOpen,
  mdiPhone,
  mdiCake,
  mdiMapMarkerRadius,
  mdiChevronDown,
} from "@mdi/js";
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
              <v-list-item>
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
              <v-list-item>
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
              <v-list-item>
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
              <v-list-item>
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

          <v-card-text class="pa-0">
            <v-row no-gutters>
              <v-col cols="3">
                <v-btn
                  block
                  rounded="0"
                  size="x-large"
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
            style="top: 0; right: 0"
          >
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
          <router-view></router-view>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
