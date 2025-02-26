<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const content = defineModel("content");
</script>
<template>
  <QuillEditor
    theme="snow"
    toolbar="full"
    content-type="html"
    v-model:content="content"
    style="min-height: 500px"
  ></QuillEditor>
</template>

<style lang="scss">
.ql-toolbar.ql-snow {
  border: 0 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
}
.ql-editor {
  height: 500px !important;
}
.ql-container.ql-snow {
  border: 0 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
}
.ql-snow-dark-border {
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
}
.ql-snow-light-border {
  border: 1px solid rgba(0, 0, 0, 0.3) !important;
}
</style>
