<script setup>
definePageMeta({
    layout: "admin"
})

useHead({
    title: "Categories"
})


let headers = [
    {
        title: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        key: 'name',
    },
    { title: 'Calories', align: 'end', key: 'calories' },
    { title: 'Fat (g)', align: 'end', key: 'fat' },
    { title: 'Carbs (g)', align: 'end', key: 'carbs' },
    { title: 'Protein (g)', align: 'end', key: 'protein' },
    { title: 'Iron (%)', align: 'end', key: 'iron' },
];
let desserts = [
    {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1',
    },
    {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0',
    },
    {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6',
    },
    {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7',
    },
    {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16',
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1',
    },
    {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2',
    },
    {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8',
    },
    {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45',
    },
    {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22',
    },
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
                <v-data-table :headers="headers" :items="desserts" item-value="name" class="elevation-1"></v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>


<style lang="scss" scoped></style>