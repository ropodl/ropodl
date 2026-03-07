<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useApiFetch } from '~/utils/shared/useApiFetch';
import { useAuth } from '~/composables/admin/auth/useAuth';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

interface BlogTag {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
}

const tags = ref<BlogTag[]>([]);
const loading = ref(true);
const search = ref('');
const dialog = ref(false);
const dialogLoading = ref(false);
const editingItem = ref<Partial<BlogTag> | null>(null);
const { can } = useAuth();

const headers = [
  { title: 'Tag Name', key: 'title' },
  { title: 'Slug', key: 'slug' },
  { title: 'Description', key: 'excerpt' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
] as const;

const fetchTags = async () => {
  loading.value = true;
  try {
    const data = await useApiFetch<BlogTag[]>('admin/blog/tag');
    tags.value = data;
  } catch (error) {
    console.error('Failed to fetch tags', error);
  } finally {
    loading.value = false;
  }
};

const openDialog = (item: BlogTag | null = null) => {
  editingItem.value = item ? { ...item } : { title: '', slug: '', excerpt: '' };
  dialog.value = true;
};

const saveTag = async () => {
  if (!editingItem.value?.title || !editingItem.value?.slug) return;

  dialogLoading.value = true;
  try {
    const isEditing = !!editingItem.value.id;
    const url = isEditing
      ? `admin/blog/tag/${editingItem.value.id}`
      : 'admin/blog/tag';
    const method = isEditing ? 'PATCH' : 'POST';

    await useApiFetch(url, {
      method,
      body: editingItem.value,
    });

    dialog.value = false;
    await fetchTags();
  } catch (error) {
    console.error('Failed to save tag', error);
  } finally {
    dialogLoading.value = false;
  }
};

const deleteTag = async (id: number) => {
  if (!confirm('Are you sure you want to delete this tag?')) return;

  try {
    await useApiFetch(`admin/blog/tag/${id}`, { method: 'DELETE' });
    await fetchTags();
  } catch (error) {
    console.error('Failed to delete tag', error);
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

onMounted(fetchTags);

const filteredTags = computed(() => {
  if (!search.value) return tags.value;
  return tags.value.filter(
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
        <div class="text-h4 font-weight-bold">Blog Tags</div>
        <div class="text-subtitle-1 text-medium-emphasis">
          Keywords to help readers find content
        </div>
      </v-col>
      <v-col v-if="can('blog.tag.create')" cols="12" md="6" class="text-right">
        <v-btn
          color="primary"
          prepend-icon="carbon:tag"
          rounded="lg"
          @click="openDialog()"
        >
          Add New Tag
        </v-btn>
      </v-col>
    </v-row>

    <v-card rounded="lg" elevation="0" border>
      <v-card-text>
        <v-text-field
          v-model="search"
          placeholder="Search tags..."
          prepend-inner-icon="carbon:search"
          hide-details
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-4"
        />

        <v-data-table
          :headers="headers"
          :items="filteredTags"
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
              v-if="can('blog.tag.update')"
              icon="carbon:edit"
              variant="text"
              size="small"
              rounded="lg"
              color="primary"
              class="mr-1"
              @click="openDialog(item)"
            />
            <v-btn
              v-if="can('blog.tag.delete')"
              icon="carbon:trash-can"
              variant="text"
              size="small"
              rounded="lg"
              color="error"
              @click="deleteTag(item.id)"
            />
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card rounded="lg">
        <v-card-title class="pa-4 font-weight-bold">
          {{ editingItem?.id ? 'Edit Tag' : 'Add New Tag' }}
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-text-field
            v-model="editingItem!.title"
            label="Tag name"
            placeholder="e.g. Frontend"
            variant="outlined"
            rounded="lg"
            class="mb-2"
          />
          <v-text-field
            v-model="editingItem!.slug"
            label="Slug"
            placeholder="frontend"
            variant="outlined"
            rounded="lg"
            class="mb-2"
          />
          <v-textarea
            v-model="editingItem!.excerpt"
            label="Description"
            placeholder="Briefly describe this tag"
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
            @click="saveTag"
          >
            Save Tag
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
