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
  await useApiFetch<{ data: blog }>(`/blog/${route.params.slug}`).then(
    (res) => {
      blog.value = res.data;
    }
  );
};
</script>
<template>
  <v-container>
    <v-row v-if="blog.excerpt">
      <v-col cols="12" md="12">
        <v-card-title
          class="text-md-h2 text-h4 font-weight-bold px-0 pt-0"
          style="line-height: 1.2; white-space: unset !important"
        >
          {{ blog.title }}
        </v-card-title>
        <div v-if="blog.category" class="d-flex align-center mb-4">
          <v-chip
            color="primary"
            variant="flat"
            size="small"
            rounded="lg"
            class="mr-4"
            :to="`/blog?category=${blog.category.slug}`"
          >
            {{ blog.category.title }}
          </v-chip>
          <div class="text-caption text-medium-emphasis">
            {{
              blog.created_at
                ? useDateFormat(blog.created_at, 'MMMM D, YYYY')
                : ''
            }}
          </div>
        </div>
        <div class="text-h6 text-sm-h4 font-weight-light mb-6">
          {{ blog.excerpt }}
        </div>
        <div v-if="blog.tags?.length" class="d-flex flex-wrap gap-2 mb-8">
          <v-chip
            v-for="tag in blog.tags"
            :key="tag.id"
            size="x-small"
            variant="tonal"
            rounded="lg"
            :to="`/blog?tag=${tag.slug}`"
          >
            #{{ tag.title }}
          </v-chip>
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
        <v-card variant="tonal" rounded="xl" color="primary">
          <v-card-title class="text-overline">Previous Post</v-card-title>
          <v-card-text class="text-h6">Previous</v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="blog.previous" cols="12" md="6">
        <v-card>
          <v-img :src="blog.previous.featured_image?.fileUrl">
            <v-card-title>Previous</v-card-title>
            <v-card-text>Previous</v-card-text>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
