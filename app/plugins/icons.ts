import { aliases, iconify } from '@/utils/iconify'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vuetify:before-create', ({ vuetifyOptions }) => {
    vuetifyOptions.icons = {
      defaultSet: 'iconify',
      aliases,
      sets: { iconify },
    }
  })
})