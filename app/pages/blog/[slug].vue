<script setup lang="ts">
import type { blog } from '~/types/blog';
import useApiFetch from '~/utils/shared/useApiFetch';

const route = useRoute();

const DynamicContent = defineAsyncComponent(
  () => import('~/components/dynamicContent.vue')
);

const blog = ref<blog>({
  title: '',
  content: '',
});

onMounted(() => {
  getBlogBySlug();
});

const getBlogBySlug = async () => {
  await useApiFetch(`/blog/${route.params.slug}`).then((res) => {
    blog.value = res.data;
  });
};
</script>
<template>
  <v-container max-width="1200">
    <v-row v-if="blog.excerpt">
      <v-col cols="12" md="12">
        <v-card-title
          class="text-md-h2 text-h4 font-weight-bold px-0 pt-0"
          style="line-height: 1.2; white-space: unset !important"
        >
          {{ blog.title }}
        </v-card-title>
        <div class="text-h6 text-sm-h4 font-weight-light">
          {{ blog.excerpt }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <template v-if="blog.featured_image?.fileUrl">
          <v-card border rounded="xl">
            <v-img
              cover
              :aspect-ratio="16 / 8"
              :src="blog.featured_image.fileUrl"
              :alt="blog.featured_image.altText"
            />
          </v-card>
        </template>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <template v-if="blog.content">
          <dynamic-content :content="blog.content" />
        </template>
      </v-col>
    </v-row>
    <v-row justify="space-between" class="mb-16">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Previous</v-card-title>
          <v-card-text>Previous</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-img :src="blog.previous?.featured_image.fileUrl">
            <v-card-title>Previous</v-card-title>
            <v-card-text>Previous</v-card-text>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
