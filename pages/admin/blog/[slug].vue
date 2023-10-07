<script setup>
import { Icon } from '@iconify/vue';
import Editor from '@tinymce/tinymce-vue';
import { tinymceConfig } from "../../../utils/tinymce";

const blog = useBlog()
const category = useCategory()
const tag = useTag()
const route = useRoute()

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
    categories: [],
    tags: [],
    image: null,
    visibility: "Public",
    status: "Draft"
})
// Image Upload
const file = shallowRef()
const url = useObjectUrl(file)
// Image Upload

let postId = ref("")
onMounted(() => {
    nextTick(async () => {
        // Call blog with slug
        const res = await blog.getBlog(route.params.slug);
        // Format categories to array and store in form
        const categories = res.blog.categories.map(category => {
            const { _id } = category;
            return _id;
        });
        // Format tags to array and store in form
        const tags = res.blog.tags.map(tag => {
            const { _id } = tag;
            return _id;
        });
        Object.assign(form, {
            title: res.blog.title,
            excerpt: res.blog.excerpt,
            content: res.blog.content,
            categories: categories,
            tags: tags,
            visibility: res.blog.visibility,
            status: res.blog.status,
            image: res.blog.featuredImage.url
        })
        postId.value = res.blog._id
        category.latest();
        tag.latest();
    })
});

// temporary for thumbnail
const selectFeaturedImage = ({ target }) => {
    const { value, files, name } = target;
    if (name === "image") {
        file.value = files[0]
        return form.image = files[0]
    }
}
const updateBlog = () => {
    const formData = new FormData();
    for (const key in form) {
        const value = form[key];
        formData.append(key, value)
    }
    blog.updateBlog(formData, postId.value);
}

const searchCategories = () => {
    alert("test")
}

let statusEdit = ref(false)
let statusTemp = ref("Draft")
let visibilityEdit = ref(false)
let visibilityTemp = ref("Public")
</script>
<template>
    <v-container>
        <v-form @submit.prevent="updateBlog">
            <v-row>
                <v-col cols="12">
                    <div class="text-h4 font-weight-bold">Edit Blog</div>
                </v-col>
                <v-col cols="12" md="8">
                    <v-text-field label="Blog Title" v-model="form.title"></v-text-field>
                    <v-card flat rounded="0" class="ext-editor mb-10">
                        <client-only placeholder="Loading TinyMCE Cloud">
                            <Editor v-model="form.content" placeholder="Blog Content" api-key="13zhwdufb9fbf9owvry9zsuazna4wwrt77wo2wje0tteg2b6" :init="tinymceConfig" />
                        </client-only>
                    </v-card>
                    <v-textarea label="Blog Excerpt" v-model="form.excerpt"></v-textarea>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="mb-3">
                        <v-card-title>Actions</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <ul class="list-style-none">
                                <v-hover v-slot="{ isHovering, props }">
                                    <li class="d-flex align-center justify-space-between mb-3" v-bind="props">
                                        <div>
                                            <v-icon start>
                                                <Icon icon="mdi:key" />
                                            </v-icon>
                                            Status: <span class="text-capitalize">{{ form.status }}</span>
                                        </div>
                                        <template v-if="isHovering && statusEdit == false">
                                            <v-btn variant="tonal" size="x-small" class="text-capitalize px-5" @click="statusEdit = true">Edit</v-btn>
                                        </template>
                                    </li>
                                </v-hover>
                                <div v-auto-animate>
                                    <template v-if="statusEdit">
                                        <div class="mb-3">
                                            <v-select v-model="statusTemp" :items="['Draft', 'Published']"></v-select>
                                            <div class="d-flex justify-space-between">
                                                <v-btn variant="tonal" class="text-capitalize" @click="() => { form.status = statusTemp; statusEdit = false }">OK</v-btn>
                                                <v-btn variant="tonal" class="text-capitalize" @click="() => { statusTemp = 'Draft'; statusEdit = false }">Cancel</v-btn>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <v-hover v-slot="{ isHovering, props }">
                                    <li class="d-flex align-center justify-space-between mb-3" v-bind="props">
                                        <div>
                                            <v-icon start>
                                                <Icon icon="mdi:eye" />
                                            </v-icon>
                                            Visibility: <span class="text-capitalize">{{ form.visibility }}</span>
                                        </div>
                                        <template v-if="isHovering && visibilityEdit == false">
                                            <v-btn variant="tonal" size="x-small" class="text-capitalize px-5 ml-3" @click="visibilityEdit = true">Edit</v-btn>
                                        </template>
                                    </li>
                                </v-hover>
                                <div v-auto-animate>
                                    <template v-if="visibilityEdit">
                                        <div class="mb-3">
                                            <v-radio-group hide-details v-model="visibilityTemp">
                                                <v-radio label="Public" value="Public"></v-radio>
                                                <v-radio label="Private" value="Private"></v-radio>
                                            </v-radio-group>
                                            <div class="d-flex justify-space-between">
                                                <v-btn variant="tonal" class="text-capitalize" @click="() => { form.visibility = visibilityTemp; visibilityEdit = false }">OK</v-btn>
                                                <v-btn variant="tonal" class="text-capitalize" @click="() => { visibilityTemp = 'Public'; visibilityEdit = false }">Cancel</v-btn>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <v-hover v-slot="{ isHovering, props }">
                                    <li class="d-flex align-center justify-space-between" v-bind="props">
                                        <div>
                                            <v-icon start>
                                                <Icon icon="mdi:calendar" />
                                            </v-icon>
                                            Publish: immediately
                                        </div>
                                        <template v-if="isHovering">
                                            <v-btn variant="tonal" size="x-small" class="text-capitalize px-5">Edit</v-btn>
                                        </template>
                                    </li>
                                </v-hover>
                            </ul>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions class="justify-space-between">
                            <v-btn rounded="sm" class="text-capitalize px-5" color="error" variant="text" @click="() => { navigateTo('/admin/blog/') }">Move to Trash</v-btn>
                            <v-btn rounded="sm" class="text-capitalize px-5" variant="flat" type="submit">Publish</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card class="mb-3">
                        <v-card-title>Categories</v-card-title>
                        <v-divider></v-divider>
                        <v-autocomplete hide-details hide-no-data rounded="0" density="comfortable" placeholder="Search Categories" menu-icon="" append-inner-icon="mdi-magnify" @click:append-inner="searchCategories">
                        </v-autocomplete>
                        <v-card-text>
                            <template v-for=" item, i  in  category.categories ">
                                <v-checkbox v-model="form.categories" hide-details :label="item['title']" :value="item['id']" density="compact" class="text-capitalize"></v-checkbox>
                            </template>
                        </v-card-text>
                    </v-card>
                    <v-card class="mb-3">
                        <v-card-title>Tags</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <template v-for=" item, i  in  tag.tags ">
                                <v-checkbox v-model="form.tags" hide-details :label="item['title']" :value="item['id']" density="compact" class="text-capitalize"></v-checkbox>
                            </template>
                        </v-card-text>
                    </v-card>
                    <v-card class="mb-3">
                        <v-card-title>Featured Image</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="d-flex align-center justify-center position-relative pa-0">
                            <template v-if="form.image !== null">
                                <v-hover v-slot="{ isHovering, props }">
                                    <v-img cover v-bind="props" :src="typeof form.image == 'object' ? url : form.image" height="200">
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

<!-- editor theme -->
<!-- <style lang="scss">
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
</style> -->