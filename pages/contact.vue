<script setup lang="ts">
import { Icon } from "@iconify/vue";

definePageMeta({
  keepalive: true,
});

useSeoMeta({
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogTitle: "Saroj Poudel",
  ogDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogUrl: "https://ropodl.vercel.app",
  twitterTitle: "Saroj Poudel",
  twitterDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  twitterCard: "summary",
});

const loading = ref(false);
const contactForm = ref();

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const snackbar = reactive({
  show: false,
  text: "",
  color: "",
});

const rules = {
  firstNameRules: [
    (value: String) => {
      if (value?.length > 3) return true;

      return "Full name must be at least 3 characters.";
    },
  ],
  emailRules: [
    (value: String) => {
      if (value?.length > 3) return true;
      return "Email Address must be at least 3 characters.";
    },
    (value: string) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ) || "Email Address must be in a valid format",
  ],
  messageRules: [
    (value: String) => {
      if (value?.length > 3) return true;
      return "Message must be at least 3 characters.";
    },
  ],
};

const submitForm = async () => {
  loading.value = true;
  const { valid } = await contactForm.value.validate();
  if (valid) {
    const { data, error } = useFetch("/api/frontend/contact", {
      method: "POST",
      body: form,
      watch: false,
    });
    if (error.value) {
      loading.value = false;
      snackbar.text = "Error Occurred";
      snackbar.color = "error";
      snackbar.show = true;
      return console.log(error.value);
    }
    form.name = "";
    form.email = "";
    form.message = "";

    nextTick(async () => {
      snackbar.text = "Message Sent";
      snackbar.color = "success";
      snackbar.show = true;
      await contactForm.value.resetValidation();
      loading.value = false;
    });
  } else console.log("failed");
  loading.value = false;
};
</script>
<template>
  <NuxtLayout name="page-title">
    <template #title>Contact</template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div class="d-flex">
            <div class="text-h5 font-weight-medium mb-6">
              Got a project? Let's talk.
            </div>
            <v-spacer></v-spacer>
            <ul class="list-style-none d-flex mb-3">
              <template v-for="social in socials">
                <li>
                  <v-btn
                    border
                    icon
                    rounded="lg"
                    color="primary"
                    variant="text"
                    class="mr-3"
                  >
                    <v-icon>
                      <Icon :icon="social.icon" />
                    </v-icon>
                  </v-btn>
                </li>
              </template>
            </ul>
          </div>
          <v-form
            fast-fail
            lazy-validation
            ref="contactForm"
            @submit.prevent="submitForm"
          >
            <lazy-admin-shared-field-label>
              Your awesome name?
            </lazy-admin-shared-field-label>
            <v-text-field
              flat
              :rules="rules['firstNameRules']"
              v-model="form['name']"
              bg-color="transparent"
              placeholder="e.g. John Doe"
              :loading="loading"
              :disabled="loading"
            ></v-text-field>
            <lazy-admin-shared-field-label>
              Tell me your fancy email address?
            </lazy-admin-shared-field-label>
            <v-text-field
              flat
              :rules="rules['emailRules']"
              v-model="form['email']"
              bg-color="transparent"
              placeholder="e.g. john.doe@example.com"
              :loading="loading"
              :disabled="loading"
            ></v-text-field>
            <lazy-admin-shared-field-label>
              So, what are services are you interested in?
            </lazy-admin-shared-field-label>
            <v-textarea
              flat
              :rules="rules['messageRules']"
              v-model="form['message']"
              bg-color="transparent"
              :loading="loading"
              :disabled="loading"
              rows="2"
              auto-grow
              placeholder="e.g. Lorem ipsum dolor :)"
            ></v-textarea>
            <v-row justify="end">
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  v-bind="props"
                  type="submit"
                  rounded="lg"
                  color="primary"
                  variant="flat"
                  class="px-10"
                  :loading="loading"
                  :disabled="loading"
                >
                  Send Message
                  <v-icon
                    :class="isHovering ? 'ml-4' : 'ml-2'"
                    style="transition: all 100ms linear"
                    ><Icon icon="mdi:arrow-right"
                  /></v-icon>
                </v-btn>
              </v-hover>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      dense
      rounded="pill"
      theme="light"
      v-model="snackbar.show"
      :color="snackbar.color"
      class="global-snackbar"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          icon
          variant="tonal"
          theme="dark"
          color="white"
          @click="snackbar.show = false"
        >
          <v-icon>
            <Icon icon="mdi:close" />
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </NuxtLayout>
</template>
<style>
.global-snackbar .v-snackbar__actions {
  margin: 0 !important;
}
</style>
