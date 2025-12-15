<script lang="ts" setup>
definePageMeta({
    layout: "admin",
    middleware: ['is-auth']
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                Tags
            </v-col>
        </v-row>
    </v-container>
</template>