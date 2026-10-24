CREATE TABLE `blog_categories` (
  `id` text PRIMARY KEY NOT NULL,
  `title` text NOT NULL,
  `slug` text NOT NULL,
  `description` text DEFAULT '' NOT NULL,
  `createdAt` integer NOT NULL,
  `updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_categories_slug_unique` ON `blog_categories` (`slug`);
--> statement-breakpoint
CREATE TABLE `blog_tags` (
  `id` text PRIMARY KEY NOT NULL,
  `title` text NOT NULL,
  `slug` text NOT NULL,
  `createdAt` integer NOT NULL,
  `updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_tags_slug_unique` ON `blog_tags` (`slug`);
--> statement-breakpoint
CREATE TABLE `blog_category_links` (
  `blogId` text NOT NULL REFERENCES `blogs`(`id`) ON DELETE CASCADE,
  `categoryId` text NOT NULL REFERENCES `blog_categories`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_category_links_unique` ON `blog_category_links` (`blogId`, `categoryId`);
--> statement-breakpoint
CREATE TABLE `blog_tag_links` (
  `blogId` text NOT NULL REFERENCES `blogs`(`id`) ON DELETE CASCADE,
  `tagId` text NOT NULL REFERENCES `blog_tags`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_tag_links_unique` ON `blog_tag_links` (`blogId`, `tagId`);
--> statement-breakpoint
CREATE TABLE `portfolio_types` (
  `id` text PRIMARY KEY NOT NULL,
  `title` text NOT NULL,
  `slug` text NOT NULL,
  `description` text DEFAULT '' NOT NULL,
  `createdAt` integer NOT NULL,
  `updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `portfolio_types_slug_unique` ON `portfolio_types` (`slug`);
--> statement-breakpoint
CREATE TABLE `portfolio_type_links` (
  `portfolioId` text NOT NULL REFERENCES `portfolios`(`id`) ON DELETE CASCADE,
  `typeId` text NOT NULL REFERENCES `portfolio_types`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE UNIQUE INDEX `portfolio_type_links_unique` ON `portfolio_type_links` (`portfolioId`, `typeId`);
--> statement-breakpoint
CREATE TABLE `contact_messages` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `subject` text NOT NULL,
  `message` text NOT NULL,
  `status` text DEFAULT 'new' NOT NULL,
  `createdAt` integer NOT NULL,
  `updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `contact_messages_status_createdAt_idx` ON `contact_messages` (`status`, `createdAt`);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
  `id` text PRIMARY KEY NOT NULL,
  `action` text NOT NULL,
  `entity` text NOT NULL,
  `entityId` text,
  `userId` text,
  `userEmail` text,
  `ipAddress` text,
  `createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `audit_logs_createdAt_idx` ON `audit_logs` (`createdAt`);
--> statement-breakpoint
ALTER TABLE `blogs` ADD COLUMN `categoryId` text REFERENCES `blog_categories`(`id`) ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE `portfolios` ADD COLUMN `typeId` text REFERENCES `portfolio_types`(`id`) ON DELETE SET NULL;
