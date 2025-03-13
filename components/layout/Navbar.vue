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
  <v-app-bar
    border
    elevation="0"
    rounded="pill"
    class="px-1 left-0 right-0"
    style="
      background-color: rgba(var(--v-theme-surface), 0.8);
      backdrop-filter: blur(8px);
      top: 20px;
      display: flex;
      justify-self: center;
      width: 95%;
    "
  >
    <v-container>
      <v-row>
        <v-btn
          height="50"
          rounded="lg"
          variant="text"
          color="white"
          :active="false"
          class="text-capitalize"
          to="/"
          aria-label="home"
        >
          <lazy-shared-logo :width="30" :height="50" />
        </v-btn>
        <v-spacer></v-spacer>
        <template v-for="{ title, to } in pages">
          <v-hover #default="{ isHovering, props }">
            <v-btn
              v-bind="props"
              height="50"
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
            size="50"
            target="_blank"
            class="hidden-xs"
            :href="link"
            :aria-label="name"
          >
            <Icon :icon="icon" />
          </v-btn>
        </template>
        <v-btn
          height="50"
          rounded="lg"
          variant="tonal"
          class="hidden-md-and-up"
          :icon="drawer ? 'mdi-close' : 'mdi-menu'"
          aria-label="drawer opener"
          @click="drawer = !drawer"
        ></v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
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
            :title
            :to
            :prepend-icon="icon"
            active-class="text-brand"
            @click="drawer = false"
          />
        </template>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>
