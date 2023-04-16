<script setup>
import {
  mdiHeart,
  mdiHandshake,
  mdiPencilRuler,
  mdiPaletteSwatch,
  mdiXml,
} from "@mdi/js";

const clients = [
  {
    name: "API Technology",
    img: "image/clients/apitech.webp",
  },
  {
    name: "Genese Solution",
    img: "image/clients/genese.svg",
  },
];

const loves = [
  {
    title: "Web Design",
    icon: mdiPaletteSwatch,
    desc: "Modern web design with help of design frameworks.",
  },
  {
    title: "Web Development",
    icon: mdiXml,
    desc: "High quality code with performance in mind.",
  },
  {
    title: "Graphic Design",
    icon: mdiPencilRuler,
    desc: "Any kind of high quality graphic from branding to every day use banner.",
  },
];
</script>
<template>
  <v-container class="px-0">
    <v-row>
      <v-col cols="12">
        <v-card border flat rounded="xl">
          <v-card-text class="text-subtitle-1">
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
      <v-col cols="12" class="mb-3">
        <v-card-title class="d-flex align-center">
          <v-icon start class="mr-3" color="primary" :icon="mdiHeart"></v-icon>
          What I love doing
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="pb-0"
            v-for="(love, i) in loves"
          >
            <v-card border flat rounded="xl">
              <v-list color="transparent" class="py-0" lines="three">
                <v-list-item>
                  <template #prepend>
                    <v-avatar size="60">
                      <v-icon color="primary" :icon="love['icon']"></v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title v-text="love['title']"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="love['desc']"
                  ></v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-card-title class="d-flex align-center">
          <v-icon
            start
            class="mr-3"
            color="primary"
            :icon="mdiHandshake"
          ></v-icon>
          Clients
        </v-card-title>
        <v-row>
          <v-col cols="12" sm="4" md="3" v-for="(client, i) in clients">
            <v-card border flat class="px-2">
              <v-img
                height="100"
                :alt="client['name']"
                :src="client['img']"
              ></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
