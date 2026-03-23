<script lang="ts" setup>
import { useAppearance } from '~/composables/useAppearance';

const { mobile } = useDisplay();
const { density } = useAppearance();
</script>
<template>
  <v-app>
    <layouts-default-nav />
    <v-main :class="{ 'mt-16': !mobile, 'mt-12': mobile }">
      <div class="shell-bg position-fixed inset-0" aria-hidden="true">
        <div class="shell-bg__mesh" />
        <div class="shell-bg__orb shell-bg__orb--one" />
        <div class="shell-bg__orb shell-bg__orb--two" />
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
        <div class="shell-frame">
          <slot />
        </div>
      </v-defaults-provider>
    </v-main>
    <layouts-default-foot />
  </v-app>
</template>
<style scoped>
.shell-bg {
  pointer-events: none;
  overflow: hidden;
  z-index: -2;
}

.shell-bg__mesh {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(var(--v-theme-primary), 0.12), transparent 26%),
    radial-gradient(circle at 85% 18%, rgba(var(--v-theme-primary), 0.1), transparent 24%),
    linear-gradient(180deg, rgba(var(--v-theme-surface), 0.38), rgba(var(--v-theme-background), 0.06)),
    rgb(var(--v-theme-background));
}

.shell-bg__orb {
  position: absolute;
  border-radius: 999px;
  background: rgba(var(--v-theme-primary), 0.14);
  filter: blur(72px);
  opacity: 0.9;
}

.shell-bg__orb--one {
  top: 8%;
  right: min(12vw, 180px);
  width: min(28vw, 360px);
  height: min(28vw, 360px);
}

.shell-bg__orb--two {
  left: min(8vw, 120px);
  bottom: 12%;
  width: min(24vw, 280px);
  height: min(24vw, 280px);
  background: rgba(var(--v-theme-primary), 0.08);
}

.shell-frame {
  position: relative;
  z-index: 1;
  min-height: 100%;
}
</style>
