<script setup>
import { defineAsyncComponent } from "vue";
import { mdiHeart, mdiHandshake } from "@mdi/js";
const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- <PageTitle title="About Me" /> -->
        <v-card flat>
          <v-card-text>
            <p>
              I am a Web Performance Optimization Specialist dedicated to
              optimizing website speed and user experience. I keep up with the
              latest industry trends and have expertise in Vue.js, Linux, and UX
              optimization. My passion for sports translates into my work, where
              I enjoy collaborating with teams to achieve exceptional results.
              With extensive experience in web performance optimization, data
              analysis, and delivering cutting-edge solutions, I am able to
              drive tangible business results for my clients.
            </p>
            <br />
            <p>
              As an introverted individual, I am focused on delivering quality
              work and committed to ongoing learning and professional
              development. Additionally, I have experience in front-end
              development, responsive design, and website accessibility. I
              provide tailored and effective solutions to my clients,
              continuously striving for web optimization excellence.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card-title class="d-flex align-center">
          <v-icon start class="mr-3" color="primary" :icon="mdiHeart"></v-icon>
          What I love doing
        </v-card-title>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="6" class="pb-0">
            <v-card flat>
              <v-list color="transparent" class="py-0" lines="two">
                <v-list-item>
                  <template #prepend>
                    <v-avatar size="60">
                      <v-icon
                        color="primary"
                        icon="fa:fa-light fa-swatchbook"
                      ></v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title>Web Design</v-list-item-title>
                  <v-list-item-subtitle>
                    Modern web design with help of design frameworks.
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-card flat>
              <v-list color="transparent" class="py-0" lines="two">
                <v-list-item>
                  <template #prepend>
                    <v-avatar size="60">
                      <v-icon
                        color="primary"
                        icon="fa:fa-light fa-code"
                      ></v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title>Web Development</v-list-item-title>
                  <v-list-item-subtitle>
                    High quality code with performance in mind.
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-card flat>
              <v-list color="transparent" class="py-0" lines="two">
                <v-list-item>
                  <template #prepend>
                    <v-avatar size="60">
                      <v-icon
                        color="primary"
                        icon="fa:fa-light fa-pen-ruler"
                      ></v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title>Graphic Design</v-list-item-title>
                  <v-list-item-subtitle>
                    Any kind of high quality graphic from branding to every day
                    use banner.
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <!-- <v-col cols="12" md="6" class="pb-0">
            <v-card flat>
              <v-list color="transparent" class="py-0" lines="two">
                <v-list-item>
                  <template #prepend>
                    <v-avatar size="60">
                      <v-icon
                        color="primary"
                        icon="fa:fa-solid fa-swatchbook"
                      ></v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title> Web Design </v-list-item-title>
                  <v-list-item-subtitle>
                    Modern web design with help of design frameworks.
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col> -->
        </v-row>
      </v-col>
      <v-col cols="12" class="pb-0">
        <v-card-title class="d-flex align-center">
          <v-icon
            start
            class="mr-3"
            color="primary"
            :icon="mdiHandshake"
          ></v-icon>
          Clients
        </v-card-title>
        <v-divider></v-divider>
        <v-card flat height="120" class="d-flex overflow-x-auto">
          <v-img
            class="my-2 mx-4"
            max-width="200"
            max-height="100"
            src="https://www.apitechnology.com.np/_nuxt/img/apitech.8e7a111.webp"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
