<script setup>
import { usePortfolioDialog } from "@/stores/portfolioDialog";
import {
  mdiClose,
  mdiContacts,
  mdiFileCertificate,
  mdiFileDocument,
  mdiHome,
  mdiInformationOutline,
  mdiMenu,
} from "@mdi/js";
import { defineAsyncComponent, ref } from "vue";

// store init
const dialog = usePortfolioDialog();

const Logo = defineAsyncComponent(() => import("@/components/shared/Logo.vue"));

const links = [
  {
    icon: mdiHome,
    title: "Home",
    href: "/",
  },
  {
    icon: mdiFileDocument,
    title: "Resume",
    href: "/resume",
  },
  {
    icon: mdiFileCertificate,
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    icon: mdiContacts,
    title: "Contact",
    href: "/contact",
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
    style="top: 0; left: 0; right: 0; z-index: 2031"
  >
    <v-row>
      <v-col class="d-flex align-center justify-space-between">
        <v-card color="#42455a">
          <span
            style="
              display: inline-block;
              height: 60px;
              backdrop-filter: blur(10px);
            "
          >
            <v-btn
              rounded="0"
              variant="text"
              color="transparent"
              :to="{ name: 'Home' }"
              height="60"
            >
              <Logo :width="30" :height="60" />
            </v-btn>
          </span>
          <template v-if="dialog.currentDialog !== null">
            <v-divider vertical inset class="mx-2"></v-divider>
            <v-btn
              icon
              flat
              variant="tonal"
              color="primary"
              class="mr-3"
              @click="dialog.closeDialog(dialog.currentDialog)"
            >
              <v-icon :icon="mdiClose"></v-icon>
            </v-btn>
          </template>
        </v-card>
        <v-card color="#42455a">
          <div class="d-flex align-center justify-end">
            <template v-if="dialog.currentDialog !== null">
              <v-btn
                icon
                flat
                variant="tonal"
                color="primary"
                class="ml-3"
                @click="dialog.infoDialogToggle"
              >
                <v-icon :icon="mdiInformationOutline"></v-icon>
              </v-btn>
              <v-divider vertical inset class="ml-2"></v-divider>
            </template>
            <span class="d-inline-flex" style="backdrop-filter: blur(10px)">
              <v-btn
                rounded="0"
                variant="text"
                height="60"
                @click="openDrawer"
                class="hidden-md-and-up"
              >
                <v-icon v-if="drawer" :icon="mdiClose"></v-icon>
                <v-icon v-else :icon="mdiMenu"></v-icon>
              </v-btn>
              <v-tabs hide-slider height="60" class="hidden-sm-and-down">
                <template v-for="link,i in links">
                  <v-tab rounded="0" class="text-lowercase" :to="link['href']">
                    {{ link.title }}
                  </v-tab>
                  <v-divider
                    vertical
                    inset
                    v-if="i !== links.length - 1"
                  ></v-divider>
                </template>
              </v-tabs>
            </span>
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
          :prepend-icon="link.icon"
          :title="link.title"
          :to="link.href"
          @click="drawer = false"
        ></v-list-item>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>
<style lang="scss" scoped>
ul.nav-link {
  list-style: none;
  font-size: 25px;
  font-weight: 400;

  li {
    a {
      color: white;
      text-transform: capitalize;
      text-decoration: none;

      &::after {
        content: "";
        display: block;
        width: 0px;
        height: 3px;
        border-radius: 10px;
        margin-left: 0;
        margin-right: 0;
        background-color: rgba(var(--v-theme-primary));
        transition: width 200ms linear;
      }

      &:hover {
        &::after {
          width: 100%;
        }
      }

      &.router-link-exact-active {
        &::after {
          content: "";
          display: block;
          width: 50%;
          height: 3px;
          border-radius: 10px;
          margin-left: 0;
          margin-right: 0;
          background-color: rgba(var(--v-theme-primary));
          transition: width 200ms linear;
        }

        &:hover {
          &::after {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
