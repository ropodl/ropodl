<script setup>
import { socials } from "@/utils/socials";
useSeoMeta({
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogTitle: "Saroj Poudel",
  ogDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogUrl: "https://ropodl.com",
  twitterTitle: "Saroj Poudel",
  twitterDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  twitterCard: "summary_large_image",
});
</script>
<template>
  <section class="pt-16 mt-10">
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="12"
          md="8"
          lg="6"
          class="d-flex flex-column justify-center align-center"
        >
          <v-avatar size="256" class="mb-n10">
            <v-img src="/avatar.webp">
              <div class="w-100 h-100 gradient"></div>
            </v-img>
          </v-avatar>
          <div
            class="text-center text-h3 font-weight-black mb-6"
            style="z-index: 1"
          >
            Hi, I'm <br />
            Saroj Poudel <br />
            FullStack Developer
          </div>
          <div class="text-center mb-6">
            Crafting thoughtful, user-first digital experiences at the
            intersection of design and development. Proudly Nepal-based.
          </div>
          <div class="mb-6">
            <v-btn
              color="white"
              width="200"
              variant="flat"
              class="mr-3"
              to="/blogs"
              >Blog</v-btn
            >
            <v-btn width="200" variant="text" to="/portfolio">
              Portfolio
              <v-icon end>
                <Icon name="tabler:arrow-right" />
              </v-icon>
            </v-btn>
          </div>
          <div>
            <ul class="list-style-none d-flex">
              <template v-for="({ icon, link }, i) in socials">
                <li>
                  <v-btn
                    icon
                    rounded="lg"
                    color="primary"
                    variant="text"
                    :href="link"
                  >
                    <v-icon>
                      <Icon :name="icon" />
                    </v-icon>
                  </v-btn>
                </li>
              </template>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <!-- <section>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="8" lg="6">
          <div class="text-h6">About Me</div>
          <div>
            As a UX/UI designer and front-end developer with 6 years of
            experience, I leverage my Boston University Interactive Design
            degree to craft user-centered digital experiences. My approach
            blends creative strategy with technical expertise, transforming
            concepts into functional, purposeful digital products that
            seamlessly integrate design and technology.
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-h6">Work Experience</div>
          <ul>
            <li class="d-flex align-center">
              2023-present <v-divider></v-divider> Aayulogic
            </li>
            <li>2023-present ----------------------- Aayulogic</li>
            <li>2023-present ----------------------- Aayulogic</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </section> -->
</template>
<style scoped>
.gradient {
  background: linear-gradient(transparent 50%, rgba(var(--v-theme-background)));
}
</style>
