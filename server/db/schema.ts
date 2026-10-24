import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'
import type { BlogPostFormat } from '../../shared/types/blog-post-format'

const createdAt = () => integer('createdAt', { mode: 'timestamp_ms' }).notNull()
const updatedAt = () => integer('updatedAt', { mode: 'timestamp_ms' }).notNull()

export type ContentStatus = 'draft' | 'published' | 'archived'
export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'boolean' }).notNull().default(false),
  image: text('image'),
  createdAt: createdAt(),
  updatedAt: updatedAt()
})

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expiresAt', { mode: 'timestamp_ms' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' })
}, table => [index('session_userId_idx').on(table.userId)])

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: integer('accessTokenExpiresAt', { mode: 'timestamp_ms' }),
  refreshTokenExpiresAt: integer('refreshTokenExpiresAt', { mode: 'timestamp_ms' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: createdAt(),
  updatedAt: updatedAt()
}, table => [index('account_userId_idx').on(table.userId)])

export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expiresAt', { mode: 'timestamp_ms' }).notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt()
}, table => [index('verification_identifier_idx').on(table.identifier)])

export const blogs = sqliteTable('blogs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  summary: text('summary').notNull().default(''),
  seoTitle: text('seoTitle').notNull().default(''),
  seoDescription: text('seoDescription').notNull().default(''),
  content: text('content').notNull().default(''),
  postFormat: text('postFormat').$type<BlogPostFormat>().notNull().default('standard'),
  formatUrl: text('formatUrl').notNull().default(''),
  quoteText: text('quoteText').notNull().default(''),
  quoteCitation: text('quoteCitation').notNull().default(''),
  imageKey: text('imageKey'),
  categoryId: text('categoryId'),
  status: text('status').$type<ContentStatus>().notNull().default('draft'),
  createdAt: createdAt(),
  updatedAt: updatedAt()
}, table => [
  index('blogs_status_createdAt_idx').on(table.status, table.createdAt),
  uniqueIndex('blogs_slug_unique').on(table.slug)
])

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  summary: text('summary').notNull().default(''),
  seoTitle: text('seoTitle').notNull().default(''),
  seoDescription: text('seoDescription').notNull().default(''),
  content: text('content').notNull().default(''),
  imageKey: text('imageKey'),
  typeId: text('typeId'),
  status: text('status').$type<ContentStatus>().notNull().default('draft'),
  createdAt: createdAt(),
  updatedAt: updatedAt()
}, table => [
  index('projects_status_createdAt_idx').on(table.status, table.createdAt),
  index('projects_status_type_createdAt_idx').on(table.status, table.typeId, table.createdAt),
  uniqueIndex('projects_slug_unique').on(table.slug)
])

export const blogCategories = sqliteTable('blog_categories', {
  id: text('id').primaryKey(), title: text('title').notNull(), slug: text('slug').notNull(), description: text('description').notNull().default(''), createdAt: createdAt(), updatedAt: updatedAt()
}, table => [index('blog_categories_title_idx').on(table.title), uniqueIndex('blog_categories_slug_unique').on(table.slug)])

export const blogTags = sqliteTable('blog_tags', {
  id: text('id').primaryKey(), title: text('title').notNull(), slug: text('slug').notNull(), createdAt: createdAt(), updatedAt: updatedAt()
}, table => [index('blog_tags_title_idx').on(table.title), uniqueIndex('blog_tags_slug_unique').on(table.slug)])

export const blogCategoryLinks = sqliteTable('blog_category_links', {
  blogId: text('blogId').notNull().references(() => blogs.id, { onDelete: 'cascade' }),
  categoryId: text('categoryId').notNull().references(() => blogCategories.id, { onDelete: 'cascade' })
}, table => [uniqueIndex('blog_category_links_unique').on(table.blogId, table.categoryId)])

export const blogTagLinks = sqliteTable('blog_tag_links', {
  blogId: text('blogId').notNull().references(() => blogs.id, { onDelete: 'cascade' }),
  tagId: text('tagId').notNull().references(() => blogTags.id, { onDelete: 'cascade' })
}, table => [index('blog_tag_links_tagId_idx').on(table.tagId), uniqueIndex('blog_tag_links_unique').on(table.blogId, table.tagId)])

export const projectTypes = sqliteTable('project_types', {
  id: text('id').primaryKey(), title: text('title').notNull(), slug: text('slug').notNull(), description: text('description').notNull().default(''), createdAt: createdAt(), updatedAt: updatedAt()
}, table => [index('project_types_title_idx').on(table.title), uniqueIndex('project_types_slug_unique').on(table.slug)])

export const projectTypeLinks = sqliteTable('project_type_links', {
  projectId: text('projectId').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  typeId: text('typeId').notNull().references(() => projectTypes.id, { onDelete: 'cascade' })
}, table => [uniqueIndex('project_type_links_unique').on(table.projectId, table.typeId)])

export const contactMessages = sqliteTable('contact_messages', {
  id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull(), subject: text('subject').notNull(), message: text('message').notNull(),
  status: text('status').$type<'new' | 'read' | 'replied' | 'archived'>().notNull().default('new'), createdAt: createdAt(), updatedAt: updatedAt()
}, table => [index('contact_messages_createdAt_idx').on(table.createdAt), index('contact_messages_status_createdAt_idx').on(table.status, table.createdAt)])

export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(), action: text('action').notNull(), entity: text('entity').notNull(), entityId: text('entityId'), userId: text('userId'), userEmail: text('userEmail'), ipAddress: text('ipAddress'), createdAt: createdAt()
}, table => [index('audit_logs_createdAt_idx').on(table.createdAt)])

export const sitePages = sqliteTable('site_pages', {
  slug: text('slug').primaryKey(), content: text('content').notNull().default('{}'), seoTitle: text('seoTitle').notNull().default(''), seoDescription: text('seoDescription').notNull().default(''), updatedAt: updatedAt()
})

export const siteMetrics = sqliteTable('site_metrics', {
  day: text('day').notNull(),
  event: text('event').notNull(),
  slug: text('slug').notNull().default(''),
  rating: text('rating').notNull().default(''),
  count: integer('count').notNull().default(0),
  updatedAt: updatedAt()
}, table => [uniqueIndex('site_metrics_day_event_slug_rating_unique').on(table.day, table.event, table.slug, table.rating)])
