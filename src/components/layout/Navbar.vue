<script setup>
import { defineAsyncComponent } from "vue";

const Logo = defineAsyncComponent(() => import("@/components/shared/Logo.vue"));

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Resume",
    href: "/resume",
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
</script>
<template>
  <v-container
    class="pa-0"
    style="position: absolute; top: 0; left: 0; right: 0; z-index: 10"
  >
    <v-card flat color="transparent" class="d-flex align-center pa-5">
      <v-row justify="space-between">
        <v-col cols="12" md="4">
          <v-btn variant="tonal" color="transparent" to="/">
            <Logo :width="30" :height="30" />
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn
              rounded="0"
              height="50"
              v-for="(link, i) in links"
              color="white"
              variant="tonal"
              :to="link['href']"
              :class="[i != links.length - 1 ? ' ' : '', 'text-capitalize']"
              style="background-color: transparent"
            >
              {{ link["title"] }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<style>
/* .v-btn--variant-tonal .v-btn__underlay {
  position: unset !important;
} */
</style>
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
      //   &:hover {
      //     color: rgb(var(--v-theme-primary));
      //     &::after {
      //       content: "";
      //       display: block;
      //       width: 100%;
      //       height: 2px;
      //       border-radius: 10px;
      //       margin-left: 0;
      //       margin-right: 0;
      //       background-color: rgba(var(--v-theme-primary));
      //     }
      //   }
      //   &.router-link-exact-active {
      //     font-weight: bold;
      //     &::after {
      //       content: "";
      //       display: block;
      //       width: 50%;
      //       height: 2px;
      //       border-radius: 10px;
      //       margin-left: 0;
      //       margin-right: 0;
      //       background-color: rgba(var(--v-theme-primary));
      //     }
      //   }
    }
  }
}
</style>
