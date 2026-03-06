<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSeoMeta } from '#imports';
import socials from '~/utils/social';
import useApiFetch from '~/utils/shared/useApiFetch';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const form = ref<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const loading = ref(false);
const success = ref(false);
const error = ref<string | null>(null);

const submit = async () => {
  loading.value = true;
  error.value = null;
  try {
    await useApiFetch('/contact', {
      method: 'POST',
      body: form.value,
    });
    success.value = true;
    form.value = { name: '', email: '', subject: '', message: '' };
  } catch (err: any) {
    error.value = err.message || 'Something went wrong. Please try again later.';
  } finally {
    loading.value = false;
  }
};

useSeoMeta({
  title: 'Contact Saroj Poudel | Get in Touch',
  description: 'Have a project in mind or just want to say hi? I would love to hear from you.',
});
</script>

<template>
  <v-container class="py-16 px-md-16">
    <v-row class="mb-16">
      <v-col cols="12" lg="6">
         <div class="text-overline text-primary mb-4 glow-text">CONTACT ME</div>
         <h1 class="text-h2 text-md-h1 font-weight-black mb-8">LET'S START <br /> A <span class="text-gradient">NEW STORY</span></h1>
         <p class="text-h5 text-medium-emphasis font-weight-light mb-12">
            Whether you have a groundbreaking idea or a complex problem to solve, I'm here to help bring your vision to life.
         </p>
         
         <div class="d-flex flex-column gap-6">
            <div class="d-flex align-center">
               <v-avatar color="primary" variant="tonal" class="mr-4" rounded="lg">
                  <v-icon icon="carbon:email" />
               </v-avatar>
               <div>
                  <div class="text-caption opacity-50">Email</div>
                  <div class="text-h6">hello@ropodl.com</div>
               </div>
            </div>
            <div class="d-flex align-center">
               <v-avatar color="primary" variant="tonal" class="mr-4" rounded="lg">
                  <v-icon icon="carbon:location" />
               </v-avatar>
               <div>
                  <div class="text-caption opacity-50">Location</div>
                  <div class="text-h6">Kathmandu, Nepal</div>
               </div>
            </div>
         </div>
      </v-col>

      <v-col cols="12" lg="6">
         <v-card class="glass pa-8 pa-md-12 rounded-xl" elevation="0">
            <v-alert v-if="success" type="success" variant="tonal" class="mb-8" closable @click:close="success = false">
               Message sent successfully! I'll get back to you soon.
            </v-alert>
            <v-alert v-if="error" type="error" variant="tonal" class="mb-8" closable @click:close="error = null">
               {{ error }}
            </v-alert>

            <v-form @submit.prevent="submit">
               <v-row>
                  <v-col cols="12" sm="6">
                     <v-text-field v-model="form.name" label="Name" variant="outlined" rounded="lg" color="primary" hide-details class="mb-6" />
                  </v-col>
                  <v-col cols="12" sm="6">
                     <v-text-field v-model="form.email" label="Email" type="email" variant="outlined" rounded="lg" color="primary" hide-details class="mb-6" />
                  </v-col>
                  <v-col cols="12">
                     <v-text-field v-model="form.subject" label="Subject" variant="outlined" rounded="lg" color="primary" hide-details class="mb-6" />
                  </v-col>
                  <v-col cols="12">
                     <v-textarea v-model="form.message" label="How can I help you?" variant="outlined" rounded="lg" color="primary" hide-details rows="5" class="mb-8" />
                  </v-col>
                  <v-col cols="12">
                     <v-btn block color="primary" size="x-large" rounded="pill" type="submit" :loading="loading" class="shadow-primary">
                        Send Message
                        <v-icon icon="carbon:send" class="ml-2" />
                     </v-btn>
                  </v-col>
               </v-row>
            </v-form>
         </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.shadow-primary {
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.2) !important;
}
</style>
