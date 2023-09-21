<script setup>
definePageMeta({
    layout: "admin"
})

const headers = reactive([
    {
        title: "Title",
        align: "start",
        sortable: false,
        key: "title",
    },
    { title: "Categories", align: "end", key: "categories" },
    { title: "Tags", align: "end", key: "tags" },
    { title: "Actions", align: "center", key: "actions" },
]);

const desserts = reactive([
    {
        title: "Frozen Yogurt",
        categories: 159,
        tags: 6.0,
    },
    {
        title: "Jelly bean",
        categories: 375,
        tags: 0.0,
    },
    {
        title: "KitKat",
        categories: ['518', 'asdsd'],
        tags: 26.0,
    },
    {
        title: "Eclair",
        categories: 262,
        tags: 16.0,
    },
    {
        title: "Gingerbread",
        categories: 356,
        tags: 16.0,
    },
]);
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <div class="text-h4 font-weight-bold">Blogs</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="headers" :items="desserts" item-value="name">
                    <template v-slot:item.actions="{ item }">
                        {{ item.raw }}
                        <v-btn icon variant="tonal" class="mr-2">
                            <v-icon size="small">
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                        <v-btn icon variant="tonal">
                            <v-icon size="small">
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>