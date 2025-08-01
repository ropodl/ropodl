<script setup>
const {
  params: { id },
} = useRoute();
const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

useHead({
  title: "Add New Blog",
});

const rule = {
  title: [(v) => !!v || "Blog Title is required"],
};

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

const breadcrumb = [
  {
    title: "Home",
    to: "/admin/",
  },
  {
    title: "All Blogs",
    to: "/admin/blog",
  },
  {
    title: "Edit Blog",
    to: "/admin/blog/edit",
  },
];
</script>
<template>
  <v-container :fluid="isFluid">
    <v-form ref="updateBlogRef" @submit.prevent="updateBlog">
      <lazy-admin-layout-page-title
        title="Edit Blog"
        :items="breadcrumb"
        back-link="/admin/blog"
      />
      <v-row>
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
          <v-card border flat elevation="0" rounded="lg">
            <client-only placeholder="Loading Quill Editor">
              <lazy-admin-shared-quill-editor v-model:content="form.content" />
            </client-only>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <lazy-admin-shared-actions :form />
          <!-- <lazy-admin-shared-image-upload
            title="Upload Featured Image"
            :form
            bucket="blogs"
            type="featured_image"
          /> -->
          {{ form }}
          <v-card title="Upload Featured Image">
            <v-divider></v-divider>
            <v-file-upload
              v-model="form.featured_image.url"
              border="0"
              color="transparent"
              density="compact"
              title="Drop file here"
            ></v-file-upload>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
