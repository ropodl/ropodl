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
  await useApiFetch<any[]>('media/', {
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
let timeout: any;
watch(search, () => {
  clearTimeout(timeout);
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

  await useApiFetch<unknown>('media/create', {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      files.value = [];
      getMedia();
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
  await useApiFetch(`media/${selectedItem.value.id}`, {
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

  await useApiFetch(`media/${selectedItem.value.id}`, {
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
  <v-container>
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          placeholder="Search media..."
          prepend-inner-icon="carbon:search"
          hide-details
          variant="outlined"
          density="compact"
          clearable
        />
      </v-col>
      <v-spacer />
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-file-upload
          v-model="files"
          multiple
          density="compact"
          variant="dashed"
          :loading="loading"
          title="Drag and drop or click to upload media"
        />
      </v-col>
    </v-row>

    <template v-if="loading && media.length === 0">
      <v-row>
        <v-col v-for="i in 8" :key="i" cols="6" sm="4" md="2">
          <v-skeleton-loader type="image" height="150" />
        </v-col>
      </v-row>
    </template>

    <template v-else-if="media.length > 0">
      <v-row>
        <template v-for="(item, i) in media" :key="item.id">
          <v-col cols="6" sm="4" md="3">
            <v-dialog v-model="dialogState[i]" width="1000">
              <template #activator="{ props: activatorProps }">
                <v-card
                  v-bind="activatorProps"
                  hover
                  class="rounded-lg overflow-hidden"
                  height="200"
                >
                  <v-img
                    :src="item.fileUrl"
                    aspect-ratio="1"
                    cover
                    class="bg-grey-lighten-2"
                  >
                    <template #placeholder>
                      <v-row
                        align="center"
                        class="fill-height ma-0"
                        justify="center"
                      >
                        <v-icon color="grey-lighten-1" size="48">
                          mdi-file-outline
                        </v-icon>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </template>
              <template #default="{ isActive }">
                <v-card color="background">
                  <v-card-title class="d-flex align-center bg-surface">
                    Attachment Details
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
                      <v-col cols="7">
                        <v-img
                          contain
                          :src="item.fileUrl"
                          class="bg-grey-lighten-3 rounded-lg mb-4"
                        />
                      </v-col>
                      <v-divider :vertical="true" />
                      <v-col cols="5">
                        <div
                          class="text-grey-darken-1 mb-2"
                          style="word-break: break-all"
                        >
                          <div>
                            <strong>Filename:</strong> {{ item.filename }}
                          </div>
                          <div>
                            <strong>File type:</strong> {{ item.mimeType }}
                          </div>
                          <div>
                            <strong>File size:</strong>
                            {{ formatBytes(item.sizeBytes) }}
                          </div>
                          <div v-if="item.metadata?.dimensions">
                            <strong>Dimensions:</strong>
                            {{ item.metadata.dimensions.width }} &times;
                            {{ item.metadata.dimensions.height }} pixels
                          </div>
                          <div>
                            <strong>Uploaded on:</strong>
                            {{ new Date(item.createdAt).toLocaleDateString() }}
                          </div>
                        </div>

                        <v-text-field
                          v-model="item.altText"
                          persistent-hint
                          placeholder="Alt Text"
                          hint="Describes the appearance and function of the image."
                          class="mb-4"
                        />

                        <v-textarea
                          v-model="item.description"
                          placeholder="Description"
                          rows="3"
                          class="mb-4"
                        />

                        <v-spacer />

                        <div class="d-flex ga-2">
                          <v-btn
                            color="primary"
                            prepend-icon="mdi-content-save"
                            :loading="saving"
                            @click="updateMedia"
                          >
                            Save Changes
                          </v-btn>
                          <v-btn
                            color="error"
                            variant="tonal"
                            prepend-icon="mdi-trash-can-outline"
                            @click="deleteMedia"
                          >
                            Delete
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </template>
      </v-row>
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
