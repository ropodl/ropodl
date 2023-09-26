<script setup>
const blog = useBlog()

definePageMeta({
    layout: "with-page-title",
});

onMounted(() => {
    blog.latest()
});
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4" v-for="item in blog.blogs">
                <v-card :to="'/blog/' + item['slug']">
                    <v-img cover height="200" :src="item['image'].url" :alt="item['image'].alt"></v-img>
                    <v-card-title>
                        {{ item['title'] }}
                    </v-card-title>
                    <v-card-text>
                        {{ item['excerpt'] }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-pagination></v-pagination>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped></style>