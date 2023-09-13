<script setup>
import { usePortfolioDialog } from "@/stores/portfolioDialog";
import { Icon } from "@iconify/vue";
import { defineAsyncComponent, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
// store init
const dialog = usePortfolioDialog();

const Logo = defineAsyncComponent(() => import("@/components/shared/Logo.vue"));

const links = [
  {
    icon: "mdi:home",
    title: "Home",
  },
  {
    icon: "mdi:file-document",
    title: "About",
  },
  {
    icon: "mdi:file-certificate",
    title: "Portfolio",
  },
  {
    icon: "mdi:contacts",
    title: "Contact",
  },
];

let drawer = ref(false);

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
            rounded="0"
            variant="text"
            color="transparent"
            :to="{ name: 'Home' }"
            height="60"
            aria-label="Home"
          >
            <Logo :width="30" :height="60" />
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
            <v-tabs hide-slider height="60" class="hidden-sm-and-down">
              <template v-for="(link, i) in links">
                <v-hover v-slot="{ isHovering, props }">
                  <v-tab
                    v-bind="props"
                    rounded="0"
                    :class="[
                      isHovering ? 'text-primary' : 'text-white',
                      'text-lowercase',
                    ]"
                    :to="{ name: link['title'] }"
                    @click="dialog.closeDialog(dialog.currentDialog)"
                  >
                    {{ link.title }}
                  </v-tab>
                </v-hover>
                <v-divider vertical v-if="i !== links.length - 1"></v-divider>
              </template>
            </v-tabs>
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
          v-for="link in links"
          :title="link.title"
          :to="{ name: link['title'] }"
          @click="drawer = false"
        >
          <template v-slot:prepend>
            <v-icon>

              <Icon :icon="link['icon']" />
            </v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>
