<script setup>
import { socials } from "@/utils/socials";

const { smAndDown } = useDisplay();

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
  <section class="mb-9" :class="smAndDown ? '' : 'mt-16'">
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
            Saroj Poudel
          </div>
          <div class="text-center mb-6">
            I build web stuff in Kathmandu.<br />
            Let me show you what I've done and how I do it.
          </div>
          <v-row justify="center" class="w-100 mb-6">
            <v-col cols="12" sm="4" md="4">
              <v-btn block color="white" variant="flat" to="/blogs">
                Blog
              </v-btn>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-btn block variant="text" to="/portfolio">
                Portfolio
                <v-icon end>
                  <Icon name="tabler:arrow-right" />
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
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
</template>
<style scoped>
.gradient {
  background: linear-gradient(transparent 50%, rgba(var(--v-theme-background)));
}
</style>
