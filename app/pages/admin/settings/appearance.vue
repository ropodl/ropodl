<script setup lang="ts">
import { computed } from 'vue';
import {
  useAppearance,
  type Density,
  type AdminNavVariant,
} from '~/composables/useAppearance';

const {
  isDark,
  density,
  primaryColor,
  adminNavVariant,
  setDensity,
  setPrimaryColor,
  setAdminNavVariant,
} = useAppearance();

const densities: { title: string; value: Density }[] = [
  { title: 'Default', value: 'default' },
  { title: 'Comfortable', value: 'comfortable' },
  { title: 'Compact', value: 'compact' },
];

const colors = [
  '#FFFFFF', // Default/White
  '#FF5252', // Red
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#FB8C00', // Orange
  '#9C27B0', // Purple
  '#00BCD4', // Cyan
];

const navVariants: { title: string; value: AdminNavVariant; copy: string }[] = [
  {
    title: 'Classic',
    value: 'classic',
    copy: 'Full labels with standard grouped navigation.',
  },
  {
    title: 'Compact',
    value: 'compact',
    copy: 'Tighter width with the same full navigation model.',
  },
  {
    title: 'Rail',
    value: 'rail',
    copy: 'Icon-first navigation for the smallest footprint.',
  },
  {
    title: 'Floating',
    value: 'floating',
    copy: 'Detached drawer with softer, elevated framing.',
  },
];

const activeNavVariant = computed(() =>
  navVariants.find((item) => item.value === adminNavVariant.value)
);

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});
</script>

