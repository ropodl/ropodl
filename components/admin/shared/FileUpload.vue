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
});

const supabase = useSupabaseClient();
const config = useRuntimeConfig();

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const loading = ref(false);

const selectFeaturedImage = async ({ target }) => {
  loading.value = true;
  const fileName = target.files[0].name.toLowerCase().replace(/\s/g, "-");

  const { data, error } = await supabase.storage
    .from("blogs")
    .upload(
      `featured_image/${year}/${month}/${day}/${fileName}`,
      target.files[0],
      {
        contentType: "image/*",
      }
    );
  if (error) {
    loading.value = true;
    return console.log(error);
  }
  props.form.featured_image = {
    id: data.id,
    url:
      config.public.supabase_url + "/storage/v1/object/public/" + data.fullPath,
  };
  // https://wuhpdygzsumkrgmakgqr.supabase.co/storage/v1/object/public/blogs/featured_image/2023/12/24/motherboard-city.jpg
  console.log(data);
  loading.value = true;
};
</script>
<template>
  <v-card class="mb-3">
    <v-card-title>{{ title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text
      class="d-flex align-center justify-center position-relative pa-0"
    >
      <template v-if="form.featured_image !== null">
        <v-hover v-slot="{ isHovering, props }">
          <v-img cover v-bind="props" :src="form.image" height="200">
            <v-overlay
              contained
              :model-value="isHovering"
              content-class="w-100 h-100 d-flex align-center justify-center"
              scrim="black"
            >
              <v-btn icon color="error" @click="form.image = null">
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
  </v-card>
</template>

<style></style>
