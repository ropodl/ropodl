import { Node, mergeAttributes } from '@tiptap/core';

export interface GalleryOptions {
    HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        gallery: {
            /**
             * Add a gallery
             */
            setGallery: (options: {
                images: { src: string; alt?: string; id?: string }[];
            }) => ReturnType;
        };
    }
}

export const Gallery = Node.create<GalleryOptions>({
    name: 'gallery',

    group: 'block',

    selectable: true,

    draggable: true,

    addAttributes() {
        return {
            images: {
                default: [],
                parseHTML: (element) => {
                    const images: { src: string; alt?: string; id?: string }[] = [];
                    element.querySelectorAll('img').forEach((img) => {
                        images.push({
                            src: img.getAttribute('src') || '',
                            alt: img.getAttribute('alt') || '',
                            id: img.getAttribute('data-id') || '',
                        });
                    });
                    return images;
                },
                renderHTML: (attributes) => {
                    return {
                        'data-images': JSON.stringify(attributes.images),
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="gallery"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes, node }) {
        const { images } = node.attrs;

        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'gallery',
                class: 'gallery-grid',
            }),
            ...(images || []).map((img: any) => [
                'div',
                { class: 'gallery-item' },
                ['img', { src: img.src, alt: img.alt, 'data-id': img.id }],
            ]),
        ];
    },

    addCommands() {
        return {
            setGallery:
                (options) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: options,
                        });
                    },
        };
    },
});
