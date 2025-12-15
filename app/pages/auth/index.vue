<script lang="ts" setup>
import { required } from "@/utils/rules";
import type { VForm } from 'vuetify/components';
import { useAuth } from "~/composables/admin/auth/useAuth";

const { login, token } = useAuth();

if (token.value) {
   navigateTo("/admin/", {
      replace: true
   });
}

const form = ref({
   email: "",
   password: "",
});

const loginForm = ref<VForm | null>(null);

const submitForm = async () => {
  if (!loginForm.value) return;
  const { valid } = await loginForm.value.validate();
  if(valid){
      await login(form.value);
  }
};
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
            <v-form ref="loginForm" fast-fail @submit.prevent="submitForm">
               <v-text-field
                  v-model="form.email"
                  density="comfortable"
                  placeholder="Email Address"
                  :rules="[required(form.email, 'Email Address')]"
               />
               <v-text-field
                  v-model="form.password"
                  density="comfortable"
                  placeholder="Password"
                  :rules="[required(form.password, 'Password')]"
               />
               <div class="d-flex justify-end">
                  <v-btn color="primary" type="submit">Submit</v-btn>
               </div>
            </v-form>
         </v-col>
      </v-row>
   </v-container>
</template>
