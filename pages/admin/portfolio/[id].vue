<script setup>
import Editor from "@tinymce/tinymce-vue";
import { tinymceConfig } from "~/utils/tinymce";

const config = useRuntimeConfig();
const {
  params: { id },
} = useRoute();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New Blog",
});

const form = reactive({
  title: "",
  content: "",
  featured_image: {
    id: "",
    url: null,
  },
  main_image: {
    id: "",
    url: null,
  },
  status: false,
});

const { error } = await useFetch("/api/portfolio/" + id, {
  onResponse({ response }) {
    console.log("on Response");
    console.log(response);
    const { title, content, featured_image, main_image, status } =
      response._data;
    console.log(featured_image.url);
    form.title = title;
    form.content = content;
    form.featured_image = featured_image;
    form.main_image = main_image;
    form.status = status;
  },
  onResponseError({ response }) {
    console.log(response._error);
  },
});

const updateBlog = async () => {
  const {
    data,
    error,
    pending: loading,
  } = await useFetch("/api/blog/" + id, {
    method: "PATCH",
    body: form,
  });
  if (error.value) {
    loading.value = true;
    return console.log(error.value);
  }
};
</script>
<template>
  {{ form }}
  <v-container>
    <v-form @submit.prevent="updateBlog">
      <v-row>
        <v-col cols="12">
          <div class="text-h4 font-weight-bold">Edit Portfolio</div>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            label="Portfolio Title"
            v-model="form.title"
          ></v-text-field>
          <v-card flat rounded="0" class="ext-editor mb-10">
            <client-only placeholder="Loading TinyMCE Cloud">
              <Editor
                v-model="form.content"
                placeholder="Portfolio Content"
                :api-key="config.public.tinymce_key"
                :init="tinymceConfig"
              />
            </client-only>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form />
          <LazyAdminSharedImageUpload
            title="Upload Featured Image"
            :form
            bucket="portfolios"
            type="featured_image"
          />
          <LazyAdminSharedImageUpload
            :form
            title="Upload Main Image"
            bucket="portfolios"
            type="main_image"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
