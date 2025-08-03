<script setup lang="ts">
const { findOne } = useStrapi();
const route = useRoute();

const blog = ref<any>({});
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
  await findOne<any>("blogs", "", <any>{
    filters: {
      slug: route.params.slug,
    },
    populate: "*",
  })
    .then((res) => {
      blog.value = res.data[0];
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <v-card border="b" rounded="0">
    <v-img
      cover
      height="1000"
      :src="useStrapiMedia(blog.featured_image?.url)"
      class="d-flex align-end h-100"
    >
      <template v-if="blog.title">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card-title
                class="text-sm-h2 text-h4 font-weight-bold"
                style="
                  line-height: 1.2;
                  font-family: Ubuntu;
                  white-space: unset !important;
                "
              >
                {{ blog.title }}
              </v-card-title>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-img>
  </v-card>
  <v-container>
    <v-row>
      <v-col cols="12"> </v-col>
    </v-row>
    <v-row v-if="blog.excerpt">
      <v-col cols="12" md="12">
        <div class="text-h6 text-sm-h4 font-weight-light">
          {{ blog.excerpt }}
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <template v-if="blog.content">
          <LazySharedDynamicContent :content="blog.content" />
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
