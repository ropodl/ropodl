<script setup>
import { Icon } from "@iconify/vue";
import Editor from "@tinymce/tinymce-vue";
import { tinymceConfig } from "../../../utils/tinymce";
import getBase64 from "~/utils/getBase64";

// const blog = useBlogStore();

// const category = useCategory();
// const tag = useTag();

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
  // categories: [],
  // tags: [],
  featured_image: null,
  // visibility: "Public",
  published: false,
});

const addBlog = async () => {
  const {
    data,
    error,
    pending: loading,
  } = await useFetch("/api/blog/create", {
    method: "POST",
    body: form,
  });

  if (error.value) return console.log(error.value);
  console.log(data.value);
};
</script>
<template>
  <v-container>
    <v-form @submit.prevent="addBlog">
      <v-row>
        <v-col cols="12">
          <div class="text-h4 font-weight-bold">Add New Blog</div>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field label="Blog Title" v-model="form.title"></v-text-field>
          <v-card flat rounded="0" class="ext-editor mb-10">
            <client-only placeholder="Loading TinyMCE Cloud">
              <Editor
                v-model="form.content"
                placeholder="Blog Content"
                api-key="13zhwdufb9fbf9owvry9zsuazna4wwrt77wo2wje0tteg2b6"
                :init="tinymceConfig"
              />
            </client-only>
          </v-card>
          <v-textarea label="Blog Excerpt" v-model="form.excerpt"></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
          <!-- <input type="file" @change="updateImage" /> -->
          <LazyAdminSharedFileUpload
            title="Upload Featured Image"
            :form="form"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
