<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  bucket: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const supabase = useSupabaseClient();
const config = useRuntimeConfig();

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const loading = ref(false);
const errors = ref("");

const selectFeaturedImage = async ({ target }) => {
  loading.value = true;
  const fileName = target.files[0].name.toLowerCase().replace(/\s/g, "-");
  try {
    const { data, error } = await supabase.storage
      .from(props.bucket)
      .upload(
        `${props.type}/${year}/${month}/${day}/${fileName}`,
        target.files[0],
        {
          contentType: "image/*",
        }
      );
    if (error.value) {
      loading.value = false;
      errors.value = error.value;
      return console.log(error);
    }
    const { id, fullPath } = data;
    props.form.featured_image = {
      id,
      url: config.public.supabase_url + "/storage/v1/object/public/" + fullPath,
    };
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = true;
  }
};
</script>
<template>
  <v-card class="mb-3">
    <v-card-title>{{ title }}</v-card-title>
    <v-divider></v-divider>
    {{ props }}
    <v-card-text
      class="d-flex align-center justify-center position-relative pa-0"
    >
      <template v-if="form.featured_image.url != null">
        <v-hover v-slot="{ isHovering, props }">
          <v-img
            cover
            v-bind="props"
            :src="form.featured_image?.url"
            height="200"
          >
            <v-overlay
              contained
              :model-value="isHovering"
              content-class="w-100 h-100 d-flex align-center justify-center"
              scrim="black"
            >
              <v-btn icon color="error" @click="form.featured_image.url = null">
                <Icon icon="mdi:close" />
              </v-btn>
            </v-overlay>
          </v-img>
        </v-hover>
      </template>
      <template v-else>
        <input
          @change="selectFeaturedImage"
          type="file"
          name="image"
          class="py-4"
        />
      </template>
    </v-card-text>
    <!-- <template v-if="error"> -->
    <v-divider></v-divider>
    <v-card-text>{{ errors.message }}</v-card-text>
    <!-- </template> -->
  </v-card>
</template>
