// Plugins
import { loadFonts } from "./webfontloader";
import { loadFontAwesome } from "./fontawesome";
import vuetify from "./vuetify";
import router from "../router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

export function registerPlugins(app) {
  loadFonts();
  loadFontAwesome(app);
  app.use(vuetify).use(router).use(autoAnimatePlugin);
}
