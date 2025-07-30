<script setup lang="ts">
import { socials } from "@/utils/socials";
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
  ogUrl: "https://ropodl.com",
  twitterTitle: "Saroj Poudel",
  twitterDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  twitterCard: "summary",
});

const loading = ref(false);
const contact = ref();

const form = ref({
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
  name: [
    (value: string) => {
      if (value) return true;
      return "Name is requred";
    },
    (value: String) => {
      if (value?.length >= 3) return true;
      return "Full name must be at least 3 characters.";
    },
  ],
  email: [
    (value: string) => {
      if (value) return true;
      return "Email is requred";
    },
    (value: String) => {
      if (value?.length >= 3) return true;
      return "Email Address must be at least 3 characters.";
    },
    (value: string) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ) || "Email Address must be in a valid format",
  ],
  message: [
    (value: string) => {
      if (value) return true;
      return "Message is requred";
    },
    (value: string) => {
      if (value?.length >= 3) return true;
      return "Message must be at least 3 characters.";
    },
  ],
};

const { create } = useStrapi();
const { setSnackbar } = useSnackbarStore();

const submit = async () => {
  loading.value = true;
  const { valid } = await contact.value.validate();
  if (valid) {
    await create("contact-requests", form.value)
      .then(() => {
        contact.value.reset();
        setSnackbar("Message sent!");
      })
      .catch(() => {
        setSnackbar("Some kind of error occured. Try again later?");
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
</script>
<template>
  <NuxtLayout name="page-title">
    <template #title>Contact</template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-h5 font-weight-medium mb-3">
            Got a project? Let's talk.
          </div>
          <p class="mb-6">
            I am always open to discussing product design work or partnership
            opportunities.
          </p>
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
                  <Icon :name="social.icon" />
                  <!-- <v-icon>
                  </v-icon> -->
                </v-btn>
              </li>
            </template>
          </ul>
        </v-col>
        <v-col cols="12" md="6">
          <!-- <v-card> -->
          <v-card-text class="px-6">
            <v-form ref="contact" @submit.prevent="submit">
              <lazy-admin-shared-field-label>
                Your awesome name?
              </lazy-admin-shared-field-label>
              <v-text-field
                flat
                :rules="rules.name"
                v-model="form.name"
                bg-color="transparent"
                placeholder="e.g. John Doe"
                :loading
                :disabled="loading"
              ></v-text-field>
              <lazy-admin-shared-field-label>
                Tell me your fancy email address?
              </lazy-admin-shared-field-label>
              <v-text-field
                flat
                :rules="rules.email"
                v-model="form.email"
                bg-color="transparent"
                placeholder="e.g. john.doe@example.com"
                :loading
                :disabled="loading"
              ></v-text-field>
              <lazy-admin-shared-field-label>
                So, what are services are you interested in?
              </lazy-admin-shared-field-label>
              <v-textarea
                flat
                :rules="rules.message"
                v-model="form.message"
                bg-color="transparent"
                :loading
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
                      ><Icon name="mdi:arrow-right"
                    /></v-icon>
                  </v-btn>
                </v-hover>
              </v-row>
            </v-form>
          </v-card-text>
          <!-- </v-card> -->
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
            <Icon name="mdi:close" />
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
