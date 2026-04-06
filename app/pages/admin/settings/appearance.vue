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
  '#D64937', // Brand Red
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

const currentDensityCopy = computed(() => {
  if (density.value === 'compact') return 'Best for dense tables and quick admin work.';
  if (density.value === 'comfortable') return 'A balanced rhythm for daily editing sessions.';
  return 'More breathing room for review and content QA.';
});

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});
</script>

<template>
  <v-container class="admin-page">
    <section class="admin-hero">
      <div class="admin-hero__kicker">Appearance</div>
      <div class="admin-hero__title">Compact, calm, and easy to scan.</div>
      <div class="admin-hero__copy">
        Tune the admin workspace with softer surfaces, tighter spacing, and a quieter accent system.
      </div>
    </section>

    <v-row class="mb-5" dense>
      <v-col cols="12" md="8">
        <v-card class="admin-panel">
          <v-card-text class="pa-5 pa-md-6">
            <div class="admin-split-header mb-5">
              <div>
                <div class="admin-split-header__title">Current system</div>
                <div class="admin-split-header__copy">
                  A small summary of the active admin mood and spacing.
                </div>
              </div>
              <v-chip size="small">{{ activeNavVariant?.title || 'Classic' }}</v-chip>
            </div>

            <v-row dense>
              <v-col cols="12" sm="6" lg="3">
                <v-sheet border color="surface-variant" class="pa-4">
                  <div class="text-caption text-uppercase text-medium-emphasis">Mode</div>
                  <div class="text-subtitle-1 font-weight-medium mt-1">
                    {{ isDark ? 'Dark' : 'Light' }}
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="6" lg="3">
                <v-sheet border color="surface-variant" class="pa-4">
                  <div class="text-caption text-uppercase text-medium-emphasis">Density</div>
                  <div class="text-subtitle-1 font-weight-medium mt-1">{{ density }}</div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="6" lg="3">
                <v-sheet border color="surface-variant" class="pa-4">
                  <div class="text-caption text-uppercase text-medium-emphasis">Accent</div>
                  <div class="text-subtitle-1 font-weight-medium mt-1">{{ primaryColor }}</div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="6" lg="3">
                <v-sheet border color="surface-variant" class="pa-4">
                  <div class="text-caption text-uppercase text-medium-emphasis">Drawer</div>
                  <div class="text-subtitle-1 font-weight-medium mt-1">
                    {{ activeNavVariant?.title || 'Classic' }}
                  </div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="admin-panel h-100">
          <v-card-text class="pa-5 pa-md-6">
            <div class="admin-panel__title mb-2">Working feel</div>
            <div class="text-body-2 text-medium-emphasis mb-5">
              {{ currentDensityCopy }}
            </div>
            <v-list bg-color="transparent" lines="two" density="compact">
              <v-list-item prepend-icon="carbon:view" title="Blur-inspired surfaces">
                <template #subtitle>Soft panels, quieter contrast, and lighter chrome.</template>
              </v-list-item>
              <v-list-item prepend-icon="carbon:grid" title="Compact spacing">
                <template #subtitle>Built to scan lists and forms without visual clutter.</template>
              </v-list-item>
              <v-list-item prepend-icon="carbon:color-palette" title="Restrained accent">
                <template #subtitle>Accent stays focused on action and state.</template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="mb-5">
      <v-col cols="12" md="6">
        <v-card class="admin-panel h-100">
          <v-card-text class="pa-5 pa-md-6">
            <div class="admin-panel__title mb-2 d-flex align-center">
              <v-icon start icon="carbon:color-palette" color="primary" />
              Theme mode
            </div>
            <div class="text-body-2 text-medium-emphasis mb-5">
              Switch between a brighter editorial surface and the darker default workspace.
            </div>

            <v-btn-toggle
              v-model="isDark"
              mandatory
              color="primary"
              divided
              class="w-100"
            >
              <v-btn :value="false" class="flex-grow-1" prepend-icon="carbon:sun">
                Light
              </v-btn>
              <v-btn :value="true" class="flex-grow-1" prepend-icon="carbon:moon">
                Dark
              </v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="admin-panel h-100">
          <v-card-text class="pa-5 pa-md-6">
            <div class="admin-panel__title mb-2 d-flex align-center">
              <v-icon start icon="carbon:grid" color="primary" />
              Density
            </div>
            <div class="text-body-2 text-medium-emphasis mb-5">
              Apply one density level across the admin workspace.
            </div>

            <v-select
              :model-value="density"
              :items="densities"
              item-title="title"
              item-value="value"
              hide-details
              label="Density level"
              @update:model-value="setDensity"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="admin-panel mb-5">
      <v-card-text class="pa-5 pa-md-6">
        <div class="admin-panel__title mb-2 d-flex align-center">
          <v-icon start icon="carbon:side-panel-open" color="primary" />
          Navigation drawer
        </div>
        <div class="text-body-2 text-medium-emphasis mb-5">
          Choose the shell layout that best matches how tightly you want the admin to feel.
        </div>

        <v-row dense>
          <v-col
            v-for="variant in navVariants"
            :key="variant.value"
            cols="12"
            sm="6"
            lg="3"
          >
            <v-card
              border
              :color="adminNavVariant === variant.value ? 'surface-variant' : undefined"
              :variant="adminNavVariant === variant.value ? 'flat' : 'text'"
              class="h-100"
              @click="setAdminNavVariant(variant.value)"
            >
              <v-card-text class="pa-4">
                <div class="d-flex align-center justify-space-between mb-3">
                  <div class="text-subtitle-2 font-weight-medium">{{ variant.title }}</div>
                  <v-icon
                    :icon="adminNavVariant === variant.value ? 'carbon:checkmark-filled' : 'carbon:chevron-right'"
                    :color="adminNavVariant === variant.value ? 'primary' : undefined"
                  />
                </div>
                <div class="text-body-2 text-medium-emphasis mb-4">{{ variant.copy }}</div>
                <v-sheet border color="background" class="pa-3">
                  <div class="d-flex ga-2">
                    <v-sheet
                      border
                      :width="variant.value === 'rail' ? 44 : variant.value === 'compact' ? 72 : 88"
                      min-height="68"
                      color="surface"
                    />
                    <v-sheet border class="flex-grow-1" min-height="68" color="surface" />
                  </div>
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="admin-panel">
      <v-card-text class="pa-5 pa-md-6">
        <v-row dense>
          <v-col cols="12" md="5">
            <div class="admin-panel__title mb-2 d-flex align-center">
              <v-icon start icon="carbon:color-switch" color="primary" />
              Accent color
            </div>
            <div class="text-body-2 text-medium-emphasis mb-5">
              Keep the accent subtle so actions and active states stand out without overwhelming the page.
            </div>

            <div class="d-flex flex-wrap ga-2 mb-5">
              <v-btn
                v-for="color in colors"
                :key="color"
                icon
                :color="color"
                :variant="primaryColor === color ? 'flat' : 'tonal'"
                @click="setPrimaryColor(color)"
              >
                <v-icon
                  :icon="primaryColor === color ? 'carbon:checkmark' : 'carbon:circle-solid'"
                  size="16"
                />
              </v-btn>
            </div>

            <v-color-picker
              :model-value="primaryColor"
              hide-inputs
              show-swatches
              width="100%"
              @update:model-value="setPrimaryColor"
            />
          </v-col>

          <v-col cols="12" md="7">
            <v-sheet border color="surface-variant" class="pa-5 h-100">
              <div class="d-flex align-center justify-space-between mb-5">
                <div>
                  <div class="text-caption text-uppercase text-medium-emphasis">Preview</div>
                  <div class="text-h6 mt-1">Admin actions</div>
                </div>
                <v-chip color="primary">Active</v-chip>
              </div>

              <div class="d-flex flex-wrap ga-3 mb-5">
                <v-btn color="primary" variant="flat">Save changes</v-btn>
                <v-btn color="primary">Secondary</v-btn>
                <v-btn variant="text">Quiet action</v-btn>
              </div>

              <v-list bg-color="transparent" density="compact" lines="two">
                <v-list-item title="Accent hex">
                  <template #append>
                    <v-chip size="small">{{ primaryColor }}</v-chip>
                  </template>
                </v-list-item>
                <v-list-item title="Visual role">
                  <template #append>
                    <span class="text-body-2 text-medium-emphasis">Actions and active states</span>
                  </template>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div class="mt-12 text-center text-caption text-medium-emphasis">
      Your preferences are stored locally in your browser and will persist
      across sessions.
    </div>
  </v-container>
</template>
