<script setup>
import { formatTimeAgo } from "@vueuse/core";

useSeoMeta({
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogTitle: "Saroj Poudel",
  ogDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogUrl: "https://ropodl.vercel.app",
  twitterTitle: "Saroj Poudel",
  twitterDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  twitterCard: "summary",
});

const page = ref(1);

const {
  data: blogs,
  error,
  pending: loading,
} = await useFetch("/api/frontend/blog", {
  params: {
    page,
    per_page: 10,
  },
});
</script>

<template>
  <NuxtLayout name="page-title">
    <template #title>Blogs</template>
    <v-container>
      <v-row>
        <template v-if="blogs.length">
          <template v-for="item in blogs">
            <v-col cols="12" md="3">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  variant="text"
                  color="transparent"
                  class="h-100"
                  @click=""
                  :to="`/blogs/${item['slug']}`"
                >
                  <v-card border flat>
                    <v-img
                      cover
                      class="w-100 h-100 pa-2"
                      :aspect-ratio="16 / 9"
                      :class="[isHovering ? 'zoom-image active' : '']"
                      :src="item.featuredImage?.secure_url"
                      :alt="item.featuredImage?.public_id"
                    ></v-img>
                  </v-card>
                  <v-card-text class="ps-0 pb-0 text-primary">
                    [ {{ formatTimeAgo(new Date(item["created_at"])) }} ]
                  </v-card-text>
                  <v-card-text
                    class="text-h6 font-weight-bold text-white px-0 pb-0 line-clamp-3"
                    style="line-height: normal; white-space: normal"
                    v-text="item['title']"
                  />
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </template>
        <template v-else>
          <v-card border class="w-100">
            <v-card-text
              >Sorry, content not available at the moment.</v-card-text
            >
          </v-card>
        </template>
        <!-- <template v-if="pagination?.totalPage > 1">
          <v-col cols="12" md="12">
            <v-pagination
              v-model="page"
              density="compact"
              :length="pagination.totalPage"
              show-first-last-page
              @update:modelValue="test"
            ></v-pagination>
          </v-col>
        </template> -->
      </v-row>
    </v-container>
  </NuxtLayout>
</template>
