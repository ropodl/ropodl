<script setup>
import { formatTimeAgo } from "@vueuse/core";

const blog = useFrontendBlogStore();
const active = useState();

definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Blogs",
});

const page = ref(1);

onMounted(() => {
  nextTick(async () => {
    await getBlogs();
  });
});

const getBlogs = () => {
  blog.getAllBlogs(page.value, 10);
};
</script>

<template>
  <v-container>
    <v-row>
      <template v-if="blog.blogs.length">
        <template v-for="item in blog.blogs">
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
                    :class="[
                      isHovering ? 'zoom-image active' : '',
                      { active: active === item.title },
                    ]"
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
                  v-text="item['title']"
                />
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </template>
    </v-row>
    <template v-if="blog.pagination?.length">
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
<style lang="scss">
img.active {
  view-transition-name: selected-film;
  contain: layout;
}
::view-transition-old(header),
::view-transition-new(header) {
  width: auto;
}
</style>
