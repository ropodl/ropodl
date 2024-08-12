<script setup>
import { Icon } from "@iconify/vue";
import { formatTimeAgo } from "@vueuse/core";

const route = useRoute();

const {
  params: { slug },
} = route;

const blog = ref({
  title: "",
  content: "",
  excerpt: "",
  featured_image: {
    id: "",
    url: null,
  },
  created_at: "",
});
const loading = ref(false);

useSeoMeta({
  title: blog.value.title,
  ogTitle: blog.value.title,
  description: blog.value.excerpt,
  ogDescription: blog.value.excerpt,
  twitterCard: "summary_large_image",
});

useHead({
  script: [
    {
      async: true,
      src: "https://platform-api.sharethis.com/js/sharethis.js#property=#{property?._id}&product=custom-share-buttons&source=platform",
    },
  ],
});

// defineOgImage({
//   component: "Main",
//   headline: "Blogs",
//   title: blog.value?.title,
//   description: blog.value?.excerpt,
//   componentOptions: { global: true },
// });

onMounted(() => {
  nextTick(async () => {
    const { data, error, pending } = await useFetch(
      `/api/frontend/blog/${slug}`,
      {
        onResponse({ response }) {
          const { title, excerpt, content, featured_image, created_at } =
            response._data;
          blog.value.title = title;
          blog.value.excerpt = excerpt;
          blog.value.content = content;
          blog.value.featured_image = featured_image;
          blog.value.created_at = created_at;
          loading.value = false;
        },
        onResponseError({ response }) {
          console.log(response._error);
          loading.value = false;
        },
      }
    );
  });
});
</script>
<template>
  <v-skeleton-loader :loading="loading" width="100%" height="600" type="image">
    <v-img
      cover
      class="d-flex align-end rounded-0 border border-t-0 border-e-0 border-s-0"
      height="600"
      :src="blog.featured_image?.url"
    >
      <v-container v-if="blog.title">
        <v-row>
          <v-col cols="12">
            <v-card-title
              class="text-h2 pl-0"
              style="white-space: unset !important"
            >
              {{ blog.title }}
            </v-card-title>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-skeleton-loader>
  <v-container>
    <v-row v-if="blog.excerpt">
      <v-col cols="12" md="12">
        <div class="text-h4 font-weight-light">
          {{ blog.excerpt }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-card
          flat
          color="transparent"
          class="position-sticky"
          style="top: 70px"
        >
          <v-card-text class="px-0 text-overline">
            Published {{ formatTimeAgo(new Date(blog.created_at)) }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="px-0">Share on Social</v-card-title>
          <v-card-text class="px-0">
            <v-row dense>
              <v-col cols="4" sm="3">
                <v-btn
                  icon
                  block
                  rounded="lg"
                  variant="tonal"
                  class="st-custom-button"
                  data-network="facebook"
                >
                  <v-icon>
                    <Icon icon="fa6-brands:facebook" />
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4" sm="3">
                <v-btn
                  icon
                  block
                  rounded="lg"
                  variant="tonal"
                  data-network="twitter"
                >
                  <v-icon>
                    <Icon icon="fa6-brands:x-twitter" />
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <template v-if="blog.content">
          <v-card flat color="transparent">
            <v-card-text class="pb-0">
              <!-- <div class="dynamic-content mb-3" v-html="content"></div> -->
              <LazySharedDynamicContent :content="blog.content" />
            </v-card-text>
          </v-card>
        </template>
        <v-divider></v-divider>
        <v-card flat color="transparent">
          <v-card-text class="text-overline" style="white-space: normal"
            >Published
            {{ formatTimeAgo(new Date(blog.created_at)) }}</v-card-text
          >
        </v-card>
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
