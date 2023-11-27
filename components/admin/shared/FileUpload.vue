<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  // single: {
  //   type: Boolean,
  //   required: true,
  //   default: true,
  // },
  form: {
    type: Object,
    required: true,
  },
  accept: {
    type: String,
    default: "image/*",
  },
});

const dropZoneRef = ref();
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

function onDrop(files) {
  if (props.form.file) {
    props.form.file = "3";
    console.log(props.form.file);
    // return;
  }
  if (props.form.image) {
    props.form.image = "3";
    // return;
  }
}

const { files, open, reset, onChange } = useFileDialog({
  accept: props.accept, // Set to accept only image files
});

const file = shallowRef();
const url = useObjectUrl(file);

onChange((files) => {
  console.log(typeof props.form.file);
  console.log(files[0]);
  console.log(props.form.file);

  if (props.form.file) {
    props.form.file = "3";
    console.log(props.form.file);
    // return;
  }
  if (props.form.image) {
    props.form.image = "3";
    // return;
  }
});
</script>
<template>
  {{ form }}
  <v-card class="mb-3">
    <v-card-title v-text="title"></v-card-title>
    <v-divider></v-divider>
    <v-hover v-slot="{ isHovering, props }">
      <v-card-text
        v-bind="props"
        ref="dropZoneRef"
        class="d-flex align-center justify-center text-center position-relative"
        :class="[isHovering ? 'animate' : '']"
        style="height: 200px"
        @click="open"
      >
        <template v-if="isOverDropZone">
          <v-overlay
            contained
            content-class="d-flex align-center justify-center w-100 h-100"
            :model-value="isOverDropZone"
            scrim="black"
          >
            Please drop the file, now.
          </v-overlay>
        </template>
        <div v-else>
          <div>
            <v-icon size="50">
              <Icon icon="mdi:cloud-upload" />
            </v-icon>
          </div>
          <v-card-text>Drag & Drop a file here or click.</v-card-text>
        </div>
      </v-card-text>
    </v-hover>
  </v-card>
</template>
<style lang="scss"></style>
