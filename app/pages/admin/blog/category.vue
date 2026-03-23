<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useApiFetch } from '~/utils/shared/useApiFetch';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

interface BlogCategory {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
}

const categories = ref<BlogCategory[]>([]);
const loading = ref(true);
const search = ref('');
const dialog = ref(false);
const dialogLoading = ref(false);
const editingItem = ref<Partial<BlogCategory> | null>(null);

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Slug', key: 'slug' },
  { title: 'Description', key: 'excerpt' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
] as const;

const fetchCategories = async () => {
  loading.value = true;
  try {
    const data = await useApiFetch<BlogCategory[]>('admin/blog/category');
    categories.value = data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
  } finally {
    loading.value = false;
  }
};

const openDialog = (item: BlogCategory | null = null) => {
  editingItem.value = item ? { ...item } : { title: '', slug: '', excerpt: '' };
  dialog.value = true;
};

const saveCategory = async () => {
  if (!editingItem.value?.title || !editingItem.value?.slug) return;

  dialogLoading.value = true;
  try {
    const isEditing = !!editingItem.value.id;
    const url = isEditing
      ? `admin/blog/category/${editingItem.value.id}`
      : 'admin/blog/category';
    const method = isEditing ? 'PATCH' : 'POST';

    await useApiFetch(url, {
      method,
      body: editingItem.value,
    });

    dialog.value = false;
    await fetchCategories();
  } catch (error) {
    console.error('Failed to save category', error);
  } finally {
    dialogLoading.value = false;
  }
};

const deleteCategory = async (id: number) => {
  if (!confirm('Are you sure you want to delete this category?')) return;

  try {
    await useApiFetch(`admin/blog/category/${id}`, { method: 'DELETE' });
    await fetchCategories();
  } catch (error) {
    console.error('Failed to delete category', error);
  }
};

// Auto-slugify
watch(
  () => editingItem.value?.title,
  (newTitle) => {
    if (editingItem.value && !editingItem.value.id && newTitle) {
      editingItem.value.slug = newTitle
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }
  }
);

onMounted(fetchCategories);

const filteredCategories = computed(() => {
  if (!search.value) return categories.value;
  return categories.value.filter(
    (t) =>
      t.title.toLowerCase().includes(search.value.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <v-container>
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <div class="text-h4 font-weight-bold">Blog Categories</div>
        <div class="text-subtitle-1 text-medium-emphasis">
          Organize your stories by topic
        </div>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
        <v-btn
          color="primary"
          prepend-icon="carbon:add"
          rounded="lg"
          @click="openDialog()"
        >
          Add New Category
        </v-btn>
      </v-col>
    </v-row>

    <v-card rounded="lg" elevation="0" border>
      <v-card-text>
        <v-text-field
          v-model="search"
          placeholder="Search categories..."
          prepend-inner-icon="carbon:search"
          hide-details
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-4"
        />

        <v-data-table
          :headers="headers"
          :items="filteredCategories"
          :loading="loading"
          hover
        >
          <template #[`item.excerpt`]="{ value }">
            <span class="text-truncate d-inline-block" style="max-width: 300px">
              {{ value || '-' }}
            </span>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-btn
              icon="carbon:edit"
              variant="text"
              size="small"
              rounded="lg"
              color="primary"
              class="mr-1"
              @click="openDialog(item)"
            />
            <v-btn
              icon="carbon:trash-can"
              variant="text"
              size="small"
              rounded="lg"
              color="error"
              @click="deleteCategory(item.id)"
            />
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card rounded="lg">
        <v-card-title class="pa-4 font-weight-bold">
          {{ editingItem?.id ? 'Edit Category' : 'Add New Category' }}
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-text-field
            v-model="editingItem!.title"
            label="Title"
            placeholder="e.g. Technology"
            variant="outlined"
            rounded="lg"
            class="mb-2"
          />
          <v-text-field
            v-model="editingItem!.slug"
            label="Slug"
            placeholder="technology"
            variant="outlined"
            rounded="lg"
            class="mb-2"
          />
          <v-textarea
            v-model="editingItem!.excerpt"
            label="Description"
            placeholder="Briefly describe this category"
            variant="outlined"
            rounded="lg"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" rounded="lg" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            rounded="lg"
            :loading="dialogLoading"
            @click="saveCategory"
          >
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
