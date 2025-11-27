import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
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
    VFooter: {
      color: "rgba(var(--v-theme-background),0.7)",
    },
  },
  theme: {
    defaultTheme: "dark",
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
          primary: "#000000",
        },
      },
    },
  },
});
