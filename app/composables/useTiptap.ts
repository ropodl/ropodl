import { useEditor, EditorContent } from '@tiptap/vue-3';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { Blockquote } from '@tiptap/extension-blockquote';
import { Bold } from '@tiptap/extension-bold';
import { Code } from '@tiptap/extension-code';
import { Highlight } from '@tiptap/extension-highlight';
import { Italic } from '@tiptap/extension-italic';
import { Link } from '@tiptap/extension-link';
import { Strike } from '@tiptap/extension-strike';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
import {
  Details,
  DetailsContent,
  DetailsSummary,
} from '@tiptap/extension-details';
import { Heading } from '@tiptap/extension-heading';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { HardBreak } from '@tiptap/extension-hard-break';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Youtube } from '@tiptap/extension-youtube';
import { Mention } from '@tiptap/extension-mention';
import { Gallery } from '~/utils/tiptap/Gallery';

// Functionality Extensions
import { CharacterCount } from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { TextAlign } from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Focus } from '@tiptap/extension-focus';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Typography } from '@tiptap/extension-typography';
import { History } from '@tiptap/extension-history';
import { ListKeymap } from '@tiptap/extension-list-keymap';
// FontSize is sometimes part of TextStyle or separate, using the github path discovered earlier if needed
// However, the standard way is often just registering the mark or use TextStyle extensions

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight';

// create a lowlight instance
const lowlight = createLowlight(all);

// you can also register languages
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

export const useTiptap = (
  content: string | undefined,
  options: {
    placeholder?: string;
    onUpdate?: (content: string) => void;
  } = {}
) => {
  const editor = useEditor({
    content: content,
    onUpdate: ({ editor }) => {
      if (options.onUpdate) {
        options.onUpdate(editor.getHTML());
      }
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      Blockquote,
      Bold,
      Code,
      Highlight,
      Italic,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Strike,
      Subscript,
      Superscript,
      TextStyle,
      Underline,
      BulletList,
      ListItem,
      OrderedList,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Details.configure({
        persist: true,
        HTMLAttributes: {
          class: 'details',
        },
      }),
      DetailsSummary.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              return this.editor.commands.insertContent('<p></p>');
            },
            Space: () => {
              return this.editor.commands.insertContent(' ');
            },
          };
        },
      }),
      DetailsContent,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      HorizontalRule,
      HardBreak,
      Image.configure({
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Youtube.configure({
        width: 480,
        height: 320,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
      }),
      Gallery,
      CharacterCount,
      Color,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: options.placeholder || 'Start typing...',
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      Gapcursor,
      Dropcursor,
      Typography,
      History,
      ListKeymap,
    ],
  });

  return {
    editor,
    EditorContent,
  };
};
