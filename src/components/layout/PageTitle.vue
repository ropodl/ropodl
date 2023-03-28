<script setup>
import { defineProps } from "vue";

defineProps({ title: { type: String, default: "No Title" } });
</script>
<template>
  <div class="text-h4 font-weight-bold mb-3">{{ title }}</div>
  <div
    class="rounded-xl mb-6"
    style="width: 50px; height: 6px; background-color: rgb(var(--v-theme-primary))"
  ></div>
</template>
