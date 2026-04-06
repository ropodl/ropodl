import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';

export default defineVuetifyConfiguration({
  icons: {
    defaultSet: 'custom',
  },
  defaults: {
    VBtn: {
      class: 'text-none',
      rounded: 'pill',
      variant: 'tonal',
    },
    VCard: {
      border: true,
      flat: true,
      rounded: 'xl',
    },
    VAutocomplete: {
      rounded: 'lg',
      variant: 'solo-filled',
      flat: true,
    },
    VTextField: {
      rounded: 'lg',
      variant: 'solo-filled',
      flat: true,
    },
    VTextarea: {
      rounded: 'lg',
      variant: 'solo-filled',
      flat: true,
    },
    VDataTableServer: {
      hover: true,
      rounded: 'xl',
      class: 'bg-transparent',
    },
    VSelect: {
      rounded: 'lg',
      variant: 'solo-filled',
      flat: true,
    },
    VTooltip: {
      rounded: 'lg',
      theme: 'light',
    },
    VLabel: {
      class: 'pt-0 pl-0 font-weight-medium pb-2',
    },
    VFooter: {
      color: 'rgba(var(--v-theme-background),0.3)',
    },
    VAppBar: {
      flat: true,
      density: 'comfortable',
    },
    VNavigationDrawer: {
      elevation: 0,
    },
    VListItem: {
      rounded: 'lg',
    },
    VChip: {
      rounded: 'pill',
      variant: 'tonal',
    },
    VSheet: {
      rounded: 'xl',
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#00BCD4',
          'primary-darken-1': '#0097A7',
          'primary-darken-2': '#0097A7',
          secondary: '#8b95a7',
          background: '#090b10',
          surface: '#11141c',
          'surface-bright': '#171b24',
          'surface-light': '#1d2330',
          'surface-variant': '#10141d',
          'on-surface-variant': '#8f99ab',
          outline: '#2a3140',
          success: '#79c08f',
          warning: '#f2c879',
          error: '#ec8d8d',
        },
      },
      light: {
        dark: false,
        colors: {
          primary: '#00BCD4',
          'primary-darken-1': '#0097A7',
          'primary-darken-2': '#0097A7',
          secondary: '#5c6778',
          background: '#f4f6fb',
          surface: '#ffffff',
          'surface-bright': '#ffffff',
          'surface-light': '#eef2f9',
          'surface-variant': '#e8edf6',
          'on-surface-variant': '#657084',
          outline: '#d6dce8',
          success: '#2f7d4f',
          warning: '#a16207',
          error: '#b42318',
        },
      },
    },
  },
});
