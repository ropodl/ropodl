<script setup>
import { mdiPaletteSwatch, mdiPencilRuler, mdiXml } from "@mdi/js";
import { defineAsyncComponent } from "vue";

const DashText = defineAsyncComponent(() =>
  import("@/components/shared/DashText.vue")
);

const Hero = defineAsyncComponent(() => import("@/components/shared/Hero.vue"));

const socials = [
  {
    name: "Instagram",
    icon: "fa:fa-brands fa-instagram",
    link: "https://instagram.com/ropodl/",
  },
  {
    name: "Dribbble",
    icon: "fa:fa-brands fa-dribbble",
    link: "https://dribbble.com/ropodl/",
  },
  {
    name: "Linkedin",
    icon: "fa:fa-brands fa-linkedin-in",
    link: "https://linkedin.com/in/ropodl/",
  },
  {
    name: "GitHub",
    icon: "fa:fa-brands fa-github",
    link: "https://github.com/ropodl/",
  },
];

const loves = [
  {
    title: "Web<br/>Design",
    icon: mdiPaletteSwatch,
    desc: "Modern web design with help of design frameworks.",
  },
  {
    title: "Web App<br/>Development",
    icon: mdiXml,
    desc: "High quality code with performance in mind.",
  },
  {
    title: "Graphic<br/>Design",
    icon: mdiPencilRuler,
    desc: "Any kind of high quality graphic from branding to every day use banner.",
  },
];

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
</script>
<template>
  <Hero />
  <v-container class="mb-16">
    <v-row>
      <v-col cols="12" md="4" v-for="(love, i) in loves">
        <v-card
          rounded="0"
          class="px-8 align-end pt-16 h-100"
          :color="i == 0 ? 'primary' : '#424657'"
        >
          <v-row no-gutters align="start" class="mt-16 pt-16">
            <v-col cols="12" md="4">
              <v-icon class="mr-3 text-h2" :icon="love['icon']"></v-icon>
            </v-col>
            <v-col cols="12" md="8">
              <div
                class="text-h4 mb-3 font-weight-regular"
                v-html="love['title']"
              ></div>
              <div class="mb-8 text-overline">24 projects</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="mb-16">
    <v-row justify="center">
      <v-col cols="12" md="2" v-for="(client, i) in clients">
        <v-img
          height="100"
          :src="client['img']"
          style="filter: grayscale(1)"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-medium mb-3">Got a project?</div>
        <div class="text-h4 font-weight-medium mb-3">Let's talk.</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
          nemo?
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="text-h4">Estimate your project?</div>
        <div class="text-h4 mb-6">Let me know here.</div>

        <v-text-field
          bg-color="transparent"
          placeholder="What's your name?"
        ></v-text-field>
        <v-text-field
          bg-color="transparent"
          placeholder="Your fancy email"
        ></v-text-field
        ><v-textarea
          bg-color="transparent"
          placeholder="Tell me about your project"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>
