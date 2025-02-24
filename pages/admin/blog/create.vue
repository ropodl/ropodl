<script setup>
const { setBreadcrumb } = useAdminBreadcrumbStore();
setBreadcrumb([
  {
    title: "All Blogs",
    disabled: false,
    href: "/admin/blog/",
  },
  {
    title: "Create Blog",
    disabled: true,
  },
]);

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New Blog",
});

const rules = {
  title: [(v) => !!v || "Name is required"],
};

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
const addBlogRef = ref();

const addBlog = async () => {
  const { valid } = addBlogRef.value.validate();
  if (valid) {
    const { data, error, pending } = await useFetch("/api/blog/create", {
      method: "POST",
      body: form,
    });

    if (error.value) return console.log(error.value);
    console.log(data.value);
    navigateTo("/admin/blog/" + data.value.id);
  }
};
</script>
<template>
  <v-container>
    <v-form ref="addBlogRef" @submit.prevent="addBlog">
      <v-row>
        <v-col cols="12">
          <div class="text-h4 font-weight-bold">Add New Blog</div>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            label="Blog Title"
            v-model="form.title"
            :rules="rules.title"
          ></v-text-field>
          <v-card flat class="ext-editor rounded-b-0 mb-6">
            <!-- <Editor
            v-model="form.content"
            placeholder="Blog Content"
            api-key="13zhwdufb9fbf9owvry9zsuazna4wwrt77wo2wje0tteg2b6"
            :init="tinymceConfig"
            /> -->
            <client-only placeholder="Loading Quill Editor">
              <LazyAdminSharedQuillEditor v-model:content="form.content" />
            </client-only>
          </v-card>
          <v-textarea label="Blog Excerpt" v-model="form.excerpt"></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form />
          <LazyAdminSharedImageUpload
            title="Upload Featured Image"
            :form
            bucket="blogs"
            type="featured_image"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
