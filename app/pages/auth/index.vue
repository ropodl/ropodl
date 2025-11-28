<script lang="ts" setup>
const form = ref({
  username: "",
  password: "",
});

$fetch("http://localhost:3000/api/v1/auth/login");
</script>
<template>
  <v-container max-width="1200">
    <v-row>
      <v-col cols="12">
        <layouts-default-page-title>
          Log <span class="text-primary-darken-2">In</span>
        </layouts-default-page-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="form.username"
          density="comfortable"
          placeholder="Email Address"
        />
        <v-text-field
          v-model="form.password"
          density="comfortable"
          placeholder="Password"
        />
        <div class="d-flex justify-end">
          <v-btn color="primary" loading>Submit</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
