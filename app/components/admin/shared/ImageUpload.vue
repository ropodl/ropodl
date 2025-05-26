<script lang="ts" setup>
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
    default: "featured_image",
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
  const { data, error } = await supabase.storage
    .from(props.bucket)
    .upload(
      `${props.type}/${year}/${month}/${day}/${fileName}`,
      target.files[0],
      {
        contentType: "image/*",
      }
    );
  if (error) {
    loading.value = false;
    errors.value = error;
    return console.log(error);
  }
  const { id, fullPath } = data;
  props.form[props.type] = {
    id,
    url: config.public.supabase_url + "/storage/v1/object/public/" + fullPath,
  };
  loading.value = false;
};
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
              :model-value="isHovering"
              content-class="w-100 h-100 d-flex align-center justify-center"
              scrim="black"
            >
              <v-btn
                icon="mdi-close"
                color="error"
                @click="form.featured_image.url = null"
              />
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
    <template v-if="errors">
      <v-divider></v-divider>
      <v-card-text>{{ errors.message }}</v-card-text>
    </template>
  </v-card>
</template>
