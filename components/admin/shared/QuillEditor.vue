<script setup>
const content = defineModel("content");

defineProps({
  label: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <ClientOnly fallback="Loading editor...">
    <lazy-common-shared-field-label>{{ label }}</lazy-common-shared-field-label>
    <v-card border flat color="transparent" class="mb-4">
      <QuillEditor
        v-model:content="content"
        content-type="html"
        theme="snow"
        toolbar="full"
        style="min-height: 500px"
      />
    </v-card>
  </ClientOnly>
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

// .ql-snow.ql-toolbar {
//   button {
//     &:hover {
//       background-color: #4b5563;
//     }
//     svg {
//       path.ql-stroke {
//         stroke: white !important;
//       }
//       line.ql-stroke {
//         stroke: white !important;
//       }
//     }
//   }
// }
</style>
