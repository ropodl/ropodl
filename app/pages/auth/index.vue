<script lang="ts" setup>
import { required } from "@/utils/rules";
import { useApiFetch } from "~/utils/shared/useApiFetch";
import type { VForm } from 'vuetify/components';

const token = useCookie('token',{
   maxAge: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
   secure: true
})

const form = ref({
   email: "",
   password: "",
});

const loginForm = ref<VForm | null>(null);

const submitForm = async () => {
  if (!loginForm.value) return;
  const { valid } = await loginForm.value.validate();
  if(valid){
    await useApiFetch('auth/login',
    {
      method: "POST",
      body: form.value
    }).then((res:any)=>{
      token.value = res.token;
    }).catch((err)=>{
      return err;
    }).finally(async()=>{
      await navigateTo("/admin/",{
         replace: true
      })
    })
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
