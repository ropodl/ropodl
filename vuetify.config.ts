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
      variant: 'outlined',
    },
    VTextField: {
      rounded: 'lg',
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
    },
    VSelect: {
      rounded: 'lg',
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
          primary: '#d64937',
          secondary: '#B0B0B0',
          background: '#0F0F0F',
          surface: '#1A1A1A',
        },
      },
      light: {
        dark: false,
        colors: {
          primary: '#d64937',
          secondary: '#4A4A4A',
          background: '#FFFFFF',
          surface: '#F5F5F5',
        },
      },
    },
  },
});
