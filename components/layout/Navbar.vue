<script setup>
import { usePortfolioDialog } from "@/stores/portfolioDialog";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";

const route = useRoute();
// store init
const user = useUser();
const dialog = usePortfolioDialog();

let drawer = ref(false);

const pages = [
  {
    icon: "mdi:home",
    title: "home",
    link: "/",
  },
  {
    icon: "mdi:file-document",
    title: "about",
    link: "/about",
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

const openDrawer = () => {
  drawer.value = !drawer.value;
};
</script>
<template>
  <v-container
    class="position-fixed"
    style="top: 0; left: 0; right: 0; z-index: 2999; pointer-events: none"
  >
    <v-row>
      <v-col class="d-flex align-center justify-space-between">
        <v-card
          class="d-flex align-center"
          elevation="10"
          color="#42455a"
          style="pointer-events: all"
        >
          <v-btn
            :active="false"
            rounded="0"
            variant="text"
            color="transparent"
            to="/"
            height="60"
            aria-label="Home"
            @click="dialog.closeDialog(dialog.currentDialog)"
          >
            <LazySharedLogo :width="30" :height="60" />
          </v-btn>
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
              <v-divider vertical v-if="i !== pages.length - 1"></v-divider>
            </template>
            <template v-if="user.userData?.token">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    rounded="0"
                    height="60"
                    width="40"
                    variant="tonal"
                    v-bind="props"
                  >
                    <v-avatar size="40">
                      <v-img src="/favicon.ico"></v-img>
                    </v-avatar>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in 10"
                    :key="index"
                    :value="index"
                  >
                    <v-list-item-title>{{ index }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-bottom-sheet v-model="drawer" scrim="black">
    <v-card rounded="0">
      <v-list>
        <v-list-subheader>Navigate to</v-list-subheader>
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
