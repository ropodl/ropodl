<script lang="ts" setup>
import { VFileUpload } from 'vuetify/labs/VFileUpload';
import useApiFetch from '~/utils/shared/useApiFetch';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const files = ref<File[]>([]);
const loading = ref(false);
const router = useRouter();
const { showSnackbar } = useSnackbar();

const selectedFile = computed(() => files.value[0] || null);

const acceptedTypes = [
  'JPG',
  'PNG',
  'WEBP',
  'GIF',
  'PDF',
  'DOCX',
];

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const uploadMedia = async () => {
  const file = files.value[0];

  if (!file) return;

  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('file', file);

    await useApiFetch('admin/media/create', {
      method: 'POST',
      body: formData,
    });

    showSnackbar('Media uploaded successfully', 'success');
    await router.push('/admin/media');
  } catch (error: any) {
    showSnackbar(error?.message || 'Failed to upload media', 'error');
  } finally {
    loading.value = false;
  }
};

watch(files, (newFiles) => {
  if (newFiles.length > 0) {
    void uploadMedia();
  }
});
</script>
<template>
  <v-container class="admin-page">
    <section class="admin-hero">
      <div class="admin-hero__kicker">Media</div>
      <div class="admin-hero__title">Upload Assets</div>
      <div class="admin-hero__copy">Drop one file, review it quickly, and send it to the library.</div>
    </section>

    <div class="admin-upload-layout">
      <v-card class="admin-panel">
        <v-card-text class="pa-4">
          <div class="admin-split-header mb-3">
            <div>
              <div class="admin-split-header__title">Drop zone</div>
              <div class="admin-upload-stage__caption">
                Upload starts automatically after file selection.
              </div>
            </div>
          </div>

          <div class="admin-upload-stage">
            <v-file-upload
              v-model="files"
              :multiple="false"
              density="compact"
              variant="dashed"
              :loading="loading"
              title="Drag and drop or click to upload"
            />
          </div>
        </v-card-text>
      </v-card>

      <v-card class="admin-panel">
        <v-card-text class="pa-4">
          <div class="admin-panel__title">Upload summary</div>
          <div class="admin-panel__copy">
            A quick check before the file enters the media library.
          </div>

          <div class="admin-upload-summary mt-4" v-if="selectedFile">
            <div class="admin-upload-summary__item">
              <span>Name</span>
              <strong class="line-clamp-1">{{ selectedFile.name }}</strong>
            </div>
            <div class="admin-upload-summary__item">
              <span>Type</span>
              <strong>{{ selectedFile.type || 'Unknown' }}</strong>
            </div>
            <div class="admin-upload-summary__item">
              <span>Size</span>
              <strong>{{ formatBytes(selectedFile.size) }}</strong>
            </div>
          </div>
          <div v-else class="admin-upload-empty mt-4">
            Choose a file to see its details here.
          </div>

          <v-divider class="my-4" />

          <div class="admin-panel__title">Accepted files</div>
          <div class="admin-chip-cloud mt-3">
            <v-chip
              v-for="type in acceptedTypes"
              :key="type"
              size="small"
              variant="outlined"
            >
              {{ type }}
            </v-chip>
          </div>

          <v-divider class="my-4" />

          <div class="admin-panel__title">Flow</div>
          <div class="admin-mini-feed mt-3">
            <div class="admin-mini-feed__item">
              <span>1</span>
              <strong>Select one file</strong>
            </div>
            <div class="admin-mini-feed__item">
              <span>2</span>
              <strong>Auto-upload begins</strong>
            </div>
            <div class="admin-mini-feed__item">
              <span>3</span>
              <strong>Redirect to media library</strong>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
