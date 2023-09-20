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
        <div class="text-h5 font-weight-bold">
          Welcome Home, 
          <!-- {{ user.user.name }} -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped></style>
