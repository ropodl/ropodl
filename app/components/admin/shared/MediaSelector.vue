<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import useApiFetch from '~/utils/shared/useApiFetch';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    multiple?: boolean;
  }>(),
  {
    multiple: false,
  }
);

const emit = defineEmits(['update:modelValue', 'select']);

const dialog = ref(props.modelValue);
const tab = ref('library');
const media = ref<any[]>([]);
const loading = ref(false);
const search = ref('');
const selectedItems = ref<any[]>([]);
const uploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// Helper to check if an item is selected
const isSelected = (item: any) => {
  return selectedItems.value.some((i) => i.id === item.id);
};

// Toggle selection logic
const toggleSelection = (item: any) => {
  if (props.multiple) {
    const index = selectedItems.value.findIndex((i) => i.id === item.id);
    if (index > -1) {
      selectedItems.value.splice(index, 1);
    } else {
      selectedItems.value.push(item);
    }
  } else {
    selectedItems.value = [item];
  }
};

watch(
  () => props.modelValue,
  (val) => {
    dialog.value = val;
    if (val) {
      if (media.value.length === 0) {
        fetchMedia();
      }
      // Reset selection when opening for single mode, or keep for multi?
      // Usually cleaner to reset unless specified otherwise.
      if (!props.multiple) selectedItems.value = [];
    }
  }
);

watch(dialog, (val) => {
  emit('update:modelValue', val);
});

const fetchMedia = async () => {
  loading.value = true;
  try {
    const res = await useApiFetch<any[]>('admin/media/', {
      query: { search: search.value },
    });
    media.value = res;
  } catch (err) {
    console.error('Failed to fetch media:', err);
  } finally {
    loading.value = false;
  }
};

// Debounce search
let timeout: any;
watch(search, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    fetchMedia();
  }, 500);
});

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  uploading.value = true;
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await useApiFetch<any>('admin/media/create', {
      method: 'POST',
      body: formData,
    });
    await fetchMedia();
    tab.value = 'library';
    const newItem = res.data || res;
    toggleSelection(newItem);
    if (!props.multiple) selectImage();
  } catch (err) {
    console.error('Upload failed:', err);
  } finally {
    uploading.value = false;
    if (fileInput.value) fileInput.value.value = '';
  }
};

