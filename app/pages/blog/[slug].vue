<script setup lang="ts">
import useApiFetch from '~/utils/shared/useApiFetch'

const route = useRoute();
console.log(route)

  onMounted(()=>{
    getBlogBySlug()
  })

  const getBlogBySlug = async() => {
    await useApiFetch(`/blog/${route.params.slug}`).then((res)=>{
      blog.value = res.data
    })
  }

  const blog = ref({})
</script>
<template>
  <v-container max-width="1200">
      <v-row v-if="blog.excerpt">
        <v-col
          cols="12"
          md="12"
        >
          <v-card-title
            class="text-md-h2 text-h4 font-weight-bold px-0 pt-0"
            style="line-height: 1.2; white-space: unset !important"
          >
            {{ blog.title }}
          </v-card-title>
          <div class="text-h6 text-sm-h4 font-weight-light">
            {{ blog.excerpt }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card
            border
            rounded="xl"
          >
          {{ blog.featured_image }}
            <v-img
              cover
              :aspect-ratio="16 / 8"
              :src="blog.featured_image.fileUrl"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <!-- <template v-if="blog.content">
            <dynamic :content="blog.content" />
          </template> -->
        </v-col>
      </v-row>
    </v-container>
</template>
