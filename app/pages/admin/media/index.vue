<script setup lang="ts">
import useApiFetch from '~/utils/shared/useApiFetch'

definePageMeta({
    layout: "admin",
    middleware: ['is-auth']
})

onMounted(()=>{
    getMedia()
})

const media = ref([])
const getMedia = async () => {
    await useApiFetch('/media/')
    .then((res) => {
        console.log(res)
        media.value = res
    })
    .catch((err) => {
        console.log(err)
    })
}
</script>
<template>
    <v-container>
        <v-row align="center">
            <v-col cols="12" md="4">
                <v-text-field hide-details></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="6">
                <div class="d-flex justify-end w-100">
                    <v-btn color="primary">Create New</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <template v-for="(item, index) in media" :key="index">
                <v-col cols="12" md="3">
                    <v-img :src="item.src"></v-img>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>