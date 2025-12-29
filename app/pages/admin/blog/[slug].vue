<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { blog } from "~/types/blog";
import Editor from "~/components/admin/shared/Editor.vue";
import MediaSelector from "~/components/admin/shared/MediaSelector.vue";
import useApiFetch from "~/utils/shared/useApiFetch";

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const blog = ref<blog>({
  title: null,
  slug: null,
  content: null,
  featured_image: null,
  status: null,
});

const route = useRoute();
const router = useRouter();
const slug = route.params.slug as string;
const isEditing = computed(() => slug !== "create");

const loading = ref(false);
const saving = ref(false);
const showMediaSelector = ref(false);

const form = ref({
   title: "",
   slug: "",
   content: "",
   excerpt: "",
   featured_image_id: null as number | null,
   featured_image_url: null as string | null,
   status: "draft" as "draft" | "published",
});

const fetchBlog = async () => {
   if (!isEditing.value) return;
   
   loading.value = true;
   try {
      const res = await useApiFetch<any>(`blog/${slug}`);
      if (res.success && res.data) {
         const data = res.data;
         form.value = {
            title: data.title,
            slug: data.slug,
            content: data.content,
            excerpt: data.excerpt || "",
            featured_image_id: data.featured,
            featured_image_url: data.featured_image_url || null, // Assuming backend provides this now or we need to fetch it
            status: data.status,
         };
      }
   } catch (error) {
      console.error("Failed to fetch blog:", error);
   } finally {
      loading.value = false;
   }
};

onMounted(fetchBlog);

const rules = {
   title: [
      (v: string) => !!v || "Blog Title is required",
      (v: string) =>
         v.length <= 100 || "Blog Title must be 100 characters or less",
   ],
   slug: [
      (v: string) => !!v || "Slug is required",
      (v: string) =>
         !v || v.length <= 120 || "Blog Slug must be 120 characters or less",
   ],
};

const blogForm = ref();

const handleImageSelected = (url: string, id: number) => {
   form.value.featured_image_url = url;
   form.value.featured_image_id = id;
};

const removeImage = () => {
   form.value.featured_image_url = null;
   form.value.featured_image_id = null;
};

const submit = async () => {
   const { valid } = await blogForm.value.validate();
   if (!valid) return;

   saving.value = true;
   const endpoint = isEditing.value ? `blog/${slug}` : "blog";
   const method = isEditing.value ? "PATCH" : "POST";

   try {
      const res = await useApiFetch<any>(endpoint, {
         method,
         body: form.value,
      });

      if (res.success) {
         // Redirect back to list
         router.push("/admin/blog");
      }
   } catch (error) {
      console.error("Form Submission error", error);
   } finally {
      saving.value = false;
   }
};

const statusOptions = [
   { title: "Draft", value: "draft" },
   { title: "Published", value: "published" },
] as const;
</script>

<template>
   <v-container v-if="!loading">
      <v-form ref="blogForm" @submit.prevent="submit">
         <v-row>
            <v-col cols="12" md="8">
               <v-label>Blog Title</v-label>
               <v-text-field
                  v-model="form.title"
                  placeholder="eg. Lorem ipsum dolor."
                  :rules="rules.title"
               />

               <v-label>Blog Slug</v-label>
               <v-text-field
                  v-model="form.slug"
                  placeholder="eg. lorem-ipsum-dolor"
                  :rules="rules.slug"
               />

               <v-label>Blog Content</v-label>
                  <client-only>
                     <Editor v-model:content="form.content" />
                     <template #fallback>
                        <div class="text-center pa-4">Loading Editor...</div>
                     </template>
                  </client-only>

               <v-label class="mt-4">Excerpt</v-label>
               <v-textarea
                  v-model="form.excerpt"
                  placeholder="Provide a brief summary..."
                  rows="3"
               />
            </v-col>

            <v-col cols="12" md="4">
               <v-card class="mb-3">
                  <v-card-text class="pb-0">
                     <v-label>Status</v-label>
                  </v-card-text>
                  <v-card-text class="pt-0">
                     <v-select
                        v-model="form.status"
                        hide-details
                        :items="statusOptions"
                        placeholder="Blog Status"
                     />
                  </v-card-text>
               </v-card>

               <v-card class="mb-3">
                  <v-card-text class="pb-0">
                     <v-label>Featured Image</v-label>
                  </v-card-text>
                  <v-card-text class="pt-0">
                     <v-card border height="200" class="d-flex align-center justify-center cursor-pointer" @click="showMediaSelector = true">
                        <v-img
                           v-if="form.featured_image_url"
                           :src="form.featured_image_url"
                           cover
                           class="fill-height w-100"
                        >
                           <v-btn
                              icon="mdi-close"
                              color="error"
                              variant="flat"
                              density="compact"
                              class="ma-2"
                              @click.stop="removeImage"
                           />
                        </v-img>
                        <div v-else class="text-center">
                           <v-icon size="32" icon="mdi-cloud-upload" />
                           <div class="text-h6 font-weight-medium">Select Featured image</div>
                           <v-btn border class="mt-2">Browse</v-btn>
                        </div>
                     </v-card>
                  </v-card-text>
               </v-card>

               <v-card class="mb-3">
                  <v-card-text class="pb-0">
                     <v-label>Actions</v-label>
                  </v-card-text>
                  <v-card-actions>
                     <v-btn
                        type="submit"
                        color="primary"
                        :loading="saving"
                        block
                     >
                        {{ isEditing ? 'Update' : 'Create' }}
                        Blog
                     </v-btn>
                     <v-btn
                        variant="outlined"
                        class="mt-2"
                        to="/admin/blog"
                        block
                     >
                        Cancel
                     </v-btn>
                  </v-card-actions>
               </v-card>
            </v-col>
         </v-row>
      </v-form>

      <MediaSelector 
         v-model="showMediaSelector" 
         @select="(url, id) => handleImageSelected(url, id)" 
      />
   </v-container>
   
   <v-container v-else class="fill-height d-flex align-center justify-center">
      <v-progress-circular indeterminate color="primary" size="64" />
   </v-container>
</template>
