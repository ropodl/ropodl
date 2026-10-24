import type { Component } from 'vue'
import type { ContentBlockType } from '#shared/content-blocks'
import EditAudio from './edit/EditAudio.vue'
import EditBeforeAfter from './edit/EditBeforeAfter.vue'
import EditButton from './edit/EditButton.vue'
import EditCallout from './edit/EditCallout.vue'
import EditChecklist from './edit/EditChecklist.vue'
import EditCode from './edit/EditCode.vue'
import EditColumns from './edit/EditColumns.vue'
import EditDivider from './edit/EditDivider.vue'
import EditEmbed from './edit/EditEmbed.vue'
import EditFaq from './edit/EditFaq.vue'
import EditFile from './edit/EditFile.vue'
import EditGallery from './edit/EditGallery.vue'
import EditHeading from './edit/EditHeading.vue'
import EditImage from './edit/EditImage.vue'
import EditLink from './edit/EditLink.vue'
import EditList from './edit/EditList.vue'
import EditMediaText from './edit/EditMediaText.vue'
import EditParagraph from './edit/EditParagraph.vue'
import EditQuote from './edit/EditQuote.vue'
import EditStats from './edit/EditStats.vue'
import EditTable from './edit/EditTable.vue'
import EditTechStack from './edit/EditTechStack.vue'
import EditTestimonial from './edit/EditTestimonial.vue'
import EditTimeline from './edit/EditTimeline.vue'

// The admin editor for each block type (see registry.ts for the public renderers).
export const blockEditors: Record<ContentBlockType, Component> = {
  paragraph: EditParagraph,
  heading: EditHeading,
  list: EditList,
  quote: EditQuote,
  callout: EditCallout,
  code: EditCode,
  divider: EditDivider,
  image: EditImage,
  gallery: EditGallery,
  embed: EditEmbed,
  audio: EditAudio,
  columns: EditColumns,
  mediaText: EditMediaText,
  button: EditButton,
  link: EditLink,
  table: EditTable,
  checklist: EditChecklist,
  stats: EditStats,
  timeline: EditTimeline,
  faq: EditFaq,
  testimonial: EditTestimonial,
  techStack: EditTechStack,
  beforeAfter: EditBeforeAfter,
  file: EditFile
}
