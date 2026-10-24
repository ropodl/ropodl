import type { Component } from 'vue'
import type { ContentBlockType } from '#shared/content-blocks'
import BlockAudio from './render/BlockAudio.vue'
import BlockBeforeAfter from './render/BlockBeforeAfter.vue'
import BlockButton from './render/BlockButton.vue'
import BlockCallout from './render/BlockCallout.vue'
import BlockChecklist from './render/BlockChecklist.vue'
import BlockCode from './render/BlockCode.vue'
import BlockColumns from './render/BlockColumns.vue'
import BlockDivider from './render/BlockDivider.vue'
import BlockEmbed from './render/BlockEmbed.vue'
import BlockFaq from './render/BlockFaq.vue'
import BlockFile from './render/BlockFile.vue'
import BlockGallery from './render/BlockGallery.vue'
import BlockHeading from './render/BlockHeading.vue'
import BlockImage from './render/BlockImage.vue'
import BlockLink from './render/BlockLink.vue'
import BlockList from './render/BlockList.vue'
import BlockMediaText from './render/BlockMediaText.vue'
import BlockParagraph from './render/BlockParagraph.vue'
import BlockQuote from './render/BlockQuote.vue'
import BlockStats from './render/BlockStats.vue'
import BlockTable from './render/BlockTable.vue'
import BlockTechStack from './render/BlockTechStack.vue'
import BlockTestimonial from './render/BlockTestimonial.vue'
import BlockTimeline from './render/BlockTimeline.vue'

// The public renderer for each block type. Editors live in ./edit and are mapped in ./editors.ts,
// so the public pages never load editor code.
export const blockRenderers: Record<ContentBlockType, Component> = {
  paragraph: BlockParagraph,
  heading: BlockHeading,
  list: BlockList,
  quote: BlockQuote,
  callout: BlockCallout,
  code: BlockCode,
  divider: BlockDivider,
  image: BlockImage,
  gallery: BlockGallery,
  embed: BlockEmbed,
  audio: BlockAudio,
  columns: BlockColumns,
  mediaText: BlockMediaText,
  button: BlockButton,
  link: BlockLink,
  table: BlockTable,
  checklist: BlockChecklist,
  stats: BlockStats,
  timeline: BlockTimeline,
  faq: BlockFaq,
  testimonial: BlockTestimonial,
  techStack: BlockTechStack,
  beforeAfter: BlockBeforeAfter,
  file: BlockFile
}
