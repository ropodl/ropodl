<script setup lang="ts">
import { VFileUpload } from "vuetify/labs/VFileUpload";
import { useAuth } from "~/composables/admin/auth/useAuth";
import useApiFetch from "~/utils/shared/useApiFetch";

definePageMeta({
   layout: "admin",
   middleware: ["is-auth"],
});

const { can } = useAuth()
const { showSnackbar } = useSnackbar()

onMounted(() => {
   getMedia();
});

const media = ref<any[]>([]);
const files = ref<File[]>([]);
const loading = ref(false);
const search = ref("");
const selectedItem = ref<any | null>(null);
const drawer = ref(false);
const saving = ref(false);

const getMedia = async () => {
   loading.value = true;
   await useApiFetch<any[]>("media/", {
       query: { search: search.value }
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
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'text/plain', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
   ];

   const file = files.value[0];
   if (!file) return;

   if (!allowedMimeTypes.includes(file.type)) {
        showSnackbar("File type not allowed", "error")
      console.error('File type not allowed');
      files.value = [];
      return;
   }

   loading.value = true;
   const formData = new FormData();
   formData.append("file", file);

   await useApiFetch<unknown>("media/create", {
      method: "POST",
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

const openDetails = (item: any) => {
    selectedItem.value = { ...item };
    drawer.value = true;
};

const updateMedia = async () => {
    if (!selectedItem.value) return;
    saving.value = true;
    await useApiFetch(`media/${selectedItem.value.id}`, {
        method: 'PATCH',
        body: {
            altText: selectedItem.value.altText,
            description: selectedItem.value.description
        }
    }).then(() => {
        const index = media.value.findIndex(m => m.id === selectedItem.value.id);
        if (index !== -1) media.value[index] = { ...selectedItem.value };
        drawer.value = false;
    }).catch(err => {
        console.error(err);
    }).finally(() => {
        saving.value = false;
    });
};

const deleteMedia = async () => {
    if (!selectedItem.value) return;
    if (!confirm('Are you sure you want to delete this media?')) return;

    await useApiFetch(`media/${selectedItem.value.id}`, {
        method: 'DELETE'
    }).then(() => {
        media.value = media.value.filter(m => m.id !== selectedItem.value.id);
        drawer.value = false;
    }).catch(err => {
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
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
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
         <v-spacer/>
      </v-row>

      <v-row>
         <v-col cols="12">
            <v-file-upload
               v-model="files"
               density="compact"
               variant="dashed"
               :loading="loading"
               title="Drag and drop or click to upload media"
            />
         </v-col>
      </v-row>

      <v-row v-if="loading && media.length === 0">
          <v-col v-for="i in 8" :key="i" cols="6" sm="4" md="2">
              <v-skeleton-loader type="image" height="150" />
          </v-col>
      </v-row>

      <v-row v-else-if="media.length > 0">
         <v-col v-for="item in media" :key="item.id" cols="6" sm="4" md="2">
            <v-card
                hover
                class="rounded-lg overflow-hidden"
                height="150"
                @click="openDetails(item)"
            >
               <v-img
                  :src="item.fileUrl"
                  aspect-ratio="1"
                  cover
                  class="bg-grey-lighten-2"
               >
                  <template #placeholder>
                      <v-row align="center" class="fill-height ma-0" justify="center">
                          <v-icon color="grey-lighten-1" size="48">mdi-file-outline</v-icon>
                      </v-row>
                  </template>
               </v-img>
            </v-card>
         </v-col>
      </v-row>

      <v-row v-else class="mt-10">
          <v-col class="text-center">
              <v-icon size="64" color="grey">mdi-folder-open-outline</v-icon>
              <div class="text-h6 text-grey">No media files found</div>
          </v-col>
      </v-row>

      <!-- Details Sidebar -->
      <v-navigation-drawer
          v-model="drawer"
          location="right"
          temporary
          width="400"
          touchless
      >
          <div v-if="selectedItem" class="pa-4 flex-column d-flex fill-height">
              <div class="d-flex align-center mb-4">
                  <div class="text-h6">Attachment Details</div>
                  <v-spacer />
                  <v-btn icon="mdi-close" variant="text" @click="drawer = false" />
              </div>

              <v-img
                  :src="selectedItem.fileUrl"
                  class="bg-grey-lighten-3 rounded-lg mb-4"
                  max-height="250"
                  contain
              />

              <div class="text-caption text-grey-darken-1 mb-2">
                  <div><strong>Filename:</strong> {{ selectedItem.filename }}</div>
                  <div><strong>File type:</strong> {{ selectedItem.mimeType }}</div>
                  <div><strong>File size:</strong> {{ formatBytes(selectedItem.sizeBytes) }}</div>
                  <div v-if="selectedItem.metadata?.dimensions">
                      <strong>Dimensions:</strong> {{ selectedItem.metadata.dimensions.width }} &times; {{ selectedItem.metadata.dimensions.height }} pixels
                  </div>
                  <div><strong>Uploaded on:</strong> {{ new Date(selectedItem.createdAt).toLocaleDateString() }}</div>
              </div>

              <v-divider class="my-4" />

              <v-text-field
                  v-model="selectedItem.altText"
                  label="Alt Text"
                  hint="Describes the appearance and function of the image."
                  persistent-hint
                  variant="underlined"
                  class="mb-4"
              />

              <v-textarea
                  v-model="selectedItem.description"
                  label="Description"
                  variant="underlined"
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
                      v-if="can('media.delete')"
                      color="error"
                      variant="tonal"
                      prepend-icon="mdi-trash-can-outline"
                      @click="deleteMedia"
                  >
                      Delete
                  </v-btn>
              </div>
          </div>
      </v-navigation-drawer>
   </v-container>
</template>

<style scoped>
.v-card {
    transition: transform 0.2s ease;
}
.v-card:hover {
    transform: scale(1.02);
}
</style>
