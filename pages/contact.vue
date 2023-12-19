<script setup lang="ts">
import { Icon } from "@iconify/vue";

definePageMeta({
  keepalive: true,
});

useHead({
  title: "Contact Page | Saroj Poudel",
  meta: [
    {
      name: "description",
      content:
        "Graphic Designer and Web Developer from Nepal specializing in VueJs and Express JS",
    },
  ],
});

defineOgImageComponent("Main", {
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
});

let loading = ref(false);
const contactForm = ref();

const form = reactive({
  from_name: "",
  from_email: "",
  message: "",
});

let snackbar = reactive({
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
    });
    if (error.value) return console.log(error.value);
    snackbar["text"] = "Successfully sent, will reply soon.";
    snackbar["show"] = true;
    contactForm.value.reset();
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
          <div class="text-h4 font-weight-medium mb-6">
            Got a project? Let's talk.
          </div>
          <ul class="list-style-none">
            <li
              v-for="(contact, i) in contacts"
              class="d-flex align-center mb-3"
            >
              <v-icon size="large">
                <Icon :icon="contact.icon" />
              </v-icon>
              <div class="pl-3">
                {{ contact.title }}
              </div>
            </li>
            <li v-for="social in socials" class="d-flex align-center mb-3">
              <v-icon size="large">
                <Icon :icon="social.icon" />
              </v-icon>
              <div class="pl-3">
                {{ social.name }}
                <v-btn
                  icon
                  size="xs"
                  variant="text"
                  target="_blank"
                  :href="social.link"
                >
                  <v-icon size="xs">
                    <Icon icon="mdi:open-in-new" />
                  </v-icon>
                </v-btn>
              </div>
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
              density="compact"
              variant="solo-filled"
              v-model="form['from_name']"
              :rules="rules['firstNameRules']"
              bg-color="transparent"
              placeholder="What's your name?"
              :loading="loading"
              :disabled="loading"
            ></v-text-field>
            <v-text-field
              flat
              density="compact"
              variant="solo-filled"
              v-model="form['from_email']"
              :rules="rules['emailRules']"
              bg-color="transparent"
              placeholder="Your fancy email"
              :loading="loading"
              :disabled="loading"
            ></v-text-field>
            <v-textarea
              flat
              density="compact"
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
    <v-snackbar :model-value="snackbar.show" theme="light">
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
