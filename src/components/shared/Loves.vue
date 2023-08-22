<script setup>
import { mdiPaletteSwatch, mdiPencilRuler, mdiXml } from "@mdi/js";

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
</script>
<template>
  <div class="position-relative">
    <v-container class="pb-16">
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="(love, i) in loves">
          <v-card
            rounded="0"
            class="px-8 align-end pt-16 h-100"
            :color="i == 0 ? 'rgba(var(--v-theme-primary),0.5)' : '#42465755'"
            style="z-index: 1;backdrop-filter: blur(10px);"
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
    <div class="bgbg"></div>
  </div>
</template>

<style lang="scss" scoped>
.bgbg {
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  background-color: #333646;
  z-index: 0;
}
</style>