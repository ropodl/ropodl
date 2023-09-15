<script setup>
import emailjs from "@emailjs/browser";
import { Icon } from "@iconify/vue";

let loading = ref(false);
const contactForm = ref(null);

let snackbar = reactive({
  show: false,
  text: "",
});

const rules = {
  firstNameRules: [
    (value) => {
      if (value?.length > 3) return true;

      return "Full name must be at least 3 characters.";
    },
  ],
  emailRules: [
    (value) => {
      if (value?.length > 3) return true;
      return "Email Address must be at least 3 characters.";
    },
    (v) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || "Email Address must be in a valid format",
  ],
  messageRules: [
    (value) => {
      if (value?.length > 3) return true;
      return "Message must be at least 3 characters.";
    },
  ],
};

const templateParams = reactive({
  from_name: "",
  from_email: "",
  to_name: "Saroj Poudel",
  message: "",
});

const submitForm = async () => {
  loading.value = true;
  const { valid } = await contactForm.value.validate();
  if (valid) {
    await emailjs
      .send(
        "service_orveamh",
        "template_xc2xnr6",
        templateParams,
        "-xkHJckmH36raNsEo"
      )
      .then((response) => {
        console.log(response);
        if (response.status == "200") {
          snackbar["text"] = "Successfully sent, will reply soon.";
          snackbar["show"] = true;
          contactForm.value.reset();
        }
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  } else console.log("failed");
  loading.value = false;
};
</script>
<template>
  <v-container class="pb-16" style="padding-top: 100px">
    <v-row justify="space-between">
      <v-col cols="12" md="5">
        <div class="text-h4 font-weight-medium mb-3">Got a project?</div>
        <div class="text-h4 font-weight-medium mb-3">Let's talk.</div>
        <div class="mb-3">
          I'm here to help you with your project. Let me know what you need.
        </div>
        <v-hover v-slot="{ isHovering, props }">
          <v-btn
            size="large"
            variant="text"
            color="primary"
            class="text-capitalize"
            v-bind="props"
          >
            <span class="text-lowercase">sarox14@gmail.com</span>
            <v-icon
              size="x-small"
              :class="isHovering ? 'ml-4' : 'ml-2'"
              style="transition: all 100ms linear"
            >
          <Icon icon="mdi:arrow-right"/>
          </v-icon>
          </v-btn>
        </v-hover>
      </v-col>
      <v-col cols="12" md="5">
        <div class="text-h4 font-weight-bold">Estimate your project?</div>
        <div class="text-h4 font-weight-bold mb-6">Let me know here.</div>
        <v-form fast-fail ref="contactForm" @submit.prevent="submitForm">
          <v-text-field
            flat
            variant="solo-filled"
            v-model="templateParams['from_name']"
            :rules="rules['firstNameRules']"
            bg-color="transparent"
            placeholder="What's your name?"
            :loading="loading"
            :disabled="loading"
          ></v-text-field>
          <v-text-field
            flat
            variant="solo-filled"
            v-model="templateParams['from_email']"
            :rules="rules['emailRules']"
            bg-color="transparent"
            placeholder="Your fancy email"
            :loading="loading"
            :disabled="loading"
          ></v-text-field>
          <v-textarea
            flat
            variant="solo-filled"
            v-model="templateParams['message']"
            :rules="rules['messageRules']"
            bg-color="transparent"
            :loading="loading"
            :disabled="loading"
            rows="1"
            placeholder="Tell me about your project"
          ></v-textarea>
          <v-hover v-slot="{ isHovering, props }">
            <v-btn
              type="submit"
              size="large"
              variant="text"
              color="primary"
              class="text-capitalize"
              v-bind="props"
              :loading="loading"
              :disabled="loading"
            >
              <span>Send Message</span>
              <v-icon
                size="x-small"
                :class="isHovering ? 'ml-4' : 'ml-2'"
                style="transition: all 100ms linear"
              ><Icon icon="mdi:arrow-right"/></v-icon>
            </v-btn>
          </v-hover>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="snackbar['show']" theme="light">
    {{ snackbar["text"] }}
    <template v-slot:actions>
      <v-btn
        class="text-capitalize px-4"
        color="teal"
        variant="tonal"
        @click="snackbar['show'] = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
