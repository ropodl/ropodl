import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';

export default defineVuetifyConfiguration({
  icons: {
    defaultSet: 'custom',
  },
  defaults: {
    VBtn: {
      class: 'text-none',
      rounded: 'lg',
      variant: 'flat',
    },
    VCard: {
      border: true,
      flat: true,
      rounded: 'lg',
    },
    VAutocomplete: {
      rounded: 'lg',
      density: 'comfortable',
      variant: 'outlined',
    },
    VTextField: {
      rounded: 'lg',
      density: 'compact',
      variant: 'outlined',
    },
    VTextarea: {
      rounded: 'lg',
      variant: 'outlined',
    },
    VDataTableServer: {
      hover: true,
      rounded: 'lg',
      class: 'bg-transparent',
      density: 'comfortable',
    },
    VSelect: {
      rounded: 'lg',
      density: 'comfortable',
      variant: 'outlined',
    },
    VTooltip: {
      rounded: 'lg',
      theme: 'light',
    },
    VLabel: {
      class: 'pt-0 pl-0 font-weight-medium pb-2',
    },
    VFooter: {
      color: 'rgba(var(--v-theme-background),0.7)',
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#00F0FF', // Neon Cyan
          secondary: '#7000FF', // Vivid Purple
          accent: '#FF00E5', // Hot Pink
          background: '#050505', // Deep Space Black
          surface: '#121212',
          'surface-variant': '#1e1e1e',
          error: '#FF3D71',
          info: '#0095FF',
          success: '#00E096',
          warning: '#FFAA00',
        },
      },
      light: {
        dark: false,
        colors: {
          primary: '#0066FF',
          secondary: '#6200EA',
          accent: '#00B8D9',
          background: '#F8FAFC',
          surface: '#FFFFFF',
          'surface-variant': '#F1F5F9',
        },
      },
    },
  },
});
