<script lang="ts" setup>
import { socials } from "@/utils/socials";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const drawer = ref(false);

const pages = [
  {
    icon: "mdi-information-outline",
    title: "about",
    to: "/about",
  },
  {
    icon: "mdi-post-outline",
    title: "blogs",
    to: "/blogs",
  },
  {
    icon: "mdi-file-certificate-outline",
    title: "portfolio",
    to: "/portfolio",
  },
  {
    icon: "mdi-contacts-outline",
    title: "contact",
    to: "/contact",
  },
];
</script>
<template>
  <v-container class="position-fixed left-0 right-0" style="z-index: 1008">
    <v-row align="center">
      <v-col class="pa-0">
        <v-card
          border
          relative
          height="60"
          elevation="0"
          rounded="pill"
          class="pa-0 left-0 right-0 d-flex justify-self-center align-center"
          style="
            background-color: rgba(var(--v-theme-surface), 0.8);
            backdrop-filter: blur(8px);
            top: 20px;
          "
        >
          <v-btn
            height="60"
            variant="text"
            rounded="pill"
            color="white"
            :active="false"
            class="text-capitalize px-6"
            to="/"
            aria-label="home"
          >
            <lazy-shared-logo :width="30" :height="60" />
          </v-btn>
          <v-spacer></v-spacer>
          <template v-for="{ title, to } in pages">
            <v-hover #default="{ isHovering, props }">
              <v-btn
                v-bind="props"
                height="60"
                rounded="lg"
                color="transparent"
                variant="tonal"
                class="text-lowercase hidden-sm-and-down"
                :active="false"
                :to
              >
                <span
                  :class="
                    route.fullPath.includes(title) ? 'text-brand' : 'text-white'
                  "
                >
                  {{ title
                  }}<span :class="isHovering ? 'text-brand' : ''">.</span>
                </span>
              </v-btn>
            </v-hover>
          </template>
          <v-spacer></v-spacer>
          <template v-for="{ name, icon, link } in socials">
            <v-btn
              v-tooltip="name"
              variant="plain"
              rounded="lg"
              size="60"
              target="_blank"
              class="hidden-xs"
              :href="link"
              :aria-label="name"
            >
              <Icon :icon="icon" />
            </v-btn>
          </template>
          <v-btn
            height="60"
            rounded="pill"
            variant="text"
            class="hidden-md-and-up px-6"
            aria-label="drawer opener"
            @click="drawer = !drawer"
          >
            <v-icon>
              <Icon :icon="drawer ? 'mdi-close' : 'mdi-menu'" />
            </v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-bottom-sheet v-model="drawer" scrim="black">
    <v-card rounded="0">
      <v-list>
        <v-list-subheader>Navigate to</v-list-subheader>
        <v-list-item
          prepend-icon="mdi-home"
          title="home."
          active-class="text-brand"
          to="/"
          @click="drawer = false"
        />
        <template v-for="{ title, icon, to } in pages">
          <v-list-item
            :title="`${title}.`"
            :to
            density="compact"
            :prepend-icon="icon"
            active-class="text-brand"
            @click="drawer = false"
          />
        </template>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>
