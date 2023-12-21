<script setup>
import { Icon } from "@iconify/vue";
import Editor from "@tinymce/tinymce-vue";
import { tinymceConfig } from "../../../utils/tinymce";
import getBase64 from "~/utils/getBase64";

const blog = useBlogStore();
const supabase = useSupabaseClient();
// const category = useCategory();
// const tag = useTag();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New Blog",
});

const file = shallowRef();
const form = reactive({
  title: "",
  excerpt: "",
  content: "",
  // categories: [],
  // tags: [],
  image: null,
  // visibility: "Public",
  published: false,
});

// temporary for thumbnail
const selectFeaturedImage = async ({ target }) => {
  const { value, files, name } = target;
  // file.value = files[0];
  // form.image = await getBase64(file.value);
  // form.ima

  console.log(files[0]);

  const { data, error } = await supabase.storage.from("blog").upload(files[0], {
    contentType: "image/*",
  });

  console.log(error);
  console.log(data);

  // const avatarFile = event.target.files[0]
  // const { data, error } = await supabase
  //   .storage
  //   .from('avatars')
  //   .upload('public/avatar1.png', avatarFile, {
  //     cacheControl: '3600',
  //     upsert: false
  //   })
};

const addBlog = async () => {
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  // blog.create(formData);
  const {
    data,
    error,
    pending: loading,
  } = await useFetch("/api/blog/create", {
    method: "POST",
    body: formData,
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
          <v-card class="mb-3">
            <v-card-title>Featured Image</v-card-title>
            <v-divider></v-divider>
            <v-card-text
              class="d-flex align-center justify-center position-relative pa-0"
            >
              <template v-if="form.image !== null">
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
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
