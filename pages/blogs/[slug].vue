<script setup>
import { formatTimeAgo } from "@vueuse/core";

const route = useRoute();

const {
  params: { slug },
} = route;

const blog = ref({});
const loading = ref(false);

useSeoMeta({
  title: blog.value.title,
  ogTitle: blog.value.title,
  description: blog.value.excerpt,
  ogDescription: blog.value.excerpt,
  twitterCard: "summary_large_image",
});

onMounted(() => {
  getBlogBySlug();
});

const getBlogBySlug = async () => {
  await useAxios
    .get(`/api/frontend/blog/${slug}`)
    .then((res) => {
      blog.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <v-skeleton-loader :loading="loading" width="100%" height="600" type="image">
    <v-img
      cover
      class="d-flex align-end rounded-0 border border-t-0 border-e-0 border-s-0"
      height="600"
      :src="blog.featured_image?.url"
    >
      <template v-if="blog.title">
        <v-container class="pb-0">
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-card-title
                class="text-sm-h2 text-h4 pl-0"
                style="white-space: unset !important"
              >
                {{ blog.title }}
              </v-card-title>
              <v-card-text class="px-0 text-overline">
                Published {{ formatTimeAgo(new Date(blog.created_at)) }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-img>
  </v-skeleton-loader>
  <v-container>
    <v-row v-if="blog.excerpt">
      <v-col cols="12" md="12">
        <div class="text-h6 text-sm-h4 font-weight-light">
          {{ blog.excerpt }}
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <template v-if="blog.content">
          <v-card border="0" flat color="transparent">
            <v-card-text class="pa-0">
              <LazySharedDynamicContent :content="blog.content" />
            </v-card-text>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.active {
  view-transition-name: selected-film;
}
::view-transition-old(header),
::view-transition-new(header) {
  width: auto;
}
</style>
