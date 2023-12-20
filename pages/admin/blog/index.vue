<script setup lang="ts">
import { Icon } from "@iconify/vue";

const blog = useBlogStore();
const { headers, pagination } = storeToRefs(blog);

const supabase = useSupabaseClient();

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Blogs",
});

const loading = ref(true);
// Table item select / delete
const selected = ref([]);
// const deleteBulk = () => {
//   blog.removeBulk(selected.value);
//   selected.value = [];
// };
// server side table
const loadBlogs = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  // await blog.getAllBlogs(page, itemsPerPage);
  loading.value = false;
};
const { data: blogs, error } = await supabase.from("blogs").select("*");
</script>
<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">Blogs</div>
      </v-col>
      <v-col cols="12" md="4"></v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-wrap justify-end align-center">
          <template v-if="selected.length > 0">
            <v-btn
              icon
              rounded="lg"
              variant="tonal"
              class="mr-3"
              @click="deleteBulk"
            >
              <v-icon>
                <Icon icon="mdi:bin-outline" />
              </v-icon>
            </v-btn>
          </template>
          <v-btn
            variant="tonal"
            height="50"
            class="text-capitalize px-10"
            to="/admin/blog/create"
          >
            Add new Blog
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card border rounded="lg">
          <v-data-table-server
            show-select
            v-model="selected"
            :items-per-page="pagination.itemsPerPage"
            :headers="headers"
            :items="blogs"
            :loading="loading"
            :items-length="pagination.totalItems"
            item-value="id"
            @update:options="loadBlogs"
          >
            <template v-slot:item.image="{ item }">
              <div>
                <v-img
                  cover
                  width="160"
                  class="border rounded-lg"
                  :aspect-ratio="16 / 9"
                  :src="item.featuredImage?.secure_url"
                ></v-img>
              </div>
            </template>
            <template v-slot:item.title="{ item }">
              <v-list lines="three">
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.excerpt
                  }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </template>
            <!-- <template v-slot:item.categories="{ item }">
              <v-chip
                v-for="(cat, i) in item.categories"
                rounded="sm"
                size="large"
                :class="[i + 1 != item.categories.length ? 'mr-2' : '']"
              >
                {{ cat.title }}
              </v-chip>
            </template> -->
            <!-- <template v-slot:item.tags="{ item }">
              <template v-for="(tag, i) in item.tags">
                <v-chip
                  rounded="sm"
                  size="large"
                  :class="[i + 1 != item.tags.length ? 'mr-2' : '']"
                >
                  {{ tag.title }}
                </v-chip>
              </template>
            </template> -->
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                color="success"
                rounded="lg"
                variant="tonal"
                class="mr-2"
                :to="`/admin/blog/${item.id}`"
              >
                <v-icon>
                  <Icon icon="mdi:pencil" />
                </v-icon>
              </v-btn>
              <AdminSharedDelete
                type="Blog"
                :title="item.title"
                @delete-action="blog.remove(item.id)"
              />
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
