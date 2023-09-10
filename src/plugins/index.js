// Plugins
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import VueTilt from "vue-tilt.js";
import router from "../router";
import vuetify from "./vuetify";
import { loadFonts } from "./webfontloader";

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(router).use(VueTilt).use(autoAnimatePlugin);
}
