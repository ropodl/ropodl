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
const itemsPerPage = ref(10);

const blogs = ref([]);

onMounted(() => {
  nextTick(async () => {
    const { data, error } = await useFetch("/api/blog");
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
      <v-col cols="12" md="6"></v-col>
      <v-col cols="12" md="6">
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-select
            hide-details
            hide-no-data
            v-model="itemsPerPage"
            label="Items Per Page"
            :items="['10', '20', '30']"
            style="max-width: 150px"
          ></v-select>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <template v-if="blogs.length">
        <v-col cols="12" md="3" v-for="item in blogs">
          <v-card
            flat
            elevation="10"
            height="400"
            :to="'/blogs/' + item['slug']"
          >
            <v-img
              cover
              class="w-100 h-100 pa-2"
              :src="item['featuredImage'].url"
              :alt="item['featuredImage'].alt"
            >
              <div class="d-flex justify-space-between flex-column h-100">
                <div class="d-flex justify-space-between">
                  <v-chip
                    variant="elevated"
                    rounded="pill"
                    color="#212121"
                    class="ml-auto"
                  >
                    {{ formatTimeAgo(new Date(item["createdAt"])) }}
                  </v-chip>
                </div>
                <v-card>
                  <v-card-text
                    class="text-h6 font-weight-bold"
                    style="line-height: normal; white-space: normal"
                  >
                    {{ item["title"] }}
                  </v-card-text>
                </v-card>
              </div>
            </v-img>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <template v-if="blog.blogs.pagination">
      <v-row justify="center">
        <v-pagination
          v-model="page"
          density="compact"
          :length="blog.blogs.pagination.totalPages"
          show-first-last-page
          @update:modelValue="test"
        ></v-pagination>
      </v-row>
    </template>
  </v-container>
</template>
