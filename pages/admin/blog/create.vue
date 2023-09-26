<script setup>
import { Icon } from '@iconify/vue';
import Editor from '@tinymce/tinymce-vue';
import { tinymceConfig } from "../../../utils/tinymce";

const blog = useBlog()

definePageMeta({
    layout: "admin",
})

useHead({
    title: "Add New Blog"
})

const form = reactive({
    title: "",
    excerpt: "",
    content: "",
    image: null,
    visibility: "public",
    status: "published"
})

// temporary for thumbnail
const file = shallowRef()
const url = useObjectUrl(file)
// temporary for thumbnail

const selectFeaturedImage = ({ target }) => {
    const { value, files, name } = target;
    if (name === "image") {
        file.value = files[0]
        return form.image = files[0]
    }
}
const addBlog = () => {
    const formData = new FormData();
    for (const key in form) {
        const value = form[key];
        formData.append(key, value)
    }
    blog.create(formData)
}
</script>
<template>
    <v-container>
        <v-form @submit.prevent="addBlog">
            <v-row>
                <v-col cols="12">
                    <div class="text-h4 font-weight-bold">Add New Blog</div>
                </v-col>
                <v-col cols="12" md="8">
                    <v-text-field placeholder="Blog Title" v-model="form.title"></v-text-field>
                    <v-textarea placeholder="Blog Excerpt" v-model="form.excerpt"></v-textarea>
                    <v-card class="ext-editor">
                        <client-only placeholder="Loading TinyMCE Cloud">
                            <Editor v-model="form.content" placeholder="Blog Content" api-key="13zhwdufb9fbf9owvry9zsuazna4wwrt77wo2wje0tteg2b6" :init="tinymceConfig" />
                        </client-only>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="mb-3">
                        <v-card-title>Actions</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <ul>
                                <li class="d-flex align-center mb-4">
                                    <v-icon start>
                                        <Icon icon="mdi:key" />
                                    </v-icon>
                                    <span>Status: Draft</span>
                                </li>
                                <li class="d-flex align-center mb-4">
                                    <v-icon start>
                                        <Icon icon="mdi:eye" />
                                    </v-icon>
                                    <span>Visibility: Public</span>
                                </li>
                                <li class="d-flex align-center">
                                    <v-icon start>
                                        <Icon icon="mdi:calendar" />
                                    </v-icon>
                                    <span>Publish: immediately</span>
                                </li>
                            </ul>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions class="justify-space-between">
                            <v-btn class="text-capitalize px-5" color="error" variant="text">Move to Trash</v-btn>
                            <v-btn rounded="sm" class="text-capitalize px-5" variant="flat" type="submit">Publish</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card class="mb-3">
                        <v-card-title>Categories</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>Categories</v-card-text>
                    </v-card>
                    <v-card class="mb-3">
                        <v-card-title>Tags</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>Tags</v-card-text>
                    </v-card>
                    <v-card class="mb-3">
                        <v-card-title>Featured Image</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="d-flex align-center justify-center position-relative pa-0">
                            <template v-if="form.image !== null">
                                <v-hover v-slot="{ isHovering, props }">
                                    <v-img v-bind="props" :src="url" height="200">
                                        <v-overlay contained :model-value="isHovering" content-class="w-100 h-100 d-flex align-center justify-center" scrim="black">
                                            <v-btn icon color="error" @click="form.image = null">
                                                <Icon icon="mdi:close" />
                                            </v-btn>
                                        </v-overlay>
                                    </v-img>
                                </v-hover>
                            </template>
                            <template v-else>
                                <input @change="selectFeaturedImage" type="file" name="image" class="py-4" />
                            </template>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>


<style lang="scss">
.ext-editor {
    .tox-tinymce {
        border: 0px;
        border-radius: 0;
    }

    .tox:not(.tox-tinymce-inline) .tox-editor-header {
        background-color: unset;
    }

    .tox .tox-menubar {
        background-color: unset;
    }

    .tox .tox-toolbar-overlord {
        background-color: unset !important;
    }

    .tox .tox-toolbar,
    .tox .tox-toolbar__overflow,
    .tox .tox-toolbar__primary {
        background-color: unset !important;
    }

    .tox-edit-area iframe.tox-edit-area__iframe body#tinymce.mce-content-body {
        background-color: rgb(var(--v-theme-surface)) !important;
    }

    .tox-statusbar {
        background-color: unset;
    }
}
</style>