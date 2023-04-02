// Explore tauri
// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);

app.config.compilerOptions.comments = false;

registerPlugins(app);

app.mount("#app");
