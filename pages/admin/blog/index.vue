<script setup>
const blog = useBlog()

definePageMeta({
    layout: "admin"
})

useHead({
    title: "All Blogs"
})

const loading = ref(true)

onMounted(() => {
    // nextTick(() => {
    callLatestBlogs()
    // })
    loading.value = false
});

const headers = reactive([
    { title: "Featured Image", sortable: false, key: "image", width: 200 },
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

const callLatestBlogs = () => {
    blog.latest()
    loading.value = false
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6">
                <div class="text-h4 font-weight-bold">Blogs</div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="d-flex flex-wrap justify-end align-center">
                    <v-btn variant="tonal" class="text-capitalize" to="/admin/blog/create">
                        Add new Blog
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="headers" :items="blog.blogs" :loading="loading" item-value="name">
                    <template v-slot:item.image="{ item }">
                        <div class="py-3" style="width:200px;height: 150px;">
                            <v-img cover class="w-100 h-100" :src="item.raw.image.url"></v-img>
                        </div>
                    </template>
                    <template v-slot:item.title="{ item }">
                        <v-card-title>{{ item.raw.title }}</v-card-title>
                        <v-card-text>Excerpt</v-card-text>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <!-- {{ item.raw }} -->
                        <v-btn icon size="x-small" variant="tonal" class="mr-2" :to="`/admin/blog/${item.raw.slug}`">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-dialog persistent scrim="black" width="500">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon color="error" size="x-small" variant="tonal">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <v-card title="Delete Blog">
                                    <v-card-text class="mb-3">
                                        Are you sure you want to delete "{{ item.raw.title }}"? This action cannot be undone.
                                    </v-card-text>
                                    <v-card-text class="pa-0">
                                        <v-row no-gutters>
                                            <v-col cols="6">
                                                <v-btn block rounded="0" variant="tonal" color="success" height="50" text="Cancel" class="text-capitalize" @click="isActive.value = false"></v-btn>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-btn block rounded="0" variant="tonal" color="error" height="50" text="Delete" class="text-capitalize" @click="blog.remove(item.raw.id)"></v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </template>
                        </v-dialog>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>