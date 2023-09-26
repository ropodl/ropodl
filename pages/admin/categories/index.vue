<script setup>
const category = useCategory()
definePageMeta({
    layout: "admin"
})

useHead({
    title: "Categories"
})

onMounted(() => {
    category.latest()
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
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <div class="text-h4 font-weight-bold">
                    Categories
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field placeholder="Category Name"></v-text-field>
                <v-text-field placeholder="Slug"></v-text-field>
                <v-textarea placeholder="Category Description"></v-textarea>
                <v-btn block height="50" variant="tonal" class="text-capitalize">Add New Category</v-btn>
            </v-col>
            <v-col cols="12" md="8">
                <v-data-table :headers="headers" :items="category.categories" item-value="name" class="elevation-1"></v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>


<style lang="scss" scoped></style>