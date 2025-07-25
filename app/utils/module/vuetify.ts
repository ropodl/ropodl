export const vuetifyOptions = {
  labComponents: true,
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
      color: "rgb(var(--v-theme-background))",
    },
    VAutocomplete: {
      density: "comfortable",
      variant: "outlined",
    },
    VTextField: {
      density: "compact",
      variant: "outlined",
    },
    VTextarea: {
      variant: "outlined",
    },
    VDataTableServer: {
      hover: true,
      class: "bg-transparent",
      density: "comfortable",
    },
    VSelect: {
      density: "comfortable",
      variant: "outlined",
    },
    VTooltip: {
      theme: "light",
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
          primary: "#FFFFFF", // White
          accent: "#374151", // Gray 700 (Tailwind equivalent)
          secondary: "#D97706", // Amber 600
          info: "#14B8A6", // Teal 500
          warning: "#F59E0B", // Amber 500
          error: "#EF4444", // Red 500
          success: "#22C55E", // Green 500
        },
      },
      light: {
        dark: false,
        colors: {
          primary: "#FFFFFF", // White
          accent: "#374151", // Gray 700 (Tailwind equivalent)
          secondary: "#D97706", // Amber 600
          info: "#14B8A6", // Teal 500
          warning: "#F59E0B", // Amber 500
          error: "#EF4444", // Red 500
          success: "#22C55E", // Green 500
        },
      },
    },
  },
};
