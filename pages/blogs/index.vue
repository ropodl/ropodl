<script setup>
import { formatTimeAgo } from "@vueuse/core";
const blog = useBlog();

definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Blogs",
});

const page = ref(1);

const blogs = ref([]);

onMounted(() => {
  nextTick(async () => {
    const { data, error } = await useFetch("/api/frontend/blog");
    if (error.value) return console.log(error.value);
    blogs.value = data.value;
  });
});
// blog.getAllBlogs(page.value, 10);

const test = () => {
  blog.getAllBlogs(page.value, 10);
};
</script>

<template>
  <v-container>
    <v-row>
      <template v-if="blogs.length">
        <template v-for="item in blogs">
          {{ item }}
          <v-col cols="12" md="3">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                variant="text"
                color="transparent"
                class="h-100"
                :to="`/blogs/${item['slug']}`"
              >
                <v-card border flat>
                  <v-img
                    cover
                    class="w-100 h-100 pa-2"
                    :class="isHovering ? 'zoom-image' : ''"
                    :aspect-ratio="1"
                    :src="item.featuredImage?.url"
                    :alt="item.featuredImage?.alt"
                  >
                    <div class="d-flex justify-space-between flex-column h-100">
                      <div class="d-flex justify-space-between">
                        <v-chip
                          variant="flat"
                          rounded="pill"
                          color="#212121"
                          class="ml-auto"
                        >
                          {{ formatTimeAgo(new Date(item["createdAt"])) }}
                        </v-chip>
                      </div>
                    </div>
                  </v-img>
                </v-card>
                <v-card-text
                  class="text-h6 font-weight-bold text-white px-0 pb-0 line-clamp-3"
                  style="line-height: normal; white-space: normal"
                >
                  {{ item["title"] }}
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </template>
    </v-row>
    <template v-if="blog.blogs.pagination">
      <v-row justify="center">
        <v-pagination
          v-model="page"
          density="compact"
          :length="blog.pagination.totalPage"
          show-first-last-page
          @update:modelValue="test"
        ></v-pagination>
      </v-row>
    </template>
  </v-container>
</template>
