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
    .get(`http://localhost:1337/api/blogs/${slug}`)
    .then((res) => {
      blog.value = res.data;
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-img
            cover
            height="500"
            class="d-flex align-end rounded-0"
            :src="blog.featured_image?.url"
          >
            <template v-if="blog.title">
              <v-row>
                <v-col cols="12">
                  <v-card-title
                    class="text-sm-h2 text-h4 pb-0"
                    style="white-space: unset !important"
                  >
                    {{ blog.title }}
                  </v-card-title>
                  <v-card-text class="text-overline">
                    Published {{ formatTimeAgo(new Date(blog.created_at)) }}
                  </v-card-text>
                </v-col>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
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
