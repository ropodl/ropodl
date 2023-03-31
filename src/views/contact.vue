<script setup>
import { defineAsyncComponent, reactive, ref } from "vue";
import { mdiSend } from "@mdi/js";
import emailjs from "@emailjs/browser";

const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);

const contactForm = ref(null);

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
      return "Full name must be at least 3 characters.";
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
  const { valid } = await contactForm.value.validate();
  if (valid) {
    emailjs
      .send(
        "service_orveamh",
        "template_xc2xnr6",
        templateParams,
        "-xkHJckmH36raNsEo"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  } else console.log("failed");
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card border flat rounded="xl" class="mb-6">
          <iframe
            class="w-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.0028455004935!2d85.27378681447426!3d27.68630693280069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb187427374a8b%3A0xe5bfb9da481e995f!2sMaitrinagar%2C%20Kirtipur%2044600!5e0!3m2!1sen!2snp!4v1679976068422!5m2!1sen!2snp"
            height="350"
            style="border: 0; filter: grayscale(1) invert(1)"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </v-card>
        <v-card border>
          <v-card-text>
            WIP, for now you can contact me at sarox14@gmail.com
          </v-card-text>
        </v-card>
        <v-card flat>
          <v-card-title class="mb-6">Contact Form </v-card-title>
          <v-form ref="contactForm" @submit.prevent="submitForm">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="templateParams['from_name']"
                    color="primary"
                    variant="outlined"
                    placeholder="Full Name"
                    :rules="rules['firstNameRules']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="templateParams['from_email']"
                    color="primary"
                    variant="outlined"
                    placeholder="Email Address"
                    :rules="rules['emailRules']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" class="py-0">
                  <v-textarea
                    v-model="templateParams['message']"
                    color="primary"
                    variant="outlined"
                    placeholder="Message"
                    :rules="rules['messageRules']"
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-row justify="end">
                    <v-col cols="12" md="3" class="pt-0">
                      <v-btn
                        flat
                        block
                        height="50"
                        class="px-10 text-capitalize"
                        type="submit"
                      >
                        Send Message
                        <v-icon end :icon="mdiSend"></v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
