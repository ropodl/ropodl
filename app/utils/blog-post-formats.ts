import type { BlogPostFormat } from '../../shared/types/blog-post-format'

export type { BlogPostFormat }

export const blogPostFormats: { value: BlogPostFormat, label: string, description: string }[] = [
  { value: 'standard', label: 'Standard', description: 'A regular article with a title, summary, and body.' },
  { value: 'aside', label: 'Aside', description: 'A short, informal note.' },
  { value: 'gallery', label: 'Gallery', description: 'An article centered on image galleries in the editor.' },
  { value: 'link', label: 'Link', description: 'An article that points readers to another page.' },
  { value: 'image', label: 'Image', description: 'An article centered on its featured image.' },
  { value: 'quote', label: 'Quote', description: 'A highlighted quotation with an optional attribution.' },
  { value: 'status', label: 'Status', description: 'A brief status update.' },
  { value: 'video', label: 'Video', description: 'An article featuring a YouTube or Vimeo video.' },
  { value: 'audio', label: 'Audio', description: 'An article featuring an audio file URL.' },
  { value: 'chat', label: 'Chat', description: 'A conversation or transcript.' }
]
