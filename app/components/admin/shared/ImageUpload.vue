<script setup lang="ts">
const image = defineModel();
defineProps({
  title: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
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
    title: "Media Library",
    value: 1,
  },
]);

const selectedImages = ref([]);
// test
const example = ref([
  {
    id: "as",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "sd",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "df",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "fg",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "gh",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "hj",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "jk",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "kl",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "qw",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "we",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "er",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
  {
    id: "rt",
    title: "Hi my name is",
    created_at: "2021/1/1/1",
    size: "123kb",
  },
]);
</script>
<template>
  <v-card :title>
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
        <v-dialog scrollable persistent scrim="black" height="95vh">
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
              <v-card-title class="py-0">
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
              <v-tabs-window
                v-model="tab"
                class="fill-height"
                :transition="false"
              >
                <v-tabs-window-item
                  :value="0"
                  class="fill-height"
                  transition="none"
                  reverse-transition="none"
                >
                  <v-card-text class="fill-height">
                    <v-file-upload class="fill-height"></v-file-upload>
                  </v-card-text>
                </v-tabs-window-item>
                <v-tabs-window-item
                  :value="1"
                  transition="none"
                  reverse-transition="none"
                  class="overflow-scroll"
                >
                  <v-card-text v-auto-animate>
                    <v-row v-auto-animate>
                      <v-col
                        cols="12"
                        :md="selectedImages ? 9 : 12"
                        v-auto-animate
                      >
                        <v-item-group
                          v-model="selectedImages"
                          :multiple
                          v-auto-animate
                        >
                          <v-row v-auto-animate>
                            <template v-for="(item, i) in example" :key="i">
                              <v-col cols="12" md="3">
                                <v-item
                                  :value="item"
                                  v-slot="{ isSelected, toggle }"
                                >
                                  <v-card
                                    border
                                    :border-color="
                                      isSelected ? 'primary' : 'warning'
                                    "
                                    @click="toggle"
                                  >
                                    <v-img
                                      cover
                                      height="150"
                                      src="https://wuhpdygzsumkrgmakgqr.supabase.co/storage/v1/object/public/blogs/featured_image/2023/12/24/android_toy.jpg"
                                    >
                                      <template v-if="isSelected">
                                        <v-checkbox
                                          color="primary"
                                          :model-value="isSelected"
                                          density="comfortable"
                                          hide-details
                                        ></v-checkbox>
                                      </template>
                                    </v-img>
                                  </v-card>
                                </v-item>
                              </v-col>
                            </template>
                          </v-row>
                        </v-item-group>
                      </v-col>
                      <template v-if="selectedImages">
                        <v-col cols="12" md="3">
                          {{ selectedImages }}
                        </v-col>
                      </template>
                    </v-row>
                  </v-card-text>
                </v-tabs-window-item>
              </v-tabs-window>
              <template v-if="tab === 1">
                <v-card-actions>
                  <v-pagination
                    density="compact"
                    :length="10"
                    total-visible="5"
                  ></v-pagination>
                  <v-spacer></v-spacer>
                  <v-btn variant="flat" color="primary">hi </v-btn>
                </v-card-actions>
              </template>
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