const selectImage = () => {
  if (selectedItems.value.length > 0) {
    if (props.multiple) {
      emit(
        'select',
        selectedItems.value.map((item) => ({
          src: item.fileUrl,
          id: item.id,
          alt: item.altText,
        }))
      );
    } else {
      const item = selectedItems.value[0];
      emit('select', item.fileUrl, item.id);
    }
    dialog.value = false;
  }
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="1000" scrollable>
    <v-card class="media-selector-dialog">
      <v-card-title class="pa-0">
        <v-toolbar color="surface" density="compact">
          <v-toolbar-title class="text-h6 px-4">Media Selector</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="dialog = false">
            <Icon icon="tabler:x" />
          </v-btn>
        </v-toolbar>
        <v-tabs v-model="tab" color="primary" class="px-4 border-bottom">
          <v-tab value="upload">Upload Files</v-tab>
          <v-tab value="library">Media Library</v-tab>
        </v-tabs>
      </v-card-title>

      <v-card-text class="pa-0" style="height: 600px">
        <v-window v-model="tab" class="fill-height">
          <!-- Upload Tab -->
          <v-window-item value="upload" class="fill-height">
            <div
              class="upload-container d-flex flex-column align-center justify-center fill-height pa-8"
            >
              <v-icon size="64" color="grey-lighten-1" class="mb-4"
                >mdi-cloud-upload</v-icon
              >
              <div class="text-h6 mb-2">Drop files to upload</div>
              <div class="text-body-2 text-grey mb-6">or</div>
              <v-btn
                color="primary"
                variant="flat"
                :loading="uploading"
                @click="fileInput?.click()"
              >
                Select Files
              </v-btn>
              <input
                ref="fileInput"
                type="file"
                class="d-none"
                accept="image/*"
                @change="handleFileUpload"
              >
            </div>
          </v-window-item>

          <!-- Library Tab -->
          <v-window-item value="library" class="fill-height">
            <div class="d-flex fill-height overflow-hidden">
              <div class="flex-grow-1 d-flex flex-column bg-grey-lighten-4">
                <div class="pa-4 bg-surface border-bottom">
                  <v-text-field
                    v-model="search"
                    placeholder="Search media..."
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                    density="compact"
                    variant="outlined"
                    bg-color="surface"
                  />
                </div>
                <div class="media-grid pa-4 overflow-y-auto">
                  <v-row dense>
                    <v-col
                      v-for="item in media"
                      :key="item.id"
                      cols="4"
                      sm="3"
                      md="2"
                    >
                      <v-card
                        :class="[
                          'media-card',
                          { 'is-selected': isSelected(item) },
                        ]"
                        hover
                        flat
                        border
                        @click="toggleSelection(item)"
                      >
                        <v-img :src="item.fileUrl" aspect-ratio="1" cover>
                          <div
                            v-if="isSelected(item)"
                            class="selection-overlay"
                          >
                          <v-btn icon="carbon:check-circle">
                            <v-icon color="white">mdi-check-circle</v-icon>
                          </v-btn>
                          </div>
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                  <div v-if="loading" class="text-center pa-8">
                    <v-progress-circular indeterminate color="primary" />
                  </div>
                  <div
                    v-else-if="media.length === 0"
                    class="text-center pa-8 text-grey"
                  >
                    No media files found.
                  </div>
                </div>
              </div>

              <!-- Sidebar -->
              <div
                v-if="selectedItems.length > 0"
                class="details-sidebar border-left bg-surface overflow-y-auto pa-4"
              >
                <div class="text-subtitle-1 font-weight-bold mb-4">
                  Attachment Details
                </div>
                <!-- Show details for the last selected item -->
                <div v-if="selectedItems[selectedItems.length - 1] as any">
                  <v-img
                    :src="selectedItems[selectedItems.length - 1].fileUrl"
                    class="rounded mb-4 bg-grey-lighten-3"
                    max-height="200"
                    contain
                  />
                  <div class="text-caption">
                    <div class="mb-1">
                      <strong>File name:</strong>
                      {{ selectedItems[selectedItems.length - 1].filename }}
                    </div>
                    <div class="mb-1">
                      <strong>File type:</strong>
                      {{ selectedItems[selectedItems.length - 1].mimeType }}
                    </div>
                    <div class="mb-1">
                      <strong>File size:</strong>
                      {{
                        formatBytes(
                          selectedItems[selectedItems.length - 1].sizeBytes
                        )
                      }}
                    </div>
                    <div>
                      <strong>Uploaded on:</strong>
                      {{
                        new Date(
                          selectedItems[selectedItems.length - 1].createdAt
                        ).toLocaleDateString()
                      }}
                    </div>
                  </div>
                  <v-divider class="my-4" />
                  <v-text-field
                    v-model="selectedItems[selectedItems.length - 1].altText"
                    label="Alt Text"
                    variant="underlined"
                    density="compact"
                    hide-details
                    class="mb-2"
                  />
                  <v-textarea
                    v-model="
                      selectedItems[selectedItems.length - 1].description
                    "
                    label="Description"
                    variant="underlined"
                    rows="3"
                    density="compact"
                    hide-details
                  />
                </div>
              </div>
            </div>
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="text" class="mr-2" @click="dialog = false"
          >Cancel</v-btn
        >
        <v-btn
          color="primary"
          variant="flat"
          :disabled="selectedItems.length === 0"
          min-width="120"
          @click="selectImage"
        >
          {{
            multiple && selectedItems.length > 1
              ? `Select ${selectedItems.length} Images`
              : 'Select Image'
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.media-selector-dialog {
  display: flex;
  flex-direction: column;
}

.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}

.border-left {
  border-left: 1px solid #e0e0e0;
}

.media-grid {
  flex: 1;
}

.media-card {
  position: relative;
  transition: all 0.2s;

  &.is-selected {
    border: 3px solid rgb(var(--v-theme-primary));
  }

  .selection-overlay {
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.details-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.upload-container {
  border: 2px dashed #e0e0e0;
  margin: 20px;
  border-radius: 12px;
}
</style>
