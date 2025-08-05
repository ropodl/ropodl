<script setup lang="ts">
const { find } = useStrapi();

const date = useDate();

const loading = ref(true);
const page = ref(1);
const blogs = ref<any[]>([]);

const getBlogs = async () => {
  loading.value = true;
  await find<any>("blogs", {
    fields: ["title", "slug", "createdAt"],
    sort: "createdAt:desc",
    status: "published",
    populate: {
      featured_image: {
        fields: ["name", "url"],
      },
    },
  })
    .then((res) => {
      blogs.value = res.data;
    })
    .finally(() => {
      loading.value = false;
    });
};
onMounted(() => {
  getBlogs();
});

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
</script>

<template>
  <NuxtLayout name="page-title">
    <template #title>Blogs</template>
    <v-container>
      <template v-if="loading">
        <v-row>
          <v-col>
            <v-progress-circular indeterminate></v-progress-circular>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <template v-if="blogs.length">
          <v-row>
            <template
              v-for="{
                slug,
                title,
                featured_image: { name, url },
                createdAt,
              } in blogs"
            >
              <v-col cols="12" sm="6" md="4">
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    border="0"
                    rounded="0"
                    :variant="isHovering ? 'tonal' : 'text'"
                    :color="
                      isHovering
                        ? 'rgba(var(--v-theme-primary),0.1)'
                        : 'transparent'
                    "
                    class="h-100"
                    :to="`/blogs/${slug}`"
                  >
                    <v-card border flat class="mb-3">
                      env:{{ process.env }} useMedia:{{
                        useMedia(url)
                      }}
                      useStrapiMedia:{{ useStrapiMedia(url) }}
                      <v-img
                        cover
                        class="w-100 h-100"
                        :aspect-ratio="16 / 9"
                        :class="[isHovering ? 'zoom-image active' : '']"
                        :src="useMedia(url)"
                        :alt="name"
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
                    <v-card-text
                      class="pt-2 text-h6 font-weight-light text-white px-0 pb-0 line-clamp-3"
                      style="line-height: normal; white-space: normal"
                    >
                      {{ title }}
                    </v-card-text>
                    <v-card-text
                      class="text-white text-caption pl-0 font-weight-light"
                    >
                      {{ date.format(createdAt, "fullDate") }}
                    </v-card-text>
                  </v-card>
                </v-hover>
                <v-divider></v-divider>
              </v-col>
            </template>
          </v-row>
        </template>
        <template v-else>
          <v-row>
            <v-col cols="12">
              <v-card border>
                <v-card-text>
                  Sorry, content not available at the moment.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
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
    </v-container>
  </NuxtLayout>
</template>
