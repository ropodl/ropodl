<script setup lang="ts">
import type { Level } from '@tiptap/extension-heading';

import MediaSelector from '~/components/admin/shared/MediaSelector.vue';

const content = defineModel('content', {
  type: String,
});

const { editor, EditorContent } = useTiptap(content.value);
const showMediaSelector = ref(false);
const galleryMode = ref(false);

interface ToolbarItem {
  icon?: string;
  text?: string;
  tooltip: string;
  action: () => void;
  isActive?: () => boolean;
}

const headingOptions = [
  { title: 'Paragraph', value: 0 },
  { title: 'Heading 1', value: 1 },
  { title: 'Heading 2', value: 2 },
  { title: 'Heading 3', value: 3 },
  { title: 'Heading 4', value: 4 },
  { title: 'Heading 5', value: 5 },
  { title: 'Heading 6', value: 6 },
];

const currentHeading = computed({
  get: () => {
    if (editor.value?.isActive('heading', { level: 1 })) return 1;
    if (editor.value?.isActive('heading', { level: 2 })) return 2;
    if (editor.value?.isActive('heading', { level: 3 })) return 3;
    if (editor.value?.isActive('heading', { level: 4 })) return 4;
    if (editor.value?.isActive('heading', { level: 5 })) return 5;
    if (editor.value?.isActive('heading', { level: 6 })) return 6;
    return 0;
  },
  set: (level: number) => {
    if (level === 0) {
      editor.value?.chain().focus().setParagraph().run();
    } else {
      editor.value?.chain().focus().toggleHeading({ level: level as Level }).run();
    }
  },
});

