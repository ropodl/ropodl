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
  title: "Add New Portfolio",
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

const addBlog = () => {
  console.log("test");
};
</script>
<template>
  <v-container>
    <v-form @submit.prevent="addBlog">
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
          <v-textarea
            label="Portfolio Excerpt"
            v-model="form.excerpt"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form />
          <LazyAdminSharedImageUpload
            :form
            title="Upload Featured Image"
            bucket="portfolios"
            type="featured_image"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
