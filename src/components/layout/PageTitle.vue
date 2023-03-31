<script setup>
import { defineProps } from "vue";

defineProps({ title: { type: String, default: "No Title" } });
</script>
<template>
  <div>
    <div class="text-h4 text-capitalize font-weight-bold mb-3">{{ title }}</div>
    <div
      class="rounded-xl"
      style="
        width: 50px;
        height: 6px;
        background-color: rgb(var(--v-theme-primary));
      "
    ></div>
  </div>
</template>
