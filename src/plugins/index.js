// Plugins
import router from "../router";
import { loadFontAwesome } from "./fontawesome";
import vuetify from "./vuetify";
import { loadFonts } from "./webfontloader";
// import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

export function registerPlugins(app) {
  loadFonts();
  loadFontAwesome(app);
  app.use(vuetify).use(router);
  // .use(autoAnimatePlugin);
}
