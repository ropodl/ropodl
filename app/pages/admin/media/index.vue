<script setup lang="ts">
import { VFileUpload } from "vuetify/labs/VFileUpload";
import useApiFetch from "~/utils/shared/useApiFetch";

definePageMeta({
   layout: "admin",
   middleware: ["is-auth"],
});

onMounted(() => {
   getMedia();
});

const media = ref<{ src?: string; fileUrl?: string }[]>([]);
const files = ref<File[]>([]);
const loading = ref(false);

const getMedia = async () => {
   await useApiFetch<any>("/media/")
      .then((res) => {
         console.log(res);
         media.value = res;
      })
      .catch((err) => {
         console.log(err);
      });
};

const uploadMedia = async () => {
   if (!files.value.length) return;

   loading.value = true;
   const formData = new FormData();
   console.log(files.value[0]);
   formData.append("file", files.value[0]);
   console.log(formData);

   // debugger;
   await useApiFetch<unkown>("/media/create", {
      method: "POST",
      body: formData,
      headers: {

      },
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

// Watch for file selection to trigger upload
watch(files, (newFiles) => {
   if (newFiles.length > 0) {
      uploadMedia();
   }
});
</script>
<template>
   <v-container>
      <v-row align="center">
         <v-col cols="12" md="4">
            <v-text-field hide-details/>
         </v-col>
         <v-spacer/>
         <v-col cols="12" md="6">
            <!-- Removed duplicate create button since file upload is prominent -->
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-file-upload
               v-model="files"
               density="compact"
               :loading="loading"
               title="Drag and drop or click to upload media"
            />
         </v-col>
      </v-row>
      <v-row>
         <template v-for="(item, index) in media" :key="index">
            <v-col cols="12" md="3">
               <!-- Support both legacy dummy data (src) and new DB data (fileUrl) -->
                {{ item }}
               <v-img
                  :src="item.fileUrl"
                  aspect-ratio="1"
                  cover
                  class="bg-grey-lighten-2 rounded-lg"
               />
            </v-col>
         </template>
      </v-row>
   </v-container>
</template>
