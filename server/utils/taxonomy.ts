import { blogCategories, blogTags, projectTypes } from '../db/schema'

export type TaxonomyKind = 'categories' | 'tags' | 'work-types'

export function getTaxonomyTable(kind: string) {
  if (kind === 'categories') return blogCategories
  if (kind === 'tags') return blogTags
  if (kind === 'work-types') return projectTypes
  throw createError({ statusCode: 404, statusMessage: 'Taxonomy not found.' })
}
