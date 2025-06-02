<script setup lang="ts">
const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New Blog",
});

const rules = {
  title: [(v: string) => !!v || "Name is required"],
};

const form = ref({
  title: "",
  excerpt: "",
  content: "",
  category: null,
  tag: [],
  featured_image: {
    id: "",
    url: null,
  },
  status: false,
});
const addBlogRef = ref();

const addBlog = async () => {
  const { valid } = addBlogRef.value.validate();
  if (valid) {
    await useAxios
      .post("/api/blog/create", {
        data: form.value,
      })
      .then((res) => {
        navigateTo("/admin/blog/" + res.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const breadcrumbs = [
  {
    title: "Home",
    to: "/admin/",
  },
  {
    title: "All Blogs",
    to: "/admin/blog/",
  },
  {
    title: "Add New",
    to: "/admin/blog/create",
  },
];
</script>
<template>
  <v-container :fluid="isFluid">
    <v-form ref="addBlogRef" @submit.prevent="addBlog">
      <lazy-admin-layout-page-title
        title="Add New Blog"
        :items="breadcrumbs"
        back-link="/admin/blog"
      />
      <v-row>
        <v-col cols="12" md="8">
          <lazy-admin-shared-field-label>
            Blog Title
          </lazy-admin-shared-field-label>
          <v-text-field
            v-model="form.title"
            placeholder="Give your blog post a creative name"
            :rules="rules.title"
          ></v-text-field>
          <lazy-admin-shared-field-label>
            Blog Excerpt
          </lazy-admin-shared-field-label>
          <v-textarea
            v-model="form.excerpt"
            placeholder="Summarize the post in 255 letters"
          ></v-textarea>
          <lazy-admin-shared-field-label>
            Blog Content
          </lazy-admin-shared-field-label>
          <v-card flat class="ext-editor mb-6">
            <client-only placeholder="Loading Quill Editor">
              <lazy-admin-shared-quill-editor v-model="form.content" />
            </client-only>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <lazy-admin-shared-actions :form />
          <lazy-admin-shared-blogs-category v-model="form.category" />
          <lazy-admin-shared-blogs-tag v-model="form.tag" />
          <lazy-admin-shared-image-upload
            v-model="form.featured_image"
            title="Upload Featured Image"
            :form
            bucket="media"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
