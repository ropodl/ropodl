// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onOfflineReady() {},
});

const app = createApp(App);

registerPlugins(app);
onOfflineReady();

app.mount("#app");
