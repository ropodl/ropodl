<script setup>
const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);

const tabs = ref([
  {
    text: "Account Settings",
    to: "/admin/settings",
  },
  {
    text: "Appearance Settings",
    to: "/admin/settings/appearance",
  },
]);
</script>
<template>
  <NuxtLayout name="admin">
    <v-container :fluid="isFluid">
      <v-row>
        <v-col cols="12" md="3">
          <v-card>
            <v-tabs direction="vertical">
              <template v-for="{ text, to } in tabs">
                <v-tab :text :to />
              </template>
            </v-tabs>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>
