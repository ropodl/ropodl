<script setup>
import { Icon } from "@iconify/vue";

const loves = [
  {
    title: "Web Design",
    icon: "mdi:palette-swatch",
    desc: "Modern web design with help of design frameworks.",
  },
  {
    title: "Web App Development",
    icon: "mdi:code-braces",
    desc: "High quality code with performance in mind.",
  },
  {
    title: "Graphic Design",
    icon: "mdi:pencil-ruler-outline",
    desc: "Any kind of high quality graphic from branding to every day use banner.",
  },
];
</script>

<template>
  <div
    class="position-relative"
    style="
      background: rgb(51, 54, 70);
      background: linear-gradient(0deg, #333646 50%, transparent 0);
    "
  >
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="4" v-for="(love, i) in loves">
          <v-card
            class="h-100 text-white"
            elevation="0"
            :color="
              i == 0 ? 'rgba(var(--v-theme-primary-darken-1),1)' : '#424657'
            "
          >
            <v-list bg-color="transparent" class="pa-10">
              <v-list-item lines="3" class="h-100">
                <template v-slot:prepend>
                  <v-avatar size="50" rounded="0" color="transparent">
                    <v-icon size="50">
                      <Icon :icon="love.icon" />
                    </v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title
                  class="text-h5 mb-3 font-weight-bold"
                  style="line-height: normal; white-space: normal"
                  v-html="love['title']"
                ></v-list-item-title>
                <v-list-item-subtitle
                  style="line-height: normal; white-space: normal"
                  v-html="love['desc']"
                ></v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
