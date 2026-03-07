<script setup lang="ts">
import { useAppearance, type Density } from '~/composables/useAppearance';

const { isDark, density, primaryColor, setDensity, setPrimaryColor } =
  useAppearance();

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

definePageMeta({
  layout: 'admin',
});
</script>

<template>
  <v-container max-width="800" class="py-12">
    <v-row>
      <v-col cols="12">
        <v-btn
          variant="text"
          prepend-icon="carbon:arrow-left"
          class="mb-4"
          @click="$router.back()"
        >
          Back
        </v-btn>
        <h1 class="text-h3 font-weight-bold mb-2">Appearance</h1>
        <p class="text-subtitle-1 text-medium-emphasis mb-8">
          Customize how the application looks and feels to you.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="xl" border class="pa-6 h-100">
          <div class="text-h6 font-weight-bold mb-4 d-flex align-center">
            <v-icon start icon="carbon:color-palette" color="primary" />
            Theme Mode
          </div>
          <p class="text-body-2 text-medium-emphasis mb-6">
            Switch between light and dark themes or follow system settings.
          </p>
          <v-btn-toggle
            v-model="isDark"
            mandatory
            color="primary"
            variant="outlined"
            divided
            class="w-100"
            rounded="lg"
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
      </v-col>

      <v-col cols="12" md="6">
        <v-card rounded="xl" border class="pa-6 h-100">
          <div class="text-h6 font-weight-bold mb-4 d-flex align-center">
            <v-icon start icon="carbon:grid" color="primary" />
            Display Density
          </div>
          <p class="text-body-2 text-medium-emphasis mb-6">
            Adjust the spacing and size of components like buttons and inputs.
          </p>
          <v-select
            v-model="density"
            :items="densities"
            item-title="title"
            item-value="value"
            variant="outlined"
            hide-details
            rounded="lg"
            label="Density Level"
          />
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card rounded="xl" border class="pa-6">
          <div class="text-h6 font-weight-bold mb-4 d-flex align-center">
            <v-icon start icon="carbon:color-switch" color="primary" />
            Primary Brand Color
          </div>
          <p class="text-body-2 text-medium-emphasis mb-6">
            Choose a color that will be used for primary actions and accents.
          </p>

          <div class="d-flex flex-wrap gap-4 mb-8">
            <v-avatar
              v-for="color in colors"
              :key="color"
              :color="color"
              size="48"
              class="cursor-pointer border-md transition-swing elevation-4"
              :class="{
                'border-primary border-opacity-100 scale-110':
                  primaryColor === color,
                'border-white border-opacity-25 hover-scale':
                  primaryColor !== color,
              }"
              @click="setPrimaryColor(color)"
            >
              <v-icon
                v-if="primaryColor === color"
                icon="carbon:checkmark"
                :color="color === '#FFFFFF' ? 'black' : 'white'"
              />
            </v-avatar>
          </div>

          <v-divider class="mb-8" />

          <v-row>
            <v-col cols="12" md="6">
              <div class="text-subtitle-2 font-weight-bold mb-4">
                Custom Color Selection
              </div>
              <v-color-picker
                v-model="primaryColor"
                hide-inputs
                show-swatches
                width="100%"
                rounded="lg"
                class="border"
              />
            </v-col>
            <v-col cols="12" md="6">
              <div class="text-subtitle-2 font-weight-bold mb-4">Preview</div>
              <v-card
                border
                rounded="lg"
                class="pa-8 d-flex flex-column align-center justify-center h-100 bg-surface"
              >
                <v-btn color="primary" class="mb-4" rounded="pill"
                  >Example Button</v-btn
                >
                <div class="text-primary font-weight-bold">
                  Primary Text Example
                </div>
                <v-checkbox label="Checkbox" color="primary" model-value />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <div class="mt-12 text-center text-caption text-medium-emphasis">
      Your preferences are stored locally in your browser and will persist
      across sessions.
    </div>
  </v-container>
</template>

<style scoped>
.gap-4 {
  gap: 16px;
}

.transition-swing {
  transition: all 0.2s ease-in-out;
}

.scale-110 {
  transform: scale(1.1);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.bg-surface {
  background-color: rgb(var(--v-theme-surface)) !important;
}
</style>
