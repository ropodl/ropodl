<script setup>
const user = useUser();
definePageMeta({
  layout: "admin",
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">
          Welcome back,
          {{ user.userData.name }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped></style>
