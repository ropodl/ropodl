<script setup>
import { usePortfolioDialog } from "@/stores/portfolioDialog";
import { socials } from "@/utils/socials";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
// import { VBottomSheet } from "vuetify/labs/VBottomSheet";

const route = useRoute();
// store init
const user = useUser();
const dialog = usePortfolioDialog();

let drawer = ref(false);

const pages = [
  // {
  //   icon: "mdi:home",
  //   title: "home",
  //   link: "/",
  // },
  {
    icon: "mdi:file-document",
    title: "about",
    link: "/about",
  },
  {
    icon: "mdi:file-certificate",
    title: "blog",
    link: "/blog",
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

const routes = [{ title: "Dashboard", to: "/admin/" }];

const openDrawer = () => {
  drawer.value = !drawer.value;
};
</script>
<template>
  <v-layout class="w-100" style="height: 65px; position: fixed; top: 0">
    <v-app-bar
      border
      elevation="0"
      rounded="0"
      style="
        border-top: 0;
        border-right: 0;
        border-left: 0;
        background-color: rgba(33, 33, 33, 0.8);
        backdrop-filter: blur(8px);
      "
    >
      <v-container>
        <v-row>
          <v-btn
            height="50"
            rounded="lg"
            variant="tonal"
            class="text-capitalize"
            to="/"
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
                class="text-capitalize hidden-sm-and-down"
                :variant="isHovering ? 'tonal' : 'text'"
                :text="page.title"
                :active="route.fullPath.includes(page.title)"
                :to="page.link"
              />
            </v-hover>
          </template>
          <v-spacer></v-spacer>
          <template v-for="social in socials">
            <v-tooltip theme="light" location="bottom" :text="social.name">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  v-bind="props"
                  variant="plain"
                  rounded="lg"
                  size="48"
                  target="_blank"
                  class="hidden-xs"
                  :href="social.link"
                >
                  <v-icon size="sm">
                    <Icon :icon="social.icon" />
                  </v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </template>
          <v-btn
            height="50"
            rounded="lg"
            variant="tonal"
            class="hidden-md-and-up"
            @click="openDrawer"
          >
            <v-icon>
              <Icon :icon="drawer ? 'mdi:close' : 'mdi:menu'" />
            </v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-layout>
  <!-- <v-container
    class="position-fixed"
    style="top: 40px; left: 0; right: 0; z-index: 2999; pointer-events: none"
  >
    <v-row>
      <v-col class="d-flex align-center justify-space-between">
        <v-card
          class="d-flex align-center"
          elevation="10"
          color="#42455a"
          style="pointer-events: all"
        >
          <template v-if="dialog.currentDialog !== null">
            <v-divider vertical></v-divider>
            <v-btn
              rounded="0"
              size="60"
              variant="tonal"
              color="white"
              @click="dialog.closeDialog(dialog.currentDialog)"
            >
              <v-icon>
                <Icon icon="mdi:close" />
              </v-icon>
            </v-btn>
          </template>
        </v-card>
        <v-card elevation="10" color="#42455a" style="pointer-events: all">
          <div class="d-flex align-center justify-end">
            <template v-if="dialog.currentDialog !== null">
              <v-btn
                rounded="0"
                size="60"
                variant="tonal"
                color="white"
                @click="dialog.infoDialogToggle"
              >
                <v-icon>
                  <Icon icon="mdi:information-outline" />
                </v-icon>
              </v-btn>
              <v-divider vertical></v-divider>
            </template>
            <v-btn
              rounded="0"
              variant="text"
              height="60"
              @click="openDrawer"
              class="hidden-md-and-up"
            >
              <v-icon v-if="drawer">
                <Icon icon="mdi:close" />
              </v-icon>
              <v-icon v-else>
                <Icon icon="mdi:menu" />
              </v-icon>
            </v-btn>
            <template v-for="(page, i) in pages">
              <v-btn
                exact
                color="white"
                rounded="0"
                variant="tonal"
                height="60"
                class="text-lowercase hidden-sm-and-down"
                :to="page['link']"
                @click="dialog.closeDialog(dialog.currentDialog)"
              >
                {{ page["title"] }}
              </v-btn>
              <v-divider
                class="hidden-sm-and-down"
                vertical
                v-if="i !== pages.length - 1"
              ></v-divider>
            </template>
            <template v-if="user.userData?.id">
              <LazyAdminSharedAdminNavDrop :routes="routes" />
            </template>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container> -->
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
