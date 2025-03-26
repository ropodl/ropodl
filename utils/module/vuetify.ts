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
      density: "comfortable"
    },
    VSelect: {
      density: "comfortable",
      variant: "outlined",
    },
    VTooltip: {
      theme: "light"
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
          primary: "#FFFFFF", // White
          accent: "#374151", // Gray 700 (Tailwind equivalent)
          secondary: "#D97706", // Amber 600
          info: "#14B8A6", // Teal 500
          warning: "#F59E0B", // Amber 500
          error: "#EF4444", // Red 500
          success: "#22C55E", // Green 500
          brand: "#ff7a03"
        },
      },
      light: {
        dark: false,
        colors: {
          primary: "#000000", // Black
          accent: "#374151", // Gray 700 (Tailwind equivalent)
          secondary: "#D97706", // Amber 600
          info: "#14B8A6", // Teal 500
          warning: "#F59E0B", // Amber 500
          error: "#EF4444", // Red 500
          success: "#22C55E", // Green 500
          brand: "#ff7a03"
        },
      },
      front: {
        colors: {
          background: '#291d16',
          surface: '#1c110a',
          'surface-dim': '#1c110a',
          'surface-bright': '#45362e',
          'on-surface': '#f6ded2',
          outline: '#a78b7c',
          'outline-variant': '#584235',
          primary: '#ffb68b',
          'on-primary': '#522300',
          secondary: '#ffb68c',
          'on-secondary': '#522300',
          tertiary: '#f2bb9c',
          'on-tertiary': '#4a2812',
          error: '#ffb4ab',
          'on-error': '#690005',
          'surface-light': '#45362e',
        },
        dark: true,
        variables: {
          'overlay-background': '#29180d',
        },
      },
    },
  },
};
