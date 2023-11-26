<script setup>
import { formatTimeAgo } from "@vueuse/core";

const route = useRoute();
const blog = useBlog();

const post = ref({});
const loading = ref(true);

onMounted(() => {
  nextTick(async () => {
    await getBlog();
  });
});

const getBlog = async () => {
  const res = await blog.getBlog(route.params.slug);
  post.value = res;
  useSeoMeta({
    title: post.value.title,
    meta: [{ name: "description", content: post.value.excerpt }],
  });
  loading.value = false;
};
</script>
<template>
  <v-skeleton-loader :loading="loading" width="100%" height="600" type="image">
    <!-- <template v-if="post.featuredImage.length"> -->
    <v-img
      cover
      class="d-flex align-end rounded-0 border border-t-0 border-e-0 border-s-0"
      height="600"
      :src="post.featuredImage?.url"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-title
              class="text-h2"
              style="white-space: unset !important"
              >{{ post.title }}</v-card-title
            >
          </v-col>
        </v-row>
      </v-container>
    </v-img>
    <!-- </template> -->
  </v-skeleton-loader>
  <v-container>
    <v-row v-if="post.excerpt">
      <v-col cols="12" md="12">
        <div class="text-h4 font-weight-light">
          {{ post.excerpt }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-card flat color="transparent">
          <v-card-text class="px-0 text-overline"
            >Published at:
            {{ formatTimeAgo(new Date(post.createdAt)) }}</v-card-text
          >
        </v-card>
        <v-divider></v-divider>
        <v-card flat color="transparent">
          <v-card-title class="px-0"> Share on Social Media </v-card-title>
          <!-- <v-card-text class="px-0">
                        <ShareNetwork class="mr-3" network="facebook" url="https://news.vuejs.org/issues/180" :title="post.title" :description="post.excerpt" quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="vuejs,vite">
                            <v-btn icon variant="tonal">
                                <v-icon>
                                    <Icon icon="fa6-brands:facebook" />
                                </v-icon>
                            </v-btn>
                        </ShareNetwork>
                        <ShareNetwork network="twitter" url="https://news.vuejs.org/issues/180" title="Say hi to Vite! A brand new, extremely fast development setup for Vue." description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You." quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="vuejs,vite">
                            <v-btn icon variant="tonal">
                                <v-icon>
                                    <Icon icon="fa6-brands:x-twitter" />
                                </v-icon>
                            </v-btn>
                        </ShareNetwork>
                    </v-card-text> -->
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card flat color="transparent">
          <v-card-text class="pb-0">
            <div class="dynamic-content" v-html="post['content']"></div>
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-card flat color="transparent">
          <v-card-text class="text-overline" style="white-space: normal"
            >Published at:
            {{ formatTimeAgo(new Date(post.createdAt)) }}</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
div.dynamic-content {
  font-size: 18px;
  line-height: 1.6rem !important;
  font-weight: 400;

  // a {
  //   color: unset;
  //   text-decoration: none;
  //   background: linear-gradient(
  //       to top,
  //       transparent 0%,
  //       #1976d2 0%,
  //       #1976d2 100%,
  //       transparent 100%
  //     )
  // no-repeat left 0 bottom 0;
  // background-size: auto;
  // background-size: 100% 2px;
  // transition: background-size 250ms ease, color 250ms ease;
  // &:hover {
  //   text-decoration: none;
  //   color: white;
  //   background-size: 100% calc(1em + 6px);
  // }
  // }
  img {
    max-width: 100%;
    height: auto;
  }

  figure {
    figcaption {
      margin: 0;
      margin-bottom: 10px;
      padding: 0;
      font-size: 0.8rem;
      line-height: 1.25rem;
      text-align: right;
      justify-content: flex-end;
    }

    a {
      background-color: transparent;
      background-size: 0px;

      &:hover {
        background-size: 0px;
      }
    }
  }

  video {
    width: 100%;
    height: auto;
  }

  p {
    margin-top: 0;
    margin-bottom: 30px;
  }

  ul,
  ol {
    margin-bottom: 1rem;
  }

  blockquote {
    position: relative;
    font-size: 20px;
    margin-bottom: 20px;
    border-right: 10px solid var(--v-primary-base);
    background-color: rgba(50, 50, 50, 0.4);

    // backdrop-filter: blur(20px);
    &::before {
      content: open-quote;
      position: absolute;
      top: 0;
      left: -10px;
      font-family: medium-content-serif-font, Georgia, Cambria,
        "Times New Roman", Times, serif;
      font-size: 50px;
      font-weight: 900;
    }

    // footer.blockquote-footer{}
  }

  pre {
    padding: 10px 10px;
    overflow: auto;
    margin-bottom: 10px;
    background-color: #2d2d2d;
    color: white;
  }

  h1 {
    font-size: 2.5rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h2 {
    font-size: 2rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h3 {
    font-size: 1.75rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h4 {
    font-size: 1.5rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h5 {
    font-size: 1.25rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h6 {
    font-size: 1rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }
}
</style>