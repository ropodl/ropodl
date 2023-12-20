<script setup>
import { Icon } from "@iconify/vue";
const supabase = useSupabaseClient();

const loading = ref(true);

const form = reactive({
  email: "",
  password: "",
});

const signIn = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });
  if (error) return console.log(error.message);
  navigateTo("/admin/", { replace: true });
};
</script>
<template>
  <v-container class="h-100" style="margin-top: 64px">
    <v-row align="center" justify="center" class="h-100">
      <v-col cols="4">
        {{ form.password }}
        <v-card>
          <v-card-title class="text-center">Sign In With Email</v-card-title>
          <v-form @submit.prevent="signIn">
            <v-card-text>
              <v-text-field
                v-model="form.email"
                placeholder="Enter Email Address"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                placeholder="Enter Password"
              ></v-text-field>
            </v-card-text>
            <v-btn block type="submit">Submit</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
