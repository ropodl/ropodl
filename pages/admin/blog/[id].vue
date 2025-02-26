<script setup>
import { rule } from "./rule.js";

const config = useRuntimeConfig();
const { setBreadcrumb } = useAdminBreadcrumbStore();
setBreadcrumb([
  {
    title: "All Blogs",
    disabled: false,
    to: "/admin/blog",
  },
  {
    title: "Edit Blog",
  },
]);

const {
  params: { id },
} = useRoute();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New Blog",
});

const form = ref({
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
  getPostById();
});

const getPostById = async () => {
  await useAxios.get(`/api/blog/${id}`).then((res) => {
    form.value = res;
  });
};

const updateBlogRef = ref();
const updateBlog = async () => {
  const { valid } = updateBlogRef.value.validate();

  if (valid)
    await useAxios
      .patch(`/api/blog/${id}`, form.value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
};
</script>
<template>
  <v-container>
    <v-form ref="updateBlogRef" @submit.prevent="updateBlog">
      <v-row>
        <v-col cols="12">
          <div class="text-h4 font-weight-bold">Edit Blog</div>
        </v-col>
        <v-col cols="12" md="8">
          <lazy-admin-shared-field-label>
            Blog Title
          </lazy-admin-shared-field-label>
          <v-text-field
            v-model="form.title"
            class="mb-2"
            :rules="rule.title"
          ></v-text-field>
          <lazy-admin-shared-field-label>
            Blog Excerpt
          </lazy-admin-shared-field-label>
          <v-textarea v-model="form.excerpt" class="mb-2"></v-textarea>
          <lazy-admin-shared-field-label>
            Blog Content
          </lazy-admin-shared-field-label>
          <v-card flat elevation="0" rounded="lg">
            <client-only placeholder="Loading Quill Editor">
              <lazy-admin-shared-quill-editor v-model:content="form.content" />
            </client-only>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <lazy-admin-shared-actions :form="form" />
          <lazy-admin-shared-image-upload
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
