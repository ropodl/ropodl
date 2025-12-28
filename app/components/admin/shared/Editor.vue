<script setup lang="ts">
import type { Level } from '@tiptap/extension-heading';

const content = defineModel('content', {
   type: String
})

const { editor, EditorContent } = useTiptap(content.value);

const enableBlockQuote = () => {
   editor.value?.chain().focus().toggleBlockquote().run()
}

const enableBulletlist = () => {
   editor.value?.chain().focus().toggleBulletList().run()
}

const enableCodeBlock = () => {
   editor.value?.chain().focus().toggleCodeBlock().run()
}

const enableDetailSummary = () => {
   editor.value?.chain().focus().setDetails().run()
}
const enableHeadings = (i:Level) => {
   editor.value?.chain().focus().toggleHeading({ level: i }).run()
}
const enableHorizontalLine = () => {
   editor.value?.chain().focus().setHorizontalRule().run()
}

const activeBlockQuote = computed(() => editor.value?.isActive('blockquote'))
const activeBulletList = computed(() => editor.value?.isActive('bulletList'))
const activeCodeBlock = computed(() => editor.value?.isActive('codeBlock'))


onUnmounted(()=>{
   editor.value?.destroy();
})
</script>
<template>
   <v-card class="tiptap-wrapper" :border="false">
      <v-card-title class="sticky-toolbar pa-0">
         <v-btn
         v-tooltip="{text:'Block Quote',location: 'top'}"
         :active="activeBlockQuote"
         icon="carbon:quotes"
         size="small"
         rounded="0"
         @click="enableBlockQuote"
         />
         <v-btn
         v-tooltip="{text:'Bullet List',location: 'top'}"
         :active="activeBulletList"
         icon="carbon:list-bulleted"
         size="small"
         rounded="0"
         @click="enableBulletlist"
         />
         <v-btn
         v-tooltip="{text:'Codeblock',location: 'top'}"
         :active="activeCodeBlock"
         icon="carbon:code"
         size="small"
         rounded="0"
         @click="enableCodeBlock"
         />
         <v-btn
         v-tooltip="{text:'Expandable Details',location: 'top'}"
         :active="activeCodeBlock"
         icon="carbon:row-expand"
         size="small"
         rounded="0"
         @click="enableDetailSummary"
         />
         <template v-for="i in 6" :key="i">
            <v-btn
            v-tooltip="{text:`Heading ${i}`,location: 'top'}"
            :active="editor?.isActive('heading', { level: i })"
            icon
            :text="`H${i}`"
            size="small"
            rounded="0"
            @click="enableHeadings(i as Level)"
            />
         </template>
         <v-btn
         v-tooltip="{text:'Horizontal Line',location: 'top'}"
         :active="activeCodeBlock"
         icon="carbon:not-available"
         size="small"
         rounded="0"
         @click="enableHorizontalLine"
         />
         <v-divider/>
         <v-btn>asd</v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-0">
         <editor-content :editor class="tiptap-content" />
      </v-card-text>
   </v-card>
</template>
<style lang="scss">
  .tiptap-wrapper {
   overflow: hidden !important;
   position: relative;
   border: none !important;

   .sticky-toolbar {
      position: sticky;
      top: 0; // Sticks to the top of the screen
      z-index: 10; // Ensures it stays above the text content
      background-color: rgb(var(--v-theme-surface)); // Prevents text from showing behind buttons
      border-bottom: 1px solid rgba(var(--v-theme-border-color), var(--v-border-opacity));
      border: 1px solid rgba(255, 255, 255, 0.38);
   }

   // for making border be a layer
   &::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 1px solid rgba(255, 255, 255, 0.38);
      border-radius: inherit;
      pointer-events: none;
      transition: border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
   }
   &:focus-within::after,
   &:hover::after {
      border-width: 2px;
      border-color: rgba(255, 255, 255, 1);
   }

   .tiptap-content {
      border: 0px;
      background-color: rgba(var(--v-theme-background));
      
      .tiptap {
         min-height: 600px;
         border: 0px;
         padding: 10px 20px;
         :first-child {
            margin-top: 0;
         }
         &:focus-within {
            outline: none;
         }

         blockquote {
            border-left: 3px solid white;
            margin: 1em auto;
            padding: 0.5em 2em;
            font-style: italic;
            line-height: 1.7;
            border-radius: 4px;
         }

         ul,
         ol {
            margin: auto;
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
         pre {
            background-color: rgba(var(--v-theme-surface));
            color: rgba(var(--v-theme-primary));
            padding: 1.2em;
            border-radius: 5px;
            margin-bottom: 2em;
            font-family: 'JetBrainsMono', monospace;;
            font-size: 0.9em;
            line-height: 1.5;
            code {
               background: transparent;
               color: inherit;
               padding: 0;
            }
         }
         code {
            font-family: 'JetBrainsMono', monospace;;
            background-color: rgba(var(--v-theme-surface));
            color: rgba(var(--v-theme-primary));
            padding: 0.25em 0.5em;
            border-radius: 3px;
         }

         .details {
            display: flex;
            gap: 0.25rem;
            margin: 1.5rem 0;
            border: 1px solid rgb(var(--v-theme-surface));
            border-radius: 0.5rem;
            padding: 0.5rem;

            summary {
               font-weight: 700;
               list-style:none;
            }

            > button {
               align-items: center;
               background: transparent;
               border-radius: 4px;
               display: flex;
               font-size: 0.625rem;
               height: 1.25rem;
               justify-content: center;
               line-height: 1;
               margin-top: 0.1rem;
               padding: 0;
               width: 1.25rem;
               outline: 0;

               &:hover {
               background-color: rgb(var(--v-theme-surface));;
               }

               &::before {
               content: '\25B6';
               }
            }

            &.is-open > button::before {
               transform: rotate(90deg);
            }

            > div {
               display: flex;
               flex-direction: column;
               gap: 1rem;
               width: 100%;

               > [data-type='detailsContent'] > :last-child {
               margin-bottom: 0.5rem;
               }
            }

            .details {
               margin: 0.5rem 0;
            }
         }
         /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
     margin: 1em auto 1em;
     border-bottom: none;
     line-height: 1.2;
    text-wrap: pretty;
    padding-bottom: 0;
  }

  h1 {
	 font-weight: 700;
	 font-size: 2.5em;
  }

  h2 {
	 font-weight: 700;
	 font-size: 2em;
  }

      h3 {
         font-weight: 700;
         font-size: 1.7em;
      }

      h4 {
         font-weight: 700;
         font-size: 1.4em;
      }
         h5 {
            font-weight: 700;
            font-size: 1.2em;
         }
         h6 {
            font-weight: 700;
            font-size: 1.05em;
         }
         hr {
            border: none;
            border-top: 1px solid rgb(var(--v-theme-surface));
            cursor: pointer;
            margin: 2rem 0;

            &.ProseMirror-selectednode {
               border-top: 1px solid rgb(var(--v-theme-primary));
            }
         }
      }
   }
}
</style>