const toolbarItems = computed<ToolbarItem[]>(() => [
  {
    icon: 'carbon:undo',
    tooltip: 'Undo',
    action: () => editor.value?.chain().focus().undo().run(),
  },
  {
    icon: 'carbon:redo',
    tooltip: 'Redo',
    action: () => editor.value?.chain().focus().redo().run(),
  },
  {
    icon: 'carbon:text-bold',
    tooltip: 'Bold',
    action: () => editor.value?.chain().focus().toggleBold().run(),
    isActive: () => editor.value?.isActive('bold') ?? false,
  },
  {
    icon: 'carbon:text-italic',
    tooltip: 'Italic',
    action: () => editor.value?.chain().focus().toggleItalic().run(),
    isActive: () => editor.value?.isActive('italic') ?? false,
  },
  {
    icon: 'carbon:text-underline',
    tooltip: 'Underline',
    action: () => editor.value?.chain().focus().toggleUnderline().run(),
    isActive: () => editor.value?.isActive('underline') ?? false,
  },
  {
    icon: 'carbon:text-strikethrough',
    tooltip: 'Strike',
    action: () => editor.value?.chain().focus().toggleStrike().run(),
    isActive: () => editor.value?.isActive('strike') ?? false,
  },
  {
    icon: 'carbon:code',
    tooltip: 'Inline Code',
    action: () => editor.value?.chain().focus().toggleCode().run(),
    isActive: () => editor.value?.isActive('code') ?? false,
  },
  {
    icon: 'carbon:text-highlight',
    tooltip: 'Highlight',
    action: () => editor.value?.chain().focus().toggleHighlight().run(),
    isActive: () => editor.value?.isActive('highlight') ?? false,
  },
  {
    icon: 'carbon:link',
    tooltip: 'Link',
    action: () => {
      const previousUrl = editor.value?.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);
      if (url === null) return;
      if (url === '') {
        editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }
      editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    },
    isActive: () => editor.value?.isActive('link') ?? false,
  },
  {
    icon: 'carbon:color-palette',
    tooltip: 'Text Color',
    action: () => {
      const color = window.prompt('Color (hex or name)', '#ff0000');
      if (color) editor.value?.chain().focus().setColor(color).run();
    },
    isActive: () => !!editor.value?.getAttributes('textStyle').color,
  },
  {
    icon: 'carbon:paint-brush',
    tooltip: 'Background Color',
    action: () => {
      const color = window.prompt('Background Color', '#ffff00');
      if (color) editor.value?.chain().focus().setBackgroundColor(color).run();
    },
  },
  {
    icon: 'carbon:align-horizontal-left',
    tooltip: 'Align Left',
    action: () => editor.value?.chain().focus().setTextAlign('left').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'left' }) ?? false,
  },
  {
    icon: 'carbon:align-horizontal-center',
    tooltip: 'Align Center',
    action: () => editor.value?.chain().focus().setTextAlign('center').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'center' }) ?? false,
  },
  {
    icon: 'carbon:align-horizontal-right',
    tooltip: 'Align Right',
    action: () => editor.value?.chain().focus().setTextAlign('right').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'right' }) ?? false,
  },
  {
    icon: 'carbon:text-align-justify',
    tooltip: 'Justify',
    action: () => editor.value?.chain().focus().setTextAlign('justify').run(),
    isActive: () => editor.value?.isActive({ textAlign: 'justify' }) ?? false,
  },
  {
    icon: 'carbon:quotes',
    tooltip: 'Block Quote',
    action: () => editor.value?.chain().focus().toggleBlockquote().run(),
    isActive: () => editor.value?.isActive('blockquote') ?? false,
  },
  {
    icon: 'carbon:list-bulleted',
    tooltip: 'Bullet List',
    action: () => editor.value?.chain().focus().toggleBulletList().run(),
    isActive: () => editor.value?.isActive('bulletList') ?? false,
  },
  {
    icon: 'carbon:list-numbered',
    tooltip: 'Numbered List',
    action: () => editor.value?.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.value?.isActive('orderedList') ?? false,
  },
  {
    icon: 'carbon:checkbox-checked',
    tooltip: 'Task List',
    action: () => editor.value?.chain().focus().toggleTaskList().run(),
    isActive: () => editor.value?.isActive('taskList') ?? false,
  },
  {
    icon: 'carbon:terminal',
    tooltip: 'Codeblock',
    action: () => editor.value?.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor.value?.isActive('codeBlock') ?? false,
  },
  {
    icon: 'carbon:row-expand',
    tooltip: 'Expandable Details',
    action: () => editor.value?.chain().focus().setDetails().run(),
    isActive: () => !editor.value?.can().setDetails(),
  },
  {
    icon: 'carbon:image',
    tooltip: 'Image',
    action: () => {
      galleryMode.value = false;
      showMediaSelector.value = true;
    },
  },
  {
    icon: 'carbon:grid',
    tooltip: 'Gallery',
    action: () => {
      galleryMode.value = true;
      showMediaSelector.value = true;
    },
  },
  {
    icon: 'carbon:logo-youtube',
    tooltip: 'Youtube',
    action: () => {
      const url = window.prompt('URL');
      if (url) editor.value?.chain().focus().setYoutubeVideo({ src: url }).run();
    },
  },
  {
    icon: 'carbon:table',
    tooltip: 'Table',
    action: () => editor.value?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    icon: 'carbon:page-break',
    tooltip: 'Hard Break',
    action: () => editor.value?.chain().focus().setHardBreak().run(),
  },
  {
    icon: 'carbon:pan-horizontal',
    tooltip: 'Horizontal Line',
    action: () => editor.value?.chain().focus().setHorizontalRule().run(),
  },
]);

const row1Items = computed(() => toolbarItems.value.slice(0, 15));
const row2Items = computed(() => toolbarItems.value.slice(15));

