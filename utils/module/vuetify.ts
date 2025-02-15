import colors from "vuetify/util/colors";
// "#ff7a03"
export const vuetifyOptions = {
  defaults: {
    VBtn: {
      class: "text-none",
      size: "small"
    }
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
          primary: colors.shades.white,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          brand: "#ff7a03"
        },
      },
      light: {
        dark: false,
        colors: {
          primary: colors.shades.black,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          brand: "#ff7a03"
        },
      },
    },
  },
};
