<script setup lang="ts">
const ten = defineModel({
  required: true,
});
</script>
<template>
  <div>
    <input type="text" v-model="ten" />
    {{ ten }}
  </div>
</template>

<style></style>
