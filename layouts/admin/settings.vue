<script setup>
const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);

const test = ref(0);
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

const title = computed(() => tabs.value[test.value].text);
</script>
<template>
  <NuxtLayout name="admin">
    <v-container :fluid="isFluid">
      <v-row>
        <v-col cols="12">
          <h1>{{ title }}</h1>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-tabs v-model="test" direction="vertical">
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
