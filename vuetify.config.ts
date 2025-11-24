import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  ssr: true,
  defaults: {
    VBtn: {
      class: "text-none",
      rounded: "lg",
      variant: "flat",
    },
    VCard: {
      border: true,
      flat: true,
      rounded: "lg",
    },
    VAutocomplete: {
      rounded: "lg",
      density: "comfortable",
      variant: "outlined",
    },
    VTextField: {
      rounded: "lg",
      density: "compact",
      variant: "outlined",
    },
    VTextarea: {
      rounded: "lg",
      variant: "outlined",
    },
    VDataTableServer: {
      hover: true,
      rounded: "lg",
      class: "bg-transparent",
      density: "comfortable",
    },
    VSelect: {
      rounded: "lg",
      density: "comfortable",
      variant: "outlined",
    },
    VTooltip: {
      rounded: "lg",
      theme: "light",
    },
    VLabel: {
      class: "pt-0 pl-0 font-weight-medium pb-2",
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
          primary: "#FFFFFF",
        },
      },
      light: {
        dark: false,
        colors: {
          primary: "#FFFFFF",
        },
      },
    },
  },
});