<template>
  <v-container class="admin-page">
    <section class="admin-hero">
      <div class="admin-hero__kicker">Studio moodboard</div>
      <div class="admin-hero__title">Recompose the admin atmosphere.</div>
      <div class="admin-hero__copy">
        Adjust mode, density, and accent behavior to match how you like to work.
      </div>
      <div class="admin-metric-ribbon mt-6">
        <div class="admin-metric-card">
          <span>Mode</span>
          <strong>{{ isDark ? 'Nocturne' : 'Daylight' }}</strong>
        </div>
        <div class="admin-metric-card">
          <span>Density</span>
          <strong>{{ density }}</strong>
        </div>
        <div class="admin-metric-card">
          <span>Accent</span>
          <strong>{{ primaryColor }}</strong>
        </div>
        <div class="admin-metric-card">
          <span>Drawer</span>
          <strong>{{ activeNavVariant?.title || 'Classic' }}</strong>
        </div>
      </div>
    </section>

    <div class="admin-settings-grid">
      <v-card class="admin-panel pa-6">
        <div class="admin-panel__title mb-4 d-flex align-center">
          <v-icon start icon="carbon:color-palette" color="primary" />
          Theme Mode
        </div>
        <p class="text-body-2 text-medium-emphasis mb-6">
          Switch the room between bright editorial light and a darker studio backdrop.
        </p>
        <div class="admin-preview-stage mb-6">
          <div class="admin-preview-stage__card">
            <div class="text-overline text-medium-emphasis">Current ambience</div>
            <div class="text-h6 mt-2">{{ isDark ? 'Dark studio' : 'Light studio' }}</div>
            <div class="admin-panel__copy">
              {{ isDark ? 'High contrast surfaces with warmer highlights.' : 'Brighter panels with sharper editorial edges.' }}
            </div>
          </div>
        </div>
        <v-btn-toggle
          v-model="isDark"
          mandatory
          color="primary"
          variant="outlined"
          divided
          class="w-100"
          rounded="xl"
        >
          <v-btn
            :value="false"
            class="flex-grow-1 py-6"
            prepend-icon="carbon:sun"
          >
            Light
          </v-btn>
          <v-btn
            :value="true"
            class="flex-grow-1 py-6"
            prepend-icon="carbon:moon"
          >
            Dark
          </v-btn>
        </v-btn-toggle>
      </v-card>

      <v-card class="admin-panel pa-6">
        <div class="admin-panel__title mb-4 d-flex align-center">
          <v-icon start icon="carbon:grid" color="primary" />
          Display Density
        </div>
        <p class="text-body-2 text-medium-emphasis mb-6">
          Adjust the spacing and size of components like buttons and inputs.
        </p>
        <div class="admin-mini-feed mb-6">
          <div class="admin-mini-feed__item">
            <span>Reading rhythm</span>
            <strong>{{ density === 'compact' ? 'Tight' : density === 'comfortable' ? 'Balanced' : 'Open' }}</strong>
          </div>
          <div class="admin-mini-feed__item">
            <span>Recommended for</span>
            <strong>{{ density === 'compact' ? 'Large tables' : density === 'comfortable' ? 'Daily work' : 'Review mode' }}</strong>
          </div>
        </div>
        <v-select
          :model-value="density"
          :items="densities"
          item-title="title"
          item-value="value"
          variant="outlined"
          hide-details
          rounded="xl"
          label="Density Level"
          @update:model-value="setDensity"
        />
      </v-card>
    </div>

    <v-card class="admin-panel pa-6 mt-5">
      <div class="admin-panel__title mb-4 d-flex align-center">
        <v-icon start icon="carbon:side-panel-open" color="primary" />
        Navigation Drawer
      </div>
      <p class="text-body-2 text-medium-emphasis mb-6">
        Pick one of four drawer layouts and keep it saved for the admin shell.
      </p>

      <div class="admin-nav-variant-grid">
        <button
          v-for="variant in navVariants"
          :key="variant.value"
          type="button"
          class="admin-nav-variant"
          :class="{ 'is-active': adminNavVariant === variant.value }"
          @click="setAdminNavVariant(variant.value)"
        >
          <div
            class="admin-nav-variant__preview"
            :class="`admin-nav-variant__preview--${variant.value}`"
          >
            <div class="admin-nav-variant__drawer">
              <span />
              <span />
              <span />
            </div>
            <div class="admin-nav-variant__surface">
              <span />
              <span />
            </div>
          </div>
          <div class="admin-nav-variant__title">{{ variant.title }}</div>
          <div class="admin-nav-variant__copy">{{ variant.copy }}</div>
        </button>
      </div>
    </v-card>

    <v-card class="admin-panel pa-6 mt-5">
      <div class="admin-panel__title mb-4 d-flex align-center">
        <v-icon start icon="carbon:color-switch" color="primary" />
        Primary Brand Color
      </div>
      <p class="text-body-2 text-medium-emphasis mb-6">
        Choose the accent that defines buttons, active states, and visual anchors.
      </p>

      <div class="admin-swatch-row mb-8">
        <button
          v-for="color in colors"
          :key="color"
          type="button"
          class="admin-swatch"
          :class="{ 'is-active': primaryColor === color }"
          :style="{ backgroundColor: color }"
          @click="setPrimaryColor(color)"
        >
          <span class="sr-only">{{ color }}</span>
        </button>
      </div>

      <v-row>
        <v-col cols="12" md="5">
          <div class="text-subtitle-2 font-weight-bold mb-4">
            Custom Color Selection
          </div>
          <v-color-picker
            :model-value="primaryColor"
            hide-inputs
            show-swatches
            width="100%"
            rounded="xl"
            class="border"
            @update:model-value="setPrimaryColor"
          />
        </v-col>
        <v-col cols="12" md="7">
          <div class="text-subtitle-2 font-weight-bold mb-4">Live preview</div>
          <div class="admin-preview-stage">
            <div class="admin-preview-stage__card">
              <div class="d-flex align-center justify-space-between mb-6">
                <div>
                  <div class="text-overline text-medium-emphasis">Primary moment</div>
                  <div class="text-h6 mt-1">Studio controls</div>
                </div>
                <v-chip color="primary" variant="flat">Active</v-chip>
              </div>
              <div class="d-flex flex-wrap ga-3 mb-5">
                <v-btn color="primary" rounded="xl">Primary action</v-btn>
                <v-btn color="primary" variant="tonal" rounded="xl">Secondary</v-btn>
                <v-btn variant="outlined" rounded="xl">Neutral</v-btn>
              </div>
              <div class="admin-mini-feed">
                <div class="admin-mini-feed__item">
                  <span>Accent hex</span>
                  <strong>{{ primaryColor }}</strong>
                </div>
                <div class="admin-mini-feed__item">
                  <span>Visual role</span>
                  <strong>Action + navigation</strong>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <div class="mt-12 text-center text-caption text-medium-emphasis">
      Your preferences are stored locally in your browser and will persist
      across sessions.
    </div>
  </v-container>
</template>
