<script setup lang="ts">
import socials from "@/utils/social";

useSeoMeta({
   title: "Saroj Poudel",
   ogTitle: "Saroj Poudel",
   twitterTitle: "Saroj Poudel",
   description:
      "Full-Stack Developer & Designer based in Kathmandu. I build modern, intuitive web experiences using Vue, Laravel, Strapi, and HonoJs. Let's create something great.",
   ogDescription:
      "Full-Stack Developer & Designer based in Kathmandu. I build modern, intuitive web experiences using Vue, Laravel, Strapi, and HonoJs. Let's create something great.",
   twitterDescription:
      "Full-Stack Developer & Designer based in Kathmandu. I build modern, intuitive web experiences using Vue, Laravel, Strapi, and HonoJs. Let's create something great.",
   ogImage: "https://www.ropodl.com/media/full.jpg",
   twitterCard: "summary_large_image",
   twitterImage: "https://www.ropodl.com/media/full.jpg",
   ogUrl: "https://www.ropodl.com/",
});
</script>
<template>
   <v-container max-width="1200">
      <v-row class="mb-3">
         <v-col cols="12">
            <div class="text-lg-h1 text-h2 font-weight-bold mb-9">
               Fullstack developer with passion to create
               <span class="text-primary-darken-2"> a great experiences. </span>
            </div>
         </v-col>
      </v-row>
      <v-row align="center" class="mb-3">
         <v-col cols="12" md="4">
            <v-divider />
         </v-col>
         <v-col cols="12" md="8">
            <div class="text-h6 font-weight-light">
               Hi, I’m Saroj Poudel, a full-stack developer and designer based
               in Kathmandu, Nepal. I focus on creating digital experiences that
               are intuitive, enjoyable, and effective. I've been building
               things with Laravel, Vue, Strapi, HonoJs combining design sense
               with strong engineering to deliver practical solutions.
            </div>
         </v-col>
      </v-row>
      <v-row align="center" class="mb-6">
         <v-col cols="12" md="9" class="hidden-sm-and-down">
            <ul class="list-none pl-0 d-flex align-center">
               <template v-for="{ name, link } in socials" :key="name">
                  <li class="me-6">
                     <v-hover v-slot="{ isHovering, props }">
                        <a
                           v-bind="props"
                           class="text-decoration-none text-primary text-body-1 font-weight-regular"
                           :class="
                              isHovering
                                 ? 'text-primary-darken-2'
                                 : 'text-primary'
                           "
                           :href="link"
                           target="_blank"
                        >
                           {{ name }}
                           <v-icon size="x-small">
                              <Icon name="carbon:arrow-up-right" />
                           </v-icon>
                        </a>
                     </v-hover>
                  </li>
               </template>
            </ul>
         </v-col>
         <v-col cols="6" md="3">
            <v-btn border block rounded="pill" size="100">
               Let's talk
               <template #append>
                  <v-icon end icon="mdi-arrow-right" />
               </template>
            </v-btn>
         </v-col>
      </v-row>
   </v-container>
</template>
