import { Icon } from "@iconify/vue";
import { aliases, iconify } from "../utils/iconify.js";

// import { Icon, disableCache } from '@iconify/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vuetify:before-create", ({ vuetifyOptions }) => {
    vuetifyOptions.icons = {
      defaultSet: "iconify",
      aliases,
      sets: { iconify },
    };
  });
  nuxtApp.hook("vuetify:ready", () => {
    // console.log(vuetify.icons.sets['custom']);
    nuxtApp.vueApp.component("iconify-icon", Icon);
    nuxtApp.vueApp.component("icon", Icon);
    // disableCache('all');
  });
});
