<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';

const { content } = defineProps<{
  content?: string;
}>();

const contentContainer = ref<HTMLDivElement | null>(null);
const visible = ref(false);
const index = ref(0);
const imgs = ref<{ title?: string; src: string }[]>([]);

// Store original scroll position for restoration
let originalScrollY = 0;

// Optimized scroll management
const toggleBodyScroll = (disable: boolean) => {
  const { body } = document;

  if (disable) {
    originalScrollY = window.scrollY;
    body.style.cssText = `
            position: fixed;
            top: -${originalScrollY}px;
            width: 100%;
            overflow: hidden;
        `;
  } else {
    body.style.cssText = '';
    window.scrollTo(0, originalScrollY);
  }
};

// Watch visibility changes
watch(visible, toggleBodyScroll);

// Setup images with lightbox functionality
const setupImages = () => {
  if (!contentContainer.value) return;

  // Find all images, including those in galleries
  const images = contentContainer.value.querySelectorAll('img[src]');

  imgs.value = [];
  images.forEach((element, i) => {
    const img = element as HTMLImageElement;
    imgs.value.push({
      title: img.alt || `Image ${i + 1}`,
      src: img.src,
    });

    img.classList.add('cursor-pointer');
    img.onclick = () => {
      index.value = i;
      visible.value = true;
    };
  });
};

onMounted(async () => {
  if (content) {
    await nextTick();
    setupImages();
  }
});

onUnmounted(() => {
  if (visible.value) {
    toggleBodyScroll(false);
  }
});

const onHide = () => {
  visible.value = false;
};
</script>

<template>
  <div
    v-html="content"
    ref="contentContainer"
    class="dynamic-content mb-3"
  ></div>
  <vue-easy-lightbox
    :visible
    :imgs
    :index
    @hide="onHide"
  ></vue-easy-lightbox>
</template>

<style lang="scss">
@use 'sass:color';
@use 'sass:map';

// Fonts
$font-base: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
$font-code: 'Fira Code', 'Cascadia Code', Consolas, monospace;

// Dark Theme Colors
$colors: (
  bg: #121212,
  text: #e0e0e0,
  heading: #fff,
  link: #4fc3f7,
  link-hover: #29b6f6,
  blockquote-text: #81c784,
  caption: #aaa,
  inline-code-bg: #2d2d2d,
  inline-code-text: #ff7043,
  code-block-bg: #1e1e1e,
  code-block-text: #e0e0e0,
  info-text: #999,
  border-light: #e7e7e7,
  border-medium: #464646,
  border-blockquote: #4caf50,
  border-hr: #555,
);

$max-width: 800px;
$box-shadow-subtle: 0 4px 8px rgba(0, 0, 0, 0.4);

// --------------------
// Mixins
// --------------------
@mixin line-clamp($lines) {
  display: -webkit-box !important;
  -webkit-line-clamp: $lines;
  line-clamp: $lines;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  overflow: hidden !important;
}

@mixin heading($tag, $size, $lightness: 0%, $border-bottom: none, $padding-bottom: 0) {
  #{$tag} {
    margin: 1em auto 1em;
    max-width: $max-width;
    font-weight: 700;
    line-height: 1.2;
    color: color.adjust(map.get($colors, heading), $lightness: $lightness);
    font-size: $size;
    border-bottom: $border-bottom;
    padding-bottom: $padding-bottom;
  }
}

.pointer {
  cursor: pointer;
}

