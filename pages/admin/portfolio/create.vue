<script setup>
const config = useRuntimeConfig();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Add New Portfolio",
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

const addBlog = async () => {
  const { data, error, pending } = await useFetch("/api/portfolio/create", {
    method: "POST",
    body: form,
  });
  if (error.value) return console.log(error.value);
  console.log(data.value);
  navigateTo("/admin/portfolio/" + data.value.id);
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
            <client-only placeholder="Loading Quill Editor">
              <LazyAdminSharedQuillEditor v-model:content="form.content" />
            </client-only>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form />
          <LazyAdminSharedImageUpload
            :form
            title="Upload Featured Image"
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
