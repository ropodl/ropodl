<script setup>
import { formatTimeAgo } from "@vueuse/core";

const route = useRoute();

const {
  params: { slug },
} = route;

const {
  data: blog,
  error,
  pending: loading,
} = await useFetch(`/api/frontend/blog/${slug}`, {
  onResponse({ response }) {
    console.log(response);
  },
  onResponseError({ response }) {
    throw error(response);
  },
});
// if (error.value) return console.log(error);
const { id, featured_image, title, excerpt, content, status, created_at } =
  blog.value;

// console.log(blog);

defineOgImageComponent("Main", {
  title: blog.value.title,
  description: blog.value.excerpt,
});

useSeoMeta({
  title: blog.value.title,
  ogTitle: blog.value.title,
  description: blog.value.excerpt,
  ogDescription: blog.value.excerpt,
  twitterCard: "summary_large_image",
});
</script>
<template>
  <v-skeleton-loader :loading="loading" width="100%" height="600" type="image">
    <v-img
      cover
      class="d-flex align-end rounded-0 border border-t-0 border-e-0 border-s-0"
      height="600"
      :src="featured_image?.url"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-title
              class="text-h2 pl-0"
              style="white-space: unset !important"
              >{{ title }}</v-card-title
            >
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-skeleton-loader>
  <v-container>
    <v-row v-if="excerpt">
      <v-col cols="12" md="12">
        <div class="text-h4 font-weight-light">
          {{ excerpt }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-card flat color="transparent">
          <v-card-text class="px-0 text-overline">
            Published at: {{ formatTimeAgo(new Date(created_at)) }}
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-card flat color="transparent">
          <v-card-title class="px-0"> Share on Social Media </v-card-title>
          <!-- <v-card-text class="px-0">
                        <ShareNetwork class="mr-3" network="facebook" url="https://news.vuejs.org/issues/180" :title="post.title" :description="post.excerpt" quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="vuejs,vite">
                            <v-btn icon variant="tonal">
                                <v-icon>
                                    <Icon icon="fa6-brands:facebook" />
                                </v-icon>
                            </v-btn>
                        </ShareNetwork>
                        <ShareNetwork network="twitter" url="https://news.vuejs.org/issues/180" title="Say hi to Vite! A brand new, extremely fast development setup for Vue." description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You." quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="vuejs,vite">
                            <v-btn icon variant="tonal">
                                <v-icon>
                                    <Icon icon="fa6-brands:x-twitter" />
                                </v-icon>
                            </v-btn>
                        </ShareNetwork>
                    </v-card-text> -->
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card flat color="transparent">
          <v-card-text class="pb-0">
            <!-- <div class="dynamic-content mb-3" v-html="content"></div> -->
            <LazySharedDynamicContent :content />
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-card flat color="transparent">
          <v-card-text class="text-overline" style="white-space: normal"
            >Published at:
            {{ formatTimeAgo(new Date(created_at)) }}</v-card-text
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
