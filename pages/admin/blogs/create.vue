<script setup>
definePageMeta({
    layout: "admin"
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <div class="text-h4 font-weight-bold">Add New Blog</div>
            </v-col>
            <v-col cols="12" md="8">
                <v-text-field placeholder="Title"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mb-3">
                    <v-card-title>Featured Image</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="d-flex align-center justify-center" style="height: 200px;">
                        Drag and Drop a file
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-title>Actions</v-card-title>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<style lang="scss" scoped></style>