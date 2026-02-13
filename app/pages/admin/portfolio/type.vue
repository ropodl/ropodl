<script setup lang="ts">
import type { PortfolioType } from '~/types/portfolio';
import { useApiFetch } from '~/utils/shared/useApiFetch';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const types = ref<PortfolioType[]>([]);
const loading = ref(true);
const search = ref('');
const dialog = ref(false);
const dialogLoading = ref(false);
const editingItem = ref<Partial<PortfolioType> | null>(null);

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Slug', key: 'slug' },
  { title: 'Description', key: 'description' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
];

const fetchTypes = async () => {
  loading.value = true;
  try {
    const data = await useApiFetch<PortfolioType[]>('admin/work-type');
    types.value = data;
  } catch (error) {
    console.error('Failed to fetch types', error);
  } finally {
    loading.value = false;
  }
};

const openDialog = (item: PortfolioType | null = null) => {
  editingItem.value = item ? { ...item } : { title: '', slug: '', description: '' };
  dialog.value = true;
};

const saveType = async () => {
  if (!editingItem.value?.title || !editingItem.value?.slug) return;
  
  dialogLoading.value = true;
  try {
    const isEditing = !!editingItem.value.id;
    const url = isEditing ? `admin/work-type/${editingItem.value.id}` : 'admin/work-type';
    const method = isEditing ? 'PATCH' : 'POST';
    
    await useApiFetch(url, {
      method,
      body: editingItem.value,
    });
    
    dialog.value = false;
    await fetchTypes();
  } catch (error) {
    console.error('Failed to save type', error);
  } finally {
    dialogLoading.value = false;
  }
};

const deleteType = async (id: number) => {
  if (!confirm('Are you sure you want to delete this work type?')) return;
  
  try {
    await useApiFetch(`admin/work-type/${id}`, { method: 'DELETE' });
    await fetchTypes();
  } catch (error) {
    console.error('Failed to delete type', error);
  }
};

// Auto-slugify
watch(() => editingItem.value?.title, (newTitle) => {
  if (editingItem.value && !editingItem.value.id && newTitle) {
    editingItem.value.slug = newTitle
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
});

onMounted(fetchTypes);

const filteredTypes = computed(() => {
  if (!search.value) return types.value;
  return types.value.filter(t => 
    t.title.toLowerCase().includes(search.value.toLowerCase()) ||
    t.slug.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <v-container>
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <div class="text-h4 font-weight-bold">Work Types</div>
        <div class="text-subtitle-1 text-medium-emphasis">Manage categories for your portfolio items</div>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
        <v-btn
          color="primary"
          prepend-icon="carbon:add"
          rounded="lg"
          @click="openDialog()"
        >
          Add New Type
        </v-btn>
      </v-col>
    </v-row>

    <v-card rounded="lg" elevation="0" border>
      <v-card-text>
        <v-text-field
          v-model="search"
          placeholder="Search work types..."
          prepend-inner-icon="carbon:search"
          hide-details
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-4"
        />

        <v-data-table
          :headers="headers"
          :items="filteredTypes"
          :loading="loading"
          hover
        >
          <template #[`item.description`]="{ value }">
            <span class="text-truncate d-inline-block" style="max-width: 300px;">
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
              @click="deleteType(item.id)"
            />
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card rounded="lg">
        <v-card-title class="pa-4 font-weight-bold">
          {{ editingItem?.id ? 'Edit Work Type' : 'Add New Work Type' }}
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-text-field
            v-model="editingItem!.title"
            label="Title"
            placeholder="e.g. Web Development"
            variant="outlined"
            rounded="lg"
            class="mb-2"
          />
          <v-text-field
            v-model="editingItem!.slug"
            label="Slug"
            placeholder="web-development"
            variant="outlined"
            rounded="lg"
            class="mb-2"
          />
          <v-textarea
            v-model="editingItem!.description"
            label="Description"
            placeholder="Briefly describe this category"
            variant="outlined"
            rounded="lg"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            variant="text"
            rounded="lg"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            rounded="lg"
            :loading="dialogLoading"
            @click="saveType"
          >
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
