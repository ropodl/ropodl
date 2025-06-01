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
// test
const tag = ref([]);

const srcs = {
  1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
  2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
  3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
  4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
  5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
};
const tags = [
  { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
  { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
  { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
  { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
  { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
  { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
  { name: "John Smith", group: "Group 2", avatar: srcs[1] },
  { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] },
];

const current = ref("");
const categories = ref(["test", "asd"]);
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
            <ClientOnly placeholder="Loading Quill Editor">
              <lazy-admin-shared-quill-editor v-model:content="form.content" />
            </ClientOnly>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form />
          <v-card class="mb-3">
            <v-card-title>Category</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-select
                placeholder="Select a category"
                :items="['Test', 'why']"
              ></v-select>
              <v-btn block>Add New Category</v-btn>
            </v-card-text>
          </v-card>
          <v-card class="mb-3">
            <v-card-title>Tags</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pb-0">
              <v-autocomplete
                v-model="tag"
                :items="tags"
                placeholder="Select multiple tags for the blog"
                item-title="name"
                item-value="name"
                chips
                closable-chips
                multiple
              >
                <template v-slot:chip="{ props, item }">
                  <v-chip
                    v-bind="props"
                    size="large"
                    :text="item.raw.name"
                  ></v-chip>
                </template>

                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :subtitle="item.raw.group"
                    :title="item.raw.name"
                  ></v-list-item>
                </template>
              </v-autocomplete>
            </v-card-text>
          </v-card>
          <LazyAdminSharedImageUpload
            title="Upload Featured Image"
            :form
            bucket="blogs"
            type="featured_image"
          />
          <v-card>
            <v-card-title>Featured Image</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-dialog scrollable scrim="black" height="90vh">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn v-bind="activatorProps" text="Open Dialog"></v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card>
                    <v-card-title class="mb-3"
                      >Upload Featured Image</v-card-title
                    >
                    <v-btn
                      size="small"
                      icon="mdi-close"
                      class="position-absolute"
                      style="top: 5px; right: 5px"
                    ></v-btn>
                    <v-card-text class="py-0" style="flex: none !important">
                      <v-card
                        border
                        class="pa-1"
                        style="max-width: max-content"
                      >
                        <v-tabs
                          v-model="current"
                          color="primary"
                          density="compact"
                          hide-slider
                          show-arrows
                          rounded="lg"
                        >
                          <template v-for="item in categories">
                            <v-tab
                              color="primary"
                              rounded="lg"
                              class="px-12"
                              :value="item"
                              :variant="current === item ? 'tonal' : 'text'"
                            >
                              {{ item }}
                              {{ current }}
                            </v-tab>
                          </template>
                        </v-tabs>
                      </v-card>
                    </v-card-text>
                    <v-card-text class="fill-height">
                      <v-file-upload class="fill-height"></v-file-upload>
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
