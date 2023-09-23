<script setup>
import { Icon } from '@iconify/vue';
import Editor from '@tinymce/tinymce-vue';

// const blog = useBlog()

definePageMeta({
    layout: "admin",
})

useHead({
    title: "Add New Blog"
})

const form = reactive({
    title: "",
    content: ""
})

const init = reactive({
    promotion: false,
    skin: "oxide-dark",
    content_css: "dark",
    theme: 'silver',
    plugins: 'lists link image table code help wordcount autoresize accordion advlist anchor autolink autosave charmap',
    toolbar_sticky: true,
    toolbar1: 'undo redo styles bold italic strikethrough forecolor backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat link image media code charmap restoredraft',
    branding: false,
    min_height: 500,
    /* enable title field in the Image dialog*/
    image_title: true,
    /* enable automatic uploads of images represented by blob or data URIs*/
    automatic_uploads: true,
    file_picker_types: 'image',
    file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                var id = 'blobid' + (new Date()).getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
        };
        input.click();
    },
});

const addBlog = () => {
    console.log("first")
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
                    <v-text-field placeholder="Title" v-model="form.title"></v-text-field>
                    <v-card class="ext-editor">
                        <client-only placeholder="Loading TinyMCE Cloud">
                            <Editor v-model="form.content" api-key="13zhwdufb9fbf9owvry9zsuazna4wwrt77wo2wje0tteg2b6" :init="init" />
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
                        <v-card-text class="d-flex align-center justify-center" style="height: 200px;">
                            Drag and Drop a file
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
}
</style>