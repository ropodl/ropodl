// Styles
import { md3 } from "vuetify/blueprints";
import colors from "vuetify/lib/util/colors";
import "vuetify/styles";
// Icons
import { fa } from "vuetify/iconsets/fa-svg";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  theme: {
    defaultTheme: "dark",
    variations: {
      colors: ["primary", "secondary", "error", "info", "success", "warning"],
      lighten: 5,
      darken: 5,
    },
    themes: {
      dark: {
        dark: true,
        colors: {
          background: "#dc0714",
          primary: "#ffffff",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
});
