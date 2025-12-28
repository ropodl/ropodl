import { useEditor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Blockquote from '@tiptap/extension-blockquote'
import { BulletList, ListItem } from '@tiptap/extension-list'
import { Details, DetailsContent, DetailsSummary } from '@tiptap/extension-details'
import Heading from '@tiptap/extension-heading'
import HorizontalRule from '@tiptap/extension-horizontal-rule'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight'

// create a lowlight instance
const lowlight = createLowlight(all)

// you can also register languages
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

export const useTiptap = (content:string|undefined) => {
    const editor = useEditor({
        content: content,
        extensions: [
            Document,
            Paragraph,
            Text,
            Blockquote,
            BulletList,
            ListItem,
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Details.configure({
                persist: true,
                HTMLAttributes: {
                    class: 'details',
                    },
            }),
            DetailsSummary,
            DetailsContent,
            Heading.configure({
                levels: [1,2,3,4,5,6]
            }),
            HorizontalRule
        ],
    })

    return {
        editor,
        EditorContent
    }
}