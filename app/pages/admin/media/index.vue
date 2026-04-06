<script setup lang="ts">
import { VFileUpload } from 'vuetify/labs/VFileUpload';
import useApiFetch from '~/utils/shared/useApiFetch';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const { showSnackbar } = useSnackbar();

onMounted(() => {
  getMedia();
});

const media = ref<any[]>([]);
const files = ref<File[]>([]);
const loading = ref(false);
const search = ref('');
const selectedItem = ref<any | null>(null);
const drawer = ref(false);
const saving = ref(false);

const getMedia = async () => {
  loading.value = true;
  await useApiFetch<any[]>('admin/media/', {
    query: { search: search.value },
  })
    .then((res) => {
      media.value = res;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

// Debounce search
let timeout: ReturnType<typeof setTimeout> | undefined;
watch(search, () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    getMedia();
  }, 500);
});

const uploadMedia = async () => {
  if (!files.value.length) return;

  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const file = files.value[0];
  if (!file) return;

  if (!allowedMimeTypes.includes(file.type)) {
    showSnackbar('File type not allowed', 'error');
    console.error('File type not allowed');
    files.value = [];
    return;
  }

  loading.value = true;
  const formData = new FormData();
  formData.append('file', file);

  await useApiFetch<unknown>('admin/media/create', {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      files.value = [];
      void getMedia();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const updateMedia = async () => {
  if (!selectedItem.value) return;
  saving.value = true;
  await useApiFetch(`admin/media/${selectedItem.value.id}`, {
    method: 'PATCH',
    body: {
      altText: selectedItem.value.altText,
      description: selectedItem.value.description,
    },
  })
    .then(() => {
      const index = media.value.findIndex(
        (m) => m.id === selectedItem.value.id
      );
      if (index !== -1) media.value[index] = { ...selectedItem.value };
      drawer.value = false;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      saving.value = false;
    });
};

const deleteMedia = async () => {
  if (!selectedItem.value) return;
  if (!confirm('Are you sure you want to delete this media?')) return;

  await useApiFetch(`admin/media/${selectedItem.value.id}`, {
    method: 'DELETE',
  })
    .then(() => {
      media.value = media.value.filter((m) => m.id !== selectedItem.value.id);
      drawer.value = false;
    })
    .catch((err) => {
      console.error(err);
    });
};

// Watch for file selection to trigger upload
watch(files, (newFiles) => {
  if (newFiles.length > 0) {
    uploadMedia();
  }
});

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const dialogState = ref<Record<number, boolean>>({});
const next = (currentIndex: number) => {
  dialogState.value[currentIndex] = false;
  setTimeout(() => {
    if (currentIndex < media.value.length - 1) {
      dialogState.value[currentIndex + 1] = true;
    }
  }, 200);
};

const prev = (currentIndex: number) => {
  dialogState.value[currentIndex] = false;
  setTimeout(() => {
    if (currentIndex > 0) {
      dialogState.value[currentIndex - 1] = true;
    }
  }, 200);
};
</script>

<template>
  <v-container class="admin-page">
    <section class="admin-hero">
      <div class="admin-hero__kicker">Media atelier</div>
      <div class="admin-hero__title">Turn the library into a visual workroom.</div>
      <div class="admin-hero__copy">
        Upload assets, review metadata, and keep the image catalog sharp enough for every page.
      </div>
    </section>

    <div class="admin-toolbar">
      <div class="admin-toolbar__search">
        <v-text-field
          v-model="search"
          placeholder="Search media..."
          prepend-inner-icon="carbon:search"
          hide-details
          variant="outlined"
          density="comfortable"
          rounded="xl"
          clearable
        />
      </div>
    </div>

    <section class="admin-upload-stage mb-6">
      <div class="admin-split-header mb-4">
        <div>
          <div class="admin-split-header__title">Upload stage</div>
          <div class="admin-upload-stage__caption">
            Drag in images or documents and they will move straight into the library below.
          </div>
        </div>
      </div>
      <div>
        <v-file-upload
          v-model="files"
          multiple
          density="compact"
          variant="dashed"
          :loading="loading"
          title="Drag and drop or click to upload media"
        />
      </div>
    </section>

    <template v-if="loading && media.length === 0">
      <div class="admin-media-grid">
        <div v-for="i in 8" :key="i">
          <v-skeleton-loader type="image" height="150" />
        </div>
      </div>
    </template>

    <template v-else-if="media.length > 0">
      <div class="admin-media-grid">
        <template v-for="(item, i) in media" :key="item.id">
          <v-dialog v-model="dialogState[i]" width="1000">
            <template #activator="{ props: activatorProps }">
              <v-card
                v-bind="activatorProps"
                hover
                class="admin-media-card"
              >
                <v-img
                  :src="item.fileUrl"
                  aspect-ratio="1"
                  cover
                  class="bg-grey-lighten-2"
                />
                <div class="admin-media-card__meta">
                  <div class="admin-media-card__title line-clamp-1">{{ item.filename }}</div>
                  <div class="admin-media-card__sub">
                    {{ formatBytes(item.sizeBytes) }} • {{ item.mimeType }}
                  </div>
                </div>
              </v-card>
            </template>
            <template #default="{ isActive }">
              <v-card class="admin-panel">
                <v-card-title class="d-flex align-center">
                  Asset inspector
                  <v-spacer />
                  <v-btn
                    size="small"
                    icon="mdi-arrow-left"
                    :disabled="i <= 0"
                    @click="prev(i)"
                  />
                  <v-btn
                    size="small"
                    icon="mdi-arrow-right"
                    :disabled="i >= media.length - 1"
                    @click="next(i)"
                  />
                  <v-btn
                    icon="mdi-close"
                    variant="text"
                    size="small"
                    @click="isActive.value = false"
                  />
                </v-card-title>
                <v-divider />
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="7">
                      <v-img
                        contain
                        :src="item.fileUrl"
                        class="bg-grey-lighten-3 rounded-xl mb-4"
                      />
                    </v-col>
                    <v-col cols="12" md="5">
                      <div class="admin-inspector">
                        <div class="admin-panel__title">Metadata</div>
                        <div class="admin-panel__copy" style="word-break: break-all">
                          {{ item.filename }}
                        </div>

                        <div class="mt-4 text-medium-emphasis">
                          <div><strong>Type:</strong> {{ item.mimeType }}</div>
                          <div><strong>Size:</strong> {{ formatBytes(item.sizeBytes) }}</div>
                          <div v-if="item.metadata?.dimensions">
                            <strong>Dimensions:</strong>
                            {{ item.metadata.dimensions.width }} ×
                            {{ item.metadata.dimensions.height }}
                          </div>
                          <div>
                            <strong>Uploaded:</strong>
                            {{ new Date(item.createdAt).toLocaleDateString() }}
                          </div>
                        </div>

                        <v-text-field
                          v-model="item.altText"
                          persistent-hint
                          placeholder="Alt Text"
                          hint="Describes the appearance and function of the image."
                          class="mt-5 mb-4"
                          rounded="xl"
                          variant="outlined"
                        />

                        <v-textarea
                          v-model="item.description"
                          placeholder="Description"
                          rows="3"
                          class="mb-4"
                          rounded="xl"
                          variant="outlined"
                        />

                        <div class="d-flex ga-2">
                          <v-btn
                            color="primary"
                            prepend-icon="mdi-content-save"
                            rounded="xl"
                            :loading="saving"
                            @click="
                              selectedItem = item;
                              updateMedia();
                            "
                          >
                            Save
                          </v-btn>
                          <v-btn
                            color="error"
                            variant="tonal"
                            rounded="xl"
                            prepend-icon="mdi-trash-can-outline"
                            @click="
                              selectedItem = item;
                              deleteMedia();
                            "
                          >
                            Delete
                          </v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </v-dialog>
        </template>
      </div>
    </template>

    <template v-else>
      <v-row class="mt-10">
        <v-col class="text-center">
          <v-icon size="64" color="grey">mdi-folder-open-outline</v-icon>
          <div class="text-h6 text-grey">No media files found</div>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
