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
  excerpt: "",
  content: "",
  featured_image: {
    id: "",
    url: null,
  },
  status: false,
});

onMounted(() => {
  nextTick(async () => {
    await useFetch("/api/blog/" + id, {
      onResponse({ response }) {
        const { title, excerpt, content, featured_image, status } =
          response._data;
        form.title = title;
        form.excerpt = excerpt;
        form.content = content;
        form.featured_image.url = featured_image.url;
        form.featured_image.id = featured_image.id;
        form.status = status;
      },
      onResponseError({ response }) {
        console.log(response._error);
      },
    });
  });
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
  <v-container>
    <v-form @submit.prevent="updateBlog">
      <v-row>
        <v-col cols="12">
          <div class="text-h4 font-weight-bold">Edit Blog</div>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field label="Blog Title" v-model="form.title"></v-text-field>
          <v-card flat rounded="0" class="ext-editor mb-10">
            <client-only placeholder="Loading TinyMCE Cloud">
              <Editor
                v-model="form.content"
                placeholder="Blog Content"
                :api-key="config.public.tinymce_key"
                :init="tinymceConfig"
              />
            </client-only>
          </v-card>
          <v-textarea label="Blog Excerpt" v-model="form.excerpt"></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
          <LazyAdminSharedImageUpload
            title="Upload Featured Image"
            :form="form"
            bucket="blogs"
            type="featured_image"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
