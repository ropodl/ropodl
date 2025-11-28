<script setup lang="ts">
import { ref } from "vue";

const experience = [
  {
    title: "Graphic/Web Designer",
    year: "2018",
    desc: "Fivonest Technology @ Solteemode, Kathmandu",
  },
  {
    title: "Chief Technology Officer",
    year: "2019 - 2023",
    desc: "SoftMahal Technologies @ Mid Baneshwor, Kathmandu",
  },
  {
    title: "Mid Level Frontend Developer",
    year: "2024 - Current",
    desc: "Aayulogic Pvt. Ltd. @ Chakupat, Lalitpur",
  },
];

// const software = [
//     {
//         text: 'Adobe Illustrator',
//         icon: 'iconoir:adobe-illustrator',
//     },
//     {
//         text: 'Adobe Photoshop',
//         icon: 'iconoir:adobe-photoshop',
//     },
//     {
//         text: 'Adobe XD',
//         icon: 'iconoir:adobe-xd',
//     },
//     {
//         text: 'Adobe Premiere Pro',
//         icon: 'basil:adobe-premiere-outline',
//     },
//     {
//         text: 'MS Office',
//         icon: 'simple-icons:microsoftoffice',
//     },
//     {
//         text: 'VS Code',
//         icon: 'tabler:brand-vscode',
//     },
//     {
//         text: 'Linux',
//         icon: 'carbon:linux',
//     },
// ];

// const frontend = [
//     {
//         text: 'VueJS',
//         icon: 'fa6-brands:vuejs',
//     },
//     {
//         text: 'Vuetify',
//         icon: 'mdi:vuetify',
//     },
//     {
//         text: 'NuxtJS',
//         icon: 'tabler:brand-nuxt',
//     },
// ];
// const backend = [
//     {
//         text: 'ExpressJs',
//         icon: 'simple-icons:express',
//     },
//     {
//         text: 'MongoDB',
//         icon: 'tabler:brand-mongodb',
//     },
//     {
//         text: 'SupaBase',
//         icon: 'tabler:brand-supabase',
//     },
// ];

const items = ref([
  {
    src: "/media/clients/api.svg",
    company: "API Technology",
    position: "Web Designer",
  },
]);
</script>
<template>
  <v-container max-width="1200">
    <v-row>
      <v-col>
        <layouts-default-page-title>
          <span class="text-primary-darken-2">About me,</span> my story and my
          experience.
        </layouts-default-page-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="5">
        <v-card border rounded="xl">
          <v-parallax cover height="613" scale="0.8" src="/media/full.jpg" />
        </v-card>
      </v-col>
      <v-col cols="12" md="7" class="d-flex flex-column justify-space-between">
        <div class="text-h6 font-weight-light mb-6">
          <p>
            As a Senior Fullstack Developer with over 6 years of experience, I
            specialize in creating intuitive and user-centered interfaces for a
            wide range of digital products and experiences. I work across the
            entire development stack, building backend systems and frontend
            interfaces with clean, maintainable code.
          </p>
          <br />
          <p>
            On the backend, I work with Laravel for PHP applications, Express.js
            for Node.js projects, and Hono for fast, lightweight APIs. On the
            frontend, I use Vue.js and Nuxt to build responsive, interactive
            interfaces, with Vuetify for implementing Material Design components
            and polished UI systems.
          </p>
          <br />
          <p>
            I've collaborated with designers, product managers, and developers
            to ship products that meet business goals. Whether starting new
            projects or improving existing ones, I approach problems
            methodically and deliver software that works reliably and serves the
            people who use it.
          </p>
        </div>
        <Link href="/" as="span">
          <v-btn border rounded="pill" width="230" height="80">
            Let's talk
            <template #append>
              <v-icon end>
                <Icon name="mdi-arrow-right" />
              </v-icon>
            </template>
          </v-btn>
        </Link>
      </v-col>
    </v-row>
    <v-row class="py-16">
      <v-col cols="12" md="6">
        <div
          class="text-h3 font-weight-medium position-sticky"
          style="top: 50px"
        >
          My past work<br />experience
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-list
          bg-color="transparent"
          class="py-0"
          density="default"
          lines="three"
        >
          <template v-for="(item, index) in experience" :key="item.title">
            <v-list-item :class="index === 0 ? 'mb-6' : 'my-6'">
              <v-list-item-title
                class="text-h5 font-weight-medium mb-3"
                style="white-space: normal !important"
              >
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle
                class="text-body-1"
                style="line-height: unset"
              >
                {{ item.desc }}
              </v-list-item-subtitle>
              <template #append>
                {{ item.year }}
              </template>
            </v-list-item>
            <v-divider />
          </template>
        </v-list>
      </v-col>
    </v-row>
    <v-row class="pb-16">
      <v-col cols="12">
        <div class="text-h2 font-weight-medium">
          A visual partner for brands, companies, and agencies.
        </div>
      </v-col>
      <v-col cols="12" class="mt-10">
        <v-row>
          <template
            v-for="({ src, company, position }, index) in items"
            :key="index"
          >
            <v-col cols="12" md="3">
              <v-img class="w-100" :src />
              <v-card-title class="px-0"> {{ company }} </v-card-title>
              <v-card-subtitle class="px-0"> {{ position }} </v-card-subtitle>
            </v-col>
          </template>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