onUnmounted(() => {
  editor.value?.destroy();
});
</script>
<template>
  <div class="tiptap-editor-container">
    <v-sheet border class="sticky-toolbar pa-0 mb-1 rounded-lg overflow-hidden">
      <div class="toolbar-row d-flex flex-wrap">
        <v-btn
          v-for="(item, index) in row1Items"
          :key="index"
          v-tooltip="{ text: item.tooltip, location: 'top' }"
          :active="item.isActive?.()"
          :icon="item.icon"
          :text="item.text"
          size="small"
          height="40"
          width="40"
          class="pa-0"
          rounded="0"
          variant="text"
          @click="item.action"
        />
      </div>
      <v-divider />
      <div class="toolbar-row d-flex flex-wrap align-center">
        <select
          v-model="currentHeading"
          class="heading-select ml-2"
        >
          <option v-for="option in headingOptions" :key="option.value" :value="option.value">
            {{ option.title }}
          </option>
        </select>
        <v-divider vertical class="mx-1" />
        <v-btn
          v-for="(item, index) in row2Items"
          :key="index"
          v-tooltip="{ text: item.tooltip, location: 'top' }"
          :active="item.isActive?.()"
          :icon="item.icon"
          :text="item.text"
          size="small"
          height="40"
          width="40"
          class="pa-0"
          rounded="0"
          variant="text"
          @click="item.action"
        />
      </div>
    </v-sheet>
    <v-card class="tiptap-content-card" border>
      <v-card-text class="pa-0 relative">
        <editor-content :editor class="tiptap-content" />
      </v-card-text>
      <v-divider />
      <v-footer class="pa-2 px-4 caption grey--text d-flex justify-end bg-surface">
        <span class="mr-4">
          {{ editor?.storage.characterCount.characters() }} characters
        </span>
        <span> {{ editor?.storage.characterCount.words() }} words </span>
      </v-footer>
    </v-card>

    <MediaSelector
      v-model="showMediaSelector"
      :multiple="galleryMode"
      @select="
        (data: any, id?: string) => {
          if (galleryMode) {
            editor?.chain().focus().setGallery({ images: data }).run();
          } else {
            if (data) editor?.chain().focus().setImage({ src: data }).run();
          }
        }
      "
    />
  </div>
</template>
<style lang="scss">
@use 'sass:color';
@use 'sass:map';

// Fonts
$font-base: 'Ubuntu', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
$font-code: 'JetBrainsMono', 'Fira Code', 'Cascadia Code', Consolas, monospace;

// Dark Theme Colors (Optimized for Tiptap integration)
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

$max-width: 850px; // Slightly wider for better editor flow

@mixin heading($tag, $size, $lightness: 0%, $border-bottom: none, $padding-bottom: 0) {
  #{$tag} {
    margin: 1em auto 1em;
    font-weight: 700;
    line-height: 1.2;
    color: color.adjust(map.get($colors, heading), $lightness: $lightness);
    font-size: $size;
    border-bottom: $border-bottom;
    padding-bottom: $padding-bottom;
    text-wrap: pretty;
  }
}

