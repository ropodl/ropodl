<script setup>
import { Icon } from "@iconify/vue";
import Editor from "@tinymce/tinymce-vue";
import { tinymceConfig } from "~/utils/tinymce";

const blog = useBlog();
// const category = useCategory();
// const tag = useTag();
const route = useRoute();

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

useHead({
  title: "Add New Blog",
});

const form = reactive({
  title: "",
  excerpt: "",
  content: "",
  categories: [],
  tags: [],
  image: null,
  visibility: "Public",
  status: "Draft",
});
// Image Upload
const file = shallowRef();
const url = useObjectUrl(file);
// Image Upload

let postId = ref("");
onMounted(() => {
  nextTick(async () => {
    // Call blog with slug
    const res = await blog.getBlog(route.params.slug);
    // Format categories to array and store in form
    // const categories = res.blog.categories.map((category) => {
    //   const { _id } = category;
    //   return _id;
    // });
    // Format tags to array and store in form
    // const tags = res.blog.tags.map((tag) => {
    //   const { _id } = tag;
    //   return _id;
    // });

    form.title = res.blog?.title;
    form.excerpt = res.blog?.excerpt;
    form.content = res.blog?.content;
    // form.categories = categories;
    // form.tags = tags;
    // form.visibility = res.blog.visibility;
    form.status = res.blog?.status;
    form.image = res.blog?.featuredImage?.url;

    postId.value = res.blog?._id;
    // category.latest();
    // tag.latest();
  });
});

// temporary for thumbnail
const selectFeaturedImage = ({ target }) => {
  const { value, files, name } = target;
  if (name === "image") {
    file.value = files[0];
    return (form.image = files[0]);
  }
};
const updateBlog = () => {
  const formData = new FormData();
  for (const key in form) {
    const value = form[key];
    formData.append(key, value);
  }
  blog.updateBlog(formData, postId.value);
};

const searchCategories = () => {
  alert("test");
};

let statusEdit = ref(false);
let statusTemp = ref("Draft");
let visibilityEdit = ref(false);
let visibilityTemp = ref("Public");
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
                api-key="13zhwdufb9fbf9owvry9zsuazna4wwrt77wo2wje0tteg2b6"
                :init="tinymceConfig"
              />
            </client-only>
          </v-card>
          <v-textarea label="Blog Excerpt" v-model="form.excerpt"></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <LazyAdminSharedActions :form="form" />
          <!-- <v-card class="mb-3">
            <v-card-title>Categories</v-card-title>
            <v-divider></v-divider>
            <v-autocomplete
              hide-details
              hide-no-data
              rounded="0"
              density="comfortable"
              placeholder="Search Categories"
              menu-icon=""
              append-inner-icon="mdi-magnify"
              @click:append-inner="searchCategories"
            >
            </v-autocomplete>
            <v-card-text>
              <template v-for="(item, i) in category.categories">
                <v-checkbox
                  v-model="form.categories"
                  hide-details
                  :label="item['title']"
                  :value="item['id']"
                  density="compact"
                  class="text-capitalize"
                ></v-checkbox>
              </template>
            </v-card-text>
          </v-card>
          <v-card class="mb-3">
            <v-card-title>Tags</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <template v-for="(item, i) in tag.tags">
                <v-checkbox
                  v-model="form.tags"
                  hide-details
                  :label="item['title']"
                  :value="item['id']"
                  density="compact"
                  class="text-capitalize"
                ></v-checkbox>
              </template>
            </v-card-text>
          </v-card> -->
          <v-card class="mb-3">
            <v-card-title>Featured Image</v-card-title>
            <v-divider></v-divider>
            <v-card-text
              class="d-flex align-center justify-center position-relative pa-0"
            >
              <template v-if="form.image !== null">
                <v-hover v-slot="{ isHovering, props }">
                  <v-img
                    cover
                    v-bind="props"
                    :src="typeof form.image == 'object' ? url : form.image"
                    height="200"
                  >
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

<!-- editor theme -->
<!-- <style lang="scss">
.ext-editor {
    .tox-tinymce {
        border: 0px;
        border-radius: 0;
    }

    .tox:not(.tox-tinymce-inline) .tox-editor-header {
        background-color: unset;
    }

    .tox .tox-menubar {
        background-color: unset;
    }

    .tox .tox-toolbar-overlord {
        background-color: unset !important;
    }

    .tox .tox-toolbar,
    .tox .tox-toolbar__overflow,
    .tox .tox-toolbar__primary {
        background-color: unset !important;
    }

    .tox-edit-area iframe.tox-edit-area__iframe body#tinymce.mce-content-body {
        background-color: rgb(var(--v-theme-surface)) !important;
    }

    .tox-statusbar {
        background-color: unset;
    }
}
</style> -->
