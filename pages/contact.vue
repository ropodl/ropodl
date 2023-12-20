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

defineOgImageComponent("Main", {
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
});

let loading = ref(false);
const contactForm = ref();

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const snackbar = <any>reactive({
  show: false,
  text: "",
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

const contacts = [
  {
    icon: "mdi:email",
    title: "sarox14@gmail.com",
  },
];

const submitForm = async (): Promise<void> => {
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
      return console.log(error.value);
    }
    form.name = "";
    form.email = "";
    form.message = "";
    nextTick(async () => {
      snackbar["text"] = data.value?.message;
      snackbar["show"] = true;
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
      <v-row justify="space-between">
        <v-col cols="12" md="5">
          <div class="text-h5 font-weight-medium mb-6">
            Got a project? Let's talk.
          </div>
          <ul class="list-style-none d-flex">
            <!-- <li
              v-for="(contact, i) in contacts"
              class="d-flex align-center mb-3"
            >
              <v-icon size="large">
                <Icon :icon="contact.icon" />
              </v-icon>
              <div class="pl-3">
                {{ contact.title }}
              </div>
            </li> -->
            <li v-for="social in socials">
              <v-btn
                icon
                rounded="lg"
                color="primary"
                variant="tonal"
                class="mr-3"
              >
                <v-icon size="large">
                  <Icon :icon="social.icon" />
                </v-icon>
              </v-btn>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" md="5">
          <div class="text-h4 font-weight-bold">Estimate your project?</div>
          <div class="text-h4 font-weight-bold mb-6">Let me know here.</div>
          <v-form
            fast-fail
            lazy-validation
            ref="contactForm"
            @submit.prevent="submitForm"
          >
            <v-text-field
              flat
              variant="solo-filled"
              v-model="form['name']"
              :rules="rules['firstNameRules']"
              bg-color="transparent"
              placeholder="What's your name?"
              :loading="loading"
              :disabled="loading"
            ></v-text-field>
            <v-text-field
              flat
              variant="solo-filled"
              v-model="form['email']"
              :rules="rules['emailRules']"
              bg-color="transparent"
              placeholder="Your fancy email"
              :loading="loading"
              :disabled="loading"
            ></v-text-field>
            <v-textarea
              flat
              variant="solo-filled"
              v-model="form['message']"
              :rules="rules['messageRules']"
              bg-color="transparent"
              :loading="loading"
              :disabled="loading"
              rows="1"
              placeholder="Tell me about your project"
            ></v-textarea>
            <v-row>
              <v-col cols="6">
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn
                    block
                    type="submit"
                    height="50"
                    rounded="lg"
                    variant="tonal"
                    color="primary"
                    class="text-capitalize px-10"
                    v-bind="props"
                    :loading="loading"
                    :disabled="loading"
                  >
                    Send Message
                    <v-icon
                      size="x-small"
                      :class="isHovering ? 'ml-4' : 'ml-2'"
                      style="transition: all 100ms linear"
                      ><Icon icon="mdi:arrow-right"
                    /></v-icon>
                  </v-btn>
                </v-hover>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      dense
      elevation="0"
      rounded="lg"
      :model-value="snackbar.show"
      theme="light"
      color="bg-surface"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          class="text-capitalize px-4"
          color="teal"
          variant="tonal"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </NuxtLayout>
</template>