// --------------------
// Dynamic content container
// --------------------
.dynamic-content {
  font-family: $font-base;
  line-height: 1.65;
  color: map.get($colors, text);
  word-wrap: break-word;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;
  overflow-x: hidden;

  p {
    margin-bottom: 1.1em;
    max-width: $max-width;
    margin-left: auto;
    margin-right: auto;
  }

  // Headings
  @include heading(h1, 2.5em, 0%, none, 0);
  @include heading(h2, 2em, -10%, none, 0);
  @include heading(h3, 1.7em, -20%);
  @include heading(h4, 1.4em, -30%);
  @include heading(h5, 1.2em, -40%);
  @include heading(h6, 1.05em, -50%);

  // Links
  a {
    color: map.get($colors, link);
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: map.get($colors, link-hover);
      text-decoration: underline;
    }
  }

  // Lists
  ul,
  ol {
    margin: auto;
    max-width: $max-width;
    margin-bottom: 1.2em;
    padding-left: 2.2em;

    li {
      margin-bottom: 0.5em;
    }
    ul,
    ol,
    ul ol,
    ol ul {
      margin: 0.6em 0;
    }
  }

  ul li {
    list-style-type: disc;
  }
  ol li {
    list-style-type: decimal;
  }

  // Strong/Em
  strong {
    font-weight: 700;
    color: map.get($colors, heading);
  }
  em {
    font-style: italic;
    color: color.adjust(map.get($colors, text), $lightness: 15%);
  }

  // Blockquote
  blockquote {
    max-width: calc($max-width + 5em);
    margin: 2em auto;
    padding: 1.5em 2em;
    border-left: 5px solid map.get($colors, border-blockquote);
    background-color: map.get($colors, code-block-bg);
    color: map.get($colors, blockquote-text);
    font-style: italic;
    line-height: 1.7;
    border-radius: 4px;
    p:last-child {
      margin-bottom: 0;
    }
  }

  // Media: images, videos, iframes

  img,
  video,
  iframe,
  embed,
  object {
    display: block;
    width: 100%;
    height: auto;
    margin: 1.5em 0;
    max-width: 100%;
    border-radius: 10px;

    // Reset margin for items inside a gallery
    .gallery-grid & {
      margin: 0;
    }
  }

  // Gallery Grid
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2em auto;
    max-width: $max-width;

    .gallery-item {
      overflow: hidden;
      border-radius: 8px;
    }
  }

  figure {
    margin: 1.5em auto;
    width: 100%;
    text-align: center;
    img {
      width: 100%;
      border-radius: 10px;
    }
    figcaption {
      font-size: 0.88em;
      color: map.get($colors, caption);
      margin-top: 0.8em;
      font-style: italic;
      max-width: $max-width;
      margin-left: auto;
      margin-right: auto;
      padding: 0 15px;
      position: relative;
      z-index: 1;
    }
  }

  // Tables
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2em;
    font-size: 0.95em;
    th,
    td {
      border: 1px solid map.get($colors, border-medium);
      padding: 10px 12px;
      text-align: left;
    }
    th {
      background-color: map.get($colors, bg);
      font-weight: 700;
      color: map.get($colors, text);
    }
    tr:nth-child(even) {
      background-color: map.get($colors, code-block-bg);
    }
    overflow-x: auto;
  }

  // Code
  pre {
    background-color: map.get($colors, code-block-bg);
    color: map.get($colors, code-block-text);
    padding: 1.2em;
    border-radius: 5px;
    overflow-x: auto;
    margin-bottom: 2em;
    font-family: $font-code;
    font-size: 0.9em;
    line-height: 1.5;
    code {
      background: transparent;
      color: inherit;
      padding: 0;
    }
  }
  code {
    font-family: $font-code;
    background-color: map.get($colors, inline-code-bg);
    color: map.get($colors, inline-code-text);
    padding: 0.25em 0.5em;
    border-radius: 3px;
    font-size: 0.88em;
    white-space: nowrap;
  }

  // Horizontal rules
  hr {
    border: none;
    border-top: 1px dashed map.get($colors, border-hr);
    margin: 3em 0;
  }

  // Alerts via loop
  $alert-types: (
    info: var(--v-theme-info),
    success: var(--v-theme-success),
    warning: var(--v-theme-warning),
    danger: var(--v-theme-danger),
  );
  @each $type, $color in $alert-types {
    .alert-#{$type} {
      padding: 1em 1.5em;
      border-left: 5px solid $color;
      border-radius: 4px;
      margin-bottom: 1.5em;
      font-size: 0.95em;
    }
  }
}
</style>