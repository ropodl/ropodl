<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Icon } from '@iconify/vue';
import { ref, watch, onBeforeUnmount } from 'vue';
import MediaSelector from './MediaSelector.vue';

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:content']);

const editor = useEditor({
  content: props.content,
  extensions: [
    StarterKit,
    Underline,
    Image.configure({
      inline: true,
      allowBase64: true,
    }),
    Link.configure({
      openOnClick: false,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Placeholder.configure({
      placeholder: 'Write something amazing...',
    }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:content', editor.getHTML());
  },
});

// Watch for external content changes
watch(() => props.content, (newContent) => {
  if (editor.value && newContent !== editor.value.getHTML()) {
    editor.value.commands.setContent(newContent, false);
  }
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

const showMediaSelector = ref(false);

const handleImageSelected = (url: string) => {
  editor.value?.chain().focus().setImage({ src: url }).run();
};

const setLink = () => {
  if (!editor.value) return;
  const previousUrl = editor.value.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  // update link
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
};
</script>

<template>
  <template v-if="editor">

    <div class="tiptap-editor-wrapper">
      <!-- Toolbar -->
      <div class="tiptap-toolbar">
        <div class="toolbar-group">
          <button type="button" :disabled="!editor.can().undo()" class="toolbar-btn" title="Undo" @click="editor.chain().focus().undo().run()">
            <Icon icon="tabler:arrow-back-up" />
          </button>
          <button type="button" :disabled="!editor.can().redo()" class="toolbar-btn" title="Redo" @click="editor.chain().focus().redo().run()">
            <Icon icon="tabler:arrow-forward-up" />
          </button>
        </div>
  
        <div class="toolbar-divider"/>
  
        <div class="toolbar-group">
          <button type="button" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" class="toolbar-btn" title="Heading 1" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
            <Icon icon="tabler:h-1" />
          </button>
          <button type="button" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" class="toolbar-btn" title="Heading 2" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
            <Icon icon="tabler:h-2" />
          </button>
          <button type="button" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" class="toolbar-btn" title="Heading 3" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
            <Icon icon="tabler:h-3" />
          </button>
        </div>
  
        <div class="toolbar-divider"/>
  
        <div class="toolbar-group">
          <button type="button" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" class="toolbar-btn" title="Bold" @click="editor.chain().focus().toggleBold().run()">
            <Icon icon="tabler:bold" />
          </button>
          <button type="button" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" class="toolbar-btn" title="Italic" @click="editor.chain().focus().toggleItalic().run()">
            <Icon icon="tabler:italic" />
          </button>
          <button type="button" :class="{ 'is-active': editor.isActive('underline') }" class="toolbar-btn" title="Underline" @click="editor.chain().focus().toggleUnderline().run()">
            <Icon icon="tabler:underline" />
          </button>
          <button type="button" :class="{ 'is-active': editor.isActive('strike') }" class="toolbar-btn" title="Strikethrough" @click="editor.chain().focus().toggleStrike().run()">
            <Icon icon="tabler:strikethrough" />
          </button>
          <button type="button" :class="{ 'is-active': editor.isActive('code') }" class="toolbar-btn" title="Inline Code" @click="editor.chain().focus().toggleCode().run()">
            <Icon icon="tabler:code" />
          </button>
        </div>
  
        <div class="toolbar-divider"/>
  
        <div class="toolbar-group">
          <button type="button" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" class="toolbar-btn" title="Align Left" @click="editor.chain().focus().setTextAlign('left').run()">
            <Icon icon="tabler:align-left" />
          </button>
          <button type="button" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" class="toolbar-btn" title="Align Center" @click="editor.chain().focus().setTextAlign('center').run()">
            <Icon icon="tabler:align-center" />
          </button>
          <button type="button" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" class="toolbar-btn" title="Align Right" @click="editor.chain().focus().setTextAlign('right').run()">
            <Icon icon="tabler:align-right" />
          </button>
          <button type="button" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }" class="toolbar-btn" title="Align Justify" @click="editor.chain().focus().setTextAlign('justify').run()">
            <Icon icon="tabler:align-justified" />
          </button>
        </div>
  
        <div class="toolbar-divider"/>
  
        <div class="toolbar-group">
          <button type="button" :class="{ 'is-active': editor.isActive('bulletList') }" class="toolbar-btn" title="Bullet List" @click="editor.chain().focus().toggleBulletList().run()">
            <Icon icon="tabler:list" />
          </button>
          <button type="button" :class="{ 'is-active': editor.isActive('orderedList') }" class="toolbar-btn" title="Ordered List" @click="editor.chain().focus().toggleOrderedList().run()">
            <Icon icon="tabler:list-numbers" />
          </button>
          <button type="button" :class="{ 'is-active': editor.isActive('blockquote') }" class="toolbar-btn" title="Blockquote" @click="editor.chain().focus().toggleBlockquote().run()">
            <Icon icon="tabler:quote" />
          </button>
        </div>
  
        <div class="toolbar-divider"/>
  
        <div class="toolbar-group">
          <button type="button" :class="{ 'is-active': editor.isActive('link') }" class="toolbar-btn" title="Insert Link" @click="setLink">
            <Icon icon="tabler:link" />
          </button>
          <button type="button" class="toolbar-btn" title="Media Library" @click="showMediaSelector = true">
            <Icon icon="tabler:photo" />
          </button>
        </div>
  
        <div class="toolbar-divider"/>
  
        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" title="Clear Formatting" @click="editor.chain().focus().unsetAllMarks().run()">
            <Icon icon="tabler:format-cleared" />
          </button>
        </div>
      </div>
  
      <!-- Editor Surface -->
      <editor-content :editor="editor" class="tiptap-content" />
  
      <!-- Media Selector Dialog -->
      <MediaSelector v-model="showMediaSelector" @select="handleImageSelected" />
    </div>
  </template>
</template>

<style lang="scss">
.tiptap-editor-wrapper {
  border: 1px solid var(--ck-color-base-border, #e0e0e0);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: rgb(var(--v-theme-surface));

  .tiptap-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 8px;
    background: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    align-items: center;

    .toolbar-group {
      display: flex;
      gap: 2px;
    }

    .toolbar-divider {
      width: 1px;
      height: 24px;
      background: #dee2e6;
      margin: 0 4px;
    }

    .toolbar-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      border: 1px solid transparent;
      background: transparent;
      color: #495057;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 18px;

      &:hover {
        background: #e9ecef;
      }

      &.is-active {
        background: #e7f1ff;
        color: #0d6efd;
        border-color: #0d6efd;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }

  .tiptap-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;
    min-height: 400px;
    max-height: 600px;

    &:focus-within {
      outline: none;
    }

    .tiptap {
      min-height: 100%;

      p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: #adb5bd;
        pointer-events: none;
        height: 0;
      }

      &:focus {
        outline: none;
      }

      h1 { font-size: 2rem; margin-bottom: 1rem; }
      h2 { font-size: 1.5rem; margin-bottom: 0.75rem; }
      h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
      
      ul, ol {
        padding: 0 1rem;
        margin-bottom: 1rem;
      }

      blockquote {
        border-left: 3px solid #dee2e6;
        padding-left: 1rem;
        color: #6c757d;
        margin-bottom: 1rem;
        font-style: italic;
      }

      img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1rem 0;

        &.ProseMirror-selectednode {
          outline: 3px solid #0d6efd;
        }
      }

      a {
        color: #0d6efd;
        text-decoration: underline;
        cursor: pointer;
      }

      code {
        background: #f8f9fa;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-family: monospace;
      }
    }
  }
}

/* Dark mode styles */
.v-theme--dark {
  .tiptap-editor-wrapper {
    border-color: #444;
    
    .tiptap-toolbar {
      background: #1e1e1e;
      border-bottom-color: #444;

      .toolbar-divider {
        background: #444;
      }

      .toolbar-btn {
        color: #bbb;
        
        &:hover {
          background: #333;
        }

        &.is-active {
          background: #0d6efd33;
          color: #58a6ff;
          border-color: #58a6ff;
        }
      }
    }

    .tiptap-content {
      .tiptap {
        color: #eee;

        code {
          background: #333;
          color: #ff7b72;
        }

        blockquote {
          border-left-color: #444;
          color: #8b949e;
        }

        a {
          color: #58a6ff;
        }
      }
    }
  }
}
</style>
