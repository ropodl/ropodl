<script setup lang="ts">
const image = defineModel();
defineProps({
  title: {
    type: String,
    default: "",
  },
  form: {
    type: Object,
    required: true,
  },
});

const tab = ref(0);
const tabs = ref([
  {
    title: "Upload",
    value: 0,
  },
  {
    title: "All Media",
    value: 1,
  },
]);
</script>
<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <template v-if="form.featured_image && form.featured_image.url">
        <v-img
          :src="form.featured_image.url"
          class="mb-3"
          max-height="200"
          contain
        ></v-img>
      </template>
      <template v-else>
        <v-dialog scrollable scrim="black" height="900">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              text="Open Dialog"
              variant="flat"
            ></v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-title class="d-flex align-center">
                {{ title }}
                <v-spacer></v-spacer>
                <v-btn
                  size="small"
                  icon="mdi-close"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-title>
              <v-card-title class="pt-0">
                <v-card class="pa-1" style="max-width: max-content">
                  <v-tabs
                    v-model="tab"
                    density="compact"
                    hide-slider
                    show-arrows
                    rounded="lg"
                    :transition="false"
                  >
                    <template v-for="{ title, value } in tabs">
                      <v-tab
                        color="primary"
                        rounded="lg"
                        class="pa-2 px-10"
                        :value
                        :variant="tab === value ? 'tonal' : 'text'"
                      >
                        {{ title }}
                      </v-tab>
                    </template>
                  </v-tabs>
                </v-card>
              </v-card-title>
              <v-card-text class="fill-height">
                <v-tabs-window
                  v-model="tab"
                  class="fill-height"
                  :transition="false"
                >
                  <v-tabs-window-item
                    :value="0"
                    class="fill-height"
                    transition="none"
                  >
                    <v-file-upload class="fill-height"></v-file-upload>
                  </v-tabs-window-item>
                  <v-tabs-window-item :value="1" transition="none">
                    hi again
                  </v-tabs-window-item>
                </v-tabs-window>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </template>
    </v-card-text>
  </v-card>
</template>
<!-- <script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  // form: {
  //   type: Object,
  //   required: true,
  // },
  // bucket: {
  //   type: String,
  //   required: true,
  // },
});

const supabase = useSupabaseClient();
const config = useRuntimeConfig();

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const loading = ref(false);
const errors = ref<any>();

// const selectFeaturedImage = async ({ target }) => {
//   loading.value = true;
//   const fileName = target.files[0].name.toLowerCase().replace(/\s/g, "-");
//   const { data, error } = await supabase.storage
//     .from(props.bucket)
//     .upload(`media/${year}/${month}/${day}/${fileName}`, target.files[0], {
//       contentType: "image/*",
//     });
//   if (error) {
//     loading.value = false;
//     errors.value = error;
//     return console.log(error);
//   }
//   const { id, fullPath } = data;
//   props.form[props.type] = {
//     id,
//     url: config.public.supabase_url + "/storage/v1/object/public/" + fullPath,
//   };
//   loading.value = false;
// };
</script>
<template>
  <v-card border flat class="mb-3" :loading :disabled="loading">
    <v-card-title>{{ title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text
      class="d-flex align-center justify-center position-relative pa-0"
    >
      <template v-if="form[type].url != null">
        <v-hover v-slot="{ isHovering, props }">
          <v-img cover v-bind="props" :src="form[type]?.url" height="200">
            <v-overlay
              contained
              :model-value="isHovering || false"
              content-class="w-100 h-100 d-flex align-center justify-center"
              scrim="black"
            >
              <v-btn icon="mdi-close" color="error" />
            </v-overlay>
          </v-img>
        </v-hover>
      </template>
      <template v-else>
        <input type="file" name="image" class="py-4" />
      </template>
    </v-card-text>
    <template v-if="errors">
      <v-divider></v-divider>
      <v-card-text>{{ errors.message }}</v-card-text>
    </template>
  </v-card>
</template> -->
