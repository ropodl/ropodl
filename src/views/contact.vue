<script setup>
import emailjs from "@emailjs/browser";
import { defineAsyncComponent, reactive, ref } from "vue";

import { useTitle } from "@vueuse/core";
useTitle("Contact Me | Saroj Poudel");

const Form = defineAsyncComponent(() => import("@/components/shared/Form.vue"));

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
    emailjs
      .send(
        "service_orveamh",
        "template_xc2xnr6",
        templateParams,
        "-xkHJckmH36raNsEo"
      )
      .then((response) => {
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
  <Form />
</template>
