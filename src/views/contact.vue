<script setup>
import { defineAsyncComponent } from "vue";

import { useTitle } from "@vueuse/core";
useTitle("Contact Me | Saroj Poudel");

const Form = defineAsyncComponent(() => import("@/components/shared/Form.vue"));
</script>
<template>
  <Form />
</template>