.tiptap-editor-container {
  position: relative;
  font-family: $font-base;

  .sticky-toolbar {
    position: sticky;
    top: 50px;
    z-index: 10;
    background-color: rgb(var(--v-theme-surface));

    .toolbar-row {
      padding: 2px;
    }

    .heading-select {
      background: transparent;
      border: none;
      color: rgb(var(--v-theme-on-surface));
      font-size: 0.875rem;
      padding: 4px 8px;
      cursor: pointer;
      outline: none;
      max-width: 120px;
      border-radius: 4px;

      &:hover {
        background-color: rgba(var(--v-theme-on-surface), 0.05);
      }

      option {
        background-color: rgb(var(--v-theme-surface));
        color: rgb(var(--v-theme-on-surface));
      }
    }
  }

  .tiptap-content {
    border: 0px;
    background-color: map.get($colors, bg);

    .tiptap {
      min-height: calc(100vh - 200px);
      padding: 20px;
      color: map.get($colors, text);
      line-height: 1.65;
      outline: none;

      // Layout constraints to match rendering
      > * {
        max-width: $max-width;
        margin-left: auto;
        margin-right: auto;
      }

      // Placeholder
      p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: rgba(var(--v-theme-on-surface), 0.4);
        pointer-events: none;
        height: 0;
      }

      // Headings
      @include heading(h1, 2.5em, 0%);
      @include heading(h2, 2em, -5%);
      @include heading(h3, 1.7em, -10%);
      @include heading(h4, 1.4em, -15%);
      @include heading(h5, 1.2em, -20%);
      @include heading(h6, 1.05em, -25%);

      p {
        margin-bottom: 1.1em;
      }

      // Links
      a {
        color: map.get($colors, link);
        text-decoration: none;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: map.get($colors, link-hover);
          text-decoration: underline;
        }
      }

      // Lists
      ul, ol {
        margin-bottom: 1.2em;
        padding-left: 2.2em;

        li {
          margin-bottom: 0.5em;
          p { margin-bottom: 0.2em; }
        }
        ul, ol { margin: 0.6em 0; }
      }

      ul li { list-style-type: disc; }
      ol li { list-style-type: decimal; }

      // Blockquote
      blockquote {
        max-width: calc($max-width + 40px);
        margin: 2em auto;
        padding: 1.5em 2em;
        border-left: 5px solid map.get($colors, border-blockquote);
        background-color: map.get($colors, code-block-bg);
        color: map.get($colors, blockquote-text);
        font-style: italic;
        line-height: 1.7;
        border-radius: 4px;
        
        p:last-child { margin-bottom: 0; }
      }

      // Tables
      table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
        margin: 2em auto;
        overflow: hidden;

        td, th {
          min-width: 1em;
          border: 1px solid map.get($colors, border-medium);
          padding: 10px 12px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;

          > * { margin-bottom: 0; }
        }

        th {
          font-weight: bold;
          text-align: left;
          background-color: rgba(var(--v-theme-surface), 0.5);
          color: map.get($colors, heading);
        }

        .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: '';
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(var(--v-theme-primary), 0.1);
          pointer-events: none;
        }
      }

      // Code
      pre {
        background-color: map.get($colors, code-block-bg);
        color: map.get($colors, code-block-text);
        padding: 1.2em;
        border-radius: 5px;
        margin-bottom: 2em;
        font-family: $font-code;
        font-size: 0.9em;
        line-height: 1.5;
        overflow-x: auto;
        
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
      }

      // Media
      img, video, div[data-youtube-video] {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1.5rem auto;
        border-radius: 8px;
        border: 1px solid map.get($colors, border-medium);
      }

      div[data-youtube-video] {
        overflow: hidden;
        iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
        }
      }

      // Horizontal lines
      hr {
        border: none;
        border-top: 1px dashed map.get($colors, border-hr);
        margin: 3em 0;
        cursor: pointer;

        &.ProseMirror-selectednode {
          border-top: 1px solid map.get($colors, link);
        }
      }

      // Task Lists
      ul[data-type='taskList'] {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0.5rem;
          list-style: none;

          > label {
            flex: 0 0 auto;
            margin-right: 0.5rem;
            user-select: none;
          }

          input[type='checkbox'] {
            cursor: pointer;
            width: 1.25rem;
            height: 1.25rem;
            accent-color: map.get($colors, link);
          }
        }
      }

      // Details
      .details {
        display: flex;
        gap: 0.5rem;
        margin: 1.5rem 0;
        border: 1px solid map.get($colors, border-medium);
        border-radius: 0.5rem;
        padding: 0.75rem;
        transition: border-color 0.2s;

        &:focus-within {
          border-color: map.get($colors, link);
        }

        summary {
          font-weight: 700;
          list-style: none;
          outline: none;
          cursor: text;
          display: block;
          &::-webkit-details-marker { display: none; }
          &::marker { display: none; }
        }

        > button {
          align-items: center;
          background: transparent;
          border-radius: 4px;
          display: flex;
          font-size: 0.75rem;
          height: 1.5rem;
          justify-content: center;
          margin-top: 0.1rem;
          width: 1.5rem;
          outline: 0;
          border: none;
          color: map.get($colors, text);
          cursor: pointer;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }

          &::before {
            content: '\25B6';
            transition: transform 0.2s;
          }
        }

        &.is-open > button::before {
          transform: rotate(90deg);
        }

        > div {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;

          > [data-type='detailsContent'] {
            padding-top: 0.5rem;
            > :first-child { margin-top: 0; }
            > :last-child { margin-bottom: 0; }
          }
        }
      }

      // Mentions
      .mention {
        background-color: rgba(79, 195, 247, 0.1);
        color: map.get($colors, link);
        border-radius: 4px;
        padding: 0.1rem 0.3rem;
        font-weight: 600;
        text-decoration: none;
      }

      // Gallery Grid
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin: 1.5rem auto;

        .gallery-item {
          img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 0 !important; // Force reset for editor preview
          }
        }
      }
    }
  }
}
</style>
