<script setup>
import { formatTimeAgo } from "@vueuse/core";

useSeoMeta({
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogTitle: "Saroj Poudel",
  ogDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogUrl: "https://ropodl.com",
  twitterTitle: "Saroj Poudel",
  twitterDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  twitterCard: "summary",
});

const page = ref(1);
const blogs = ref([]);
const getBlogs = async () => {
  await useAxios.get("http://localhost:1337/api/blogs").then((res) => {
    blogs.value = res.data;
  });
};
onMounted(() => {
  getBlogs();
});
</script>

<template>
  <NuxtLayout name="page-title">
    <template #title>Blogs</template>
    <v-container>
      <v-row>
        <template v-if="status === 'pending'">
          <template v-for="i in 6">
            <v-col cols="12" sm="6" md="4">
              <v-card height="260">
                <v-skeleton-loader
                  class="w-100 h-100"
                  type="image"
                ></v-skeleton-loader>
              </v-card>
            </v-col>
          </template>
        </template>
        <template v-else>
          <template v-if="blogs.length">
            <template
              v-for="{
                documentId,
                slug,
                title,
                featured_image,
                created_at,
              } in blogs"
            >
              <v-col cols="12" sm="6" md="4" :duration="500">
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    border="0"
                    variant="text"
                    color="transparent"
                    class="h-100"
                    :to="`/blogs/${documentId}`"
                  >
                    <v-card border flat>
                      <v-img
                        cover
                        class="w-100 h-100 pa-2"
                        :aspect-ratio="16 / 9"
                        :class="[isHovering ? 'zoom-image active' : '']"
                        :src="featured_image?.url"
                        :alt="featured_image?.id"
                      >
                        <template v-slot:placeholder>
                          <div
                            class="d-flex align-center justify-center fill-height"
                          >
                            <v-skeleton-loader
                              class="w-100 h-100"
                              type="image"
                            ></v-skeleton-loader>
                          </div>
                        </template>
                      </v-img>
                    </v-card>
                    <v-card-text class="ps-0 pb-0 text-brand">
                      [ {{ formatTimeAgo(new Date(created_at)) }} ]
                    </v-card-text>
                    <v-card-text
                      class="pt-2 text-h6 font-weight-bold text-white px-0 pb-0 line-clamp-3"
                      style="line-height: normal; white-space: normal"
                      v-text="title"
                    />
                  </v-card>
                </v-hover>
              </v-col>
            </template>
          </template>
          <template v-else>
            <v-col cols="12">
              <v-card border>
                <v-card-text>
                  Sorry, content not available at the moment.
                </v-card-text>
              </v-card>
            </v-col>
          </template>
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
