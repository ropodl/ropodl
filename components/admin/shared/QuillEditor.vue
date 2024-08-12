<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const content = defineModel("content");
</script>
<template>
  <QuillEditor
    theme="snow"
    toolbar="full"
    v-model:content="content"
    style="min-height: 500px"
  ></QuillEditor>
</template>

<style lang="scss">
.ql-toolbar.ql-snow {
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.ql-container.ql-snow {
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
