<script lang="ts" setup>
import { useAppearance } from '~/composables/useAppearance';

const { mobile } = useDisplay();
const { density } = useAppearance();
</script>
<template>
  <v-app>
    <layouts-default-nav />
    <v-main :class="{ 'mt-16': !mobile, 'mt-12': mobile }">
      <div class="v-bg position-fixed top-0 right-0 left-0 bottom-0">
        <div
          aria-hidden="true"
          class="overflow-hidden opacity-20 w-100 h-100"
        />
      </div>
      <v-defaults-provider
        :defaults="{
          VContainer: {
            maxWidth: 1200
          },
          VBtn: { density },
          VTextField: { density },
          VTextarea: { density },
          VSelect: { density },
          VAutocomplete: { density },
          VDataTableServer: { density },
          VList: { density },
          VListItem: { density },
        }"
      >
        <slot />
      </v-defaults-provider>
    </v-main>
    <layouts-default-foot />
  </v-app>
</template>
<style scoped>
.v-bg {
  filter: blur(56px);
  pointer-events: none;
}

.v-bg > div {
  background:
    radial-gradient(circle at 20% 20%, rgba(var(--v-theme-primary), 0.45), transparent 28%),
    radial-gradient(circle at 80% 18%, rgba(var(--v-theme-primary), 0.25), transparent 24%),
    radial-gradient(circle at 50% 78%, rgba(var(--v-theme-primary), 0.2), transparent 32%);
  z-index: -10;
}
</style>
