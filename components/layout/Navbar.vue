<script lang="ts" setup>
import { socials } from "@/utils/socials";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// const { loggedIn } = useUserSession();

const drawer = ref(false);

const pages = [
  // {
  //   icon: "mdi:file-document",
  //   title: "about",
  //   link: "/about",
  // },
  {
    icon: "mdi:info",
    title: "about",
    link: "/about",
  },
  {
    icon: "mdi:file-certificate",
    title: "blogs",
    link: "/blogs",
  },
  {
    icon: "mdi:file-certificate",
    title: "portfolio",
    link: "/portfolio",
  },
  {
    icon: "mdi:contacts",
    title: "contact",
    link: "/contact",
  },
];
</script>
<template>
  <v-layout class="w-100 position-fixed" style="height: 65px; top: 0">
    <v-app-bar
      border
      elevation="0"
      rounded="0"
      style="
        border-top: 0;
        border-right: 0;
        border-left: 0;
        background-color: rgba(var(--v-theme-surface), 0.8);
        backdrop-filter: blur(8px);
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
            <LazySharedLogo :width="30" :height="50" />
          </v-btn>
          <v-spacer></v-spacer>
          <template v-for="page in pages">
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                v-bind="props"
                height="50"
                rounded="lg"
                color="transparent"
                variant="tonal"
                class="text-lowercase hidden-sm-and-down"
                :active="false"
                :to="page.link"
              >
                <span
                  :class="
                    route.fullPath.includes(page.title)
                      ? 'text-brand'
                      : 'text-white'
                  "
                >
                  {{ page.title }}.
                </span>
              </v-btn>
            </v-hover>
          </template>
          <v-spacer></v-spacer>
          <template v-for="social in socials">
            <v-btn
              icon
              variant="plain"
              rounded="lg"
              size="50"
              target="_blank"
              class="hidden-xs"
              :href="social.link"
              :aria-label="social.name"
            >
              <v-icon size="sm">
                <Icon :icon="social.icon" />
              </v-icon>
            </v-btn>
          </template>
          <v-btn
            height="50"
            rounded="lg"
            variant="tonal"
            class="hidden-md-and-up"
            @click="drawer = !drawer"
            aria-label="drawer opener"
          >
            <v-icon>
              <Icon :icon="drawer ? 'mdi:close' : 'mdi:menu'" />
            </v-icon>
          </v-btn>
          <!-- <template v-if="loggedIn">
            <LazyAdminSharedAdminNavDrop />
          </template> -->
        </v-row>
      </v-container>
    </v-app-bar>
  </v-layout>
  <v-bottom-sheet v-model="drawer" scrim="black">
    <v-card rounded="0">
      <v-list>
        <v-list-subheader>Navigate to</v-list-subheader>
        <v-list-item title="Home">
          <template v-slot:prepend>
            <v-icon>
              <Icon icon="mdi:home" />
            </v-icon>
          </template>
        </v-list-item>
        <v-list-item
          v-for="page in pages"
          :title="page.title"
          :to="page['link']"
          @click="drawer = false"
        >
          <template v-slot:prepend>
            <v-icon>
              <Icon :icon="page['icon']" />
            </v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>
<style lang="scss">
.v-btn--active {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
