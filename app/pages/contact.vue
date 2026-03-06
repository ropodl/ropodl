<script setup lang="ts">
import { ref } from 'vue';
import useApiFetch from '~/utils/shared/useApiFetch';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const loading = ref(false);
const success = ref(false);
const error = ref<string | null>(null);

const rules = {
  name: [(v: string) => !!v || 'Name is required'],
  email: [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
  ],
  subject: [(v: string) => !!v || 'Subject is required'],
  message: [(v: string) => !!v || 'Message is required'],
};

const submitForm = async () => {
  loading.value = true;
  error.value = null;
  success.value = false;

  try {
    const res = await useApiFetch<any>('/contact', {
      method: 'POST',
      body: form.value,
    });

    if (res.success) {
      success.value = true;
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };
    } else {
      error.value = res.message || 'Failed to send message. Please try again.';
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred. Please try again later.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container class="py-16" max-width="800">
    <v-row>
      <v-col cols="12">
        <layouts-default-page-title>
          Get in <span class="text-primary-darken-2">touch</span>.
        </layouts-default-page-title>
        <p class="text-h6 font-weight-light text-medium-emphasis mb-10">
          Have a question or just want to say hi? Drop me a message below and I'll get back to you as soon as possible.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card rounded="xl" border elevation="0" class="pa-6 pa-md-10">
          <v-form @submit.prevent="submitForm" v-if="!success">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.name"
                  label="Your Name"
                  placeholder="John Doe"
                  variant="outlined"
                  rounded="lg"
                  :rules="rules.name"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.email"
                  label="Email Address"
                  placeholder="john@example.com"
                  variant="outlined"
                  rounded="lg"
                  :rules="rules.email"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.subject"
                  label="Subject"
                  placeholder="How can I help you?"
                  variant="outlined"
                  rounded="lg"
                  :rules="rules.subject"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.message"
                  label="Message"
                  placeholder="Type your message here..."
                  variant="outlined"
                  rounded="lg"
                  :rules="rules.message"
                  required
                  rows="5"
                />
              </v-col>
            </v-row>

            <v-alert
              v-if="error"
              type="error"
              variant="tonal"
              closable
              class="mb-6"
              rounded="lg"
            >
              {{ error }}
            </v-alert>

            <div class="d-flex justify-end mt-4">
              <v-btn
                type="submit"
                color="primary"
                size="large"
                rounded="pill"
                min-width="160"
                :loading="loading"
                elevation="0"
              >
                Send Message
                <template #append>
                  <v-icon icon="carbon:send" />
                </template>
              </v-btn>
            </div>
          </v-form>

          <v-scale-transition>
            <div v-if="success" class="text-center py-10">
              <v-icon
                icon="carbon:checkmark-filled"
                color="primary"
                size="80"
                class="mb-6"
              />
              <h3 class="text-h4 font-weight-bold mb-2">Message Sent!</h3>
              <p class="text-h6 font-weight-light text-medium-emphasis mb-8">
                Thank you for reaching out. I'll get back to you shortly.
              </p>
              <v-btn
                variant="outlined"
                rounded="pill"
                to="/"
                color="primary"
              >
                Back to Home
              </v-btn>
            </div>
          </v-scale-transition>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-16 pt-8">
      <v-col cols="12" md="4">
        <div class="d-flex align-center mb-4">
          <v-icon icon="carbon:email" color="primary" class="mr-3" />
          <span class="text-subtitle-1 font-weight-bold">Email</span>
        </div>
        <div class="text-body-1 text-medium-emphasis">hello@ropodl.com</div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex align-center mb-4">
          <v-icon icon="carbon:location" color="primary" class="mr-3" />
          <span class="text-subtitle-1 font-weight-bold">Office</span>
        </div>
        <div class="text-body-1 text-medium-emphasis">Kathmandu, Nepal</div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex align-center mb-4">
          <v-icon icon="carbon:share-knowledge" color="primary" class="mr-3" />
          <span class="text-subtitle-1 font-weight-bold">Social</span>
        </div>
        <div class="d-flex gap-4">
          <v-btn icon="carbon:logo-github" variant="text" size="small" />
          <v-btn icon="carbon:logo-linkedin" variant="text" size="small" />
          <v-btn icon="carbon:logo-twitter" variant="text" size="small" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>
