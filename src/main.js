// Components
import App from "./App.vue";
// Composables
import { createApp } from "vue";
// Plugins
import { registerPlugins } from "@/plugins";
import { createPinia } from "pinia";

import VideoBackground from "vue-responsive-video-background-player";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

registerPlugins(app);
app.mount("#app");
app.component("video-background", VideoBackground);
