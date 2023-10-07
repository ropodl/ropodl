<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
const tag = useTag();
definePageMeta({
    layout: "admin"
});

useHead({
    title: "Tags"
});

let headers = [
    {
        title: 'Title',
        align: 'start',
        sortable: false,
        key: 'title',
    },
    { title: 'Slug', align: 'end', key: 'slug' },
    { title: 'Description', align: 'end', key: 'description' }
];

onMounted(() => {
    nextTick(() => {
        tag.latest();
    });
});
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <div class="text-h4 font-weight-bold">
                    Tags
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field persistent-hint label="Tag Name"></v-text-field>
                <v-text-field persistent-hint label="Slug"></v-text-field>
                <v-textarea persistent-hint label="Tag Description"></v-textarea>
                <v-btn block height="50" variant="tonal" class="text-capitalize">Add New Tag</v-btn>
            </v-col>
            <v-col cols="12" md="8">
                <v-data-table :headers="headers" :items="tag.tags" item-value="name" class="elevation-1"></v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>