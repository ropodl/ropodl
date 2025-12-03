<script lang="ts" setup>
import { required, maxLength, minLength } from "@/utils/rules";
import { VForm } from "vuetify/components";
import useApiFetch from "~/utils/shared/useApiFetch";

const showPass = ref(false)
const showConfirmPass = ref(false)

const form = ref({
   fullname: "",
   username: "",
   email: "",
   password: "",
});

const confirmPassword = ref("");

const registerForm = ref<InstanceType<typeof VForm> | null>(null);

const submitForm = async () => {
   if (!registerForm.value) return;
   const { valid } = await registerForm.value.validate();
   console.log(valid);
   if(valid){
    await useApiFetch("auth/register",{
      method: "POST",
      body: form.value
    }).then((res)=>{
      console.log(res)
    })
   }
};

useHead({
   title: "Register",
});
</script>
<template>
   <v-container max-width="1200">
      <v-row>
         <v-col cols="12">
            <layouts-default-page-title> Register </layouts-default-page-title>
         </v-col>
      </v-row>
      <v-row>
         <v-col cols="12" md="4">
            <v-form ref="registerForm" @submit.prevent="submitForm">
               <v-text-field
                  v-model="form.fullname"
                  :rules="[
                     required(form.fullname, 'Full Name'),
                     maxLength(form.fullname, 10, 'Full Name'),
                     minLength(form.fullname, 3, 'Full Name'),
                  ]"
                  placeholder="Full Name"
               />
               <v-text-field
                  v-model="form.username"
                  :rules="[required(form.username, 'Username')]"
                  placeholder="Username"
               />
               <v-text-field
                  v-model="form.email"
                  :rules="[required(form.email, 'Email Address')]"
                  placeholder="Email Address"
               />
               <v-text-field
                  v-model="form.password"
                  :rules="[required(form.password, 'Password')]"
                  placeholder="Password"
                  :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPass ? 'text' : 'password'"
                  @click:append-inner="showPass = !showPass"
               />
               <v-text-field
                  v-model="confirmPassword"
                  :rules="[required(confirmPassword, 'Confirm Password')]"
                  placeholder="Confirm Password"
                  :append-inner-icon="showConfirmPass ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showConfirmPass ? 'text' : 'password'"
                  @click:append-inner="showConfirmPass = !showConfirmPass"
               />
               <div class="d-flex justify-end">
                  <v-btn color="primary" type="submit">Submit</v-btn>
               </div>
            </v-form>
         </v-col>
      </v-row>
   </v-container>
</template>

<style></style>
