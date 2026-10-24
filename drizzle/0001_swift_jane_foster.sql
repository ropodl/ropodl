CREATE TABLE `blogs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`imageKey` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `blogs_status_createdAt_idx` ON `blogs` (`status`,`createdAt`);--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_slug_unique` ON `blogs` (`slug`);--> statement-breakpoint
CREATE TABLE `portfolios` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`imageKey` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `portfolios_status_createdAt_idx` ON `portfolios` (`status`,`createdAt`);--> statement-breakpoint
CREATE UNIQUE INDEX `portfolios_slug_unique` ON `portfolios` (`slug`);
--> statement-breakpoint
INSERT INTO `blogs` (`id`, `title`, `slug`, `summary`, `content`, `imageKey`, `status`, `createdAt`, `updatedAt`) VALUES
	('blog-designing-for-clarity', 'Designing for clarity, not decoration', 'designing-for-clarity', 'A few practical thoughts on making interfaces easier to understand, one deliberate decision at a time.', 'A few practical thoughts on making interfaces easier to understand, one deliberate decision at a time.', NULL, 'published', 1792324800000, 1792324800000),
	('blog-small-details-that-matter', 'The small details that make a site feel finished', 'small-details-that-matter', 'Thoughtful spacing, useful feedback, and the little interactions that make digital products feel considered.', 'Thoughtful spacing, useful feedback, and the little interactions that make digital products feel considered.', NULL, 'published', 1790683200000, 1790683200000),
	('blog-building-in-public', 'Learning by building in public', 'building-in-public', 'Why sharing work in progress can make the process more useful, honest, and enjoyable.', 'Why sharing work in progress can make the process more useful, honest, and enjoyable.', NULL, 'published', 1786536000000, 1786536000000);
--> statement-breakpoint
INSERT INTO `portfolios` (`id`, `title`, `slug`, `summary`, `content`, `imageKey`, `status`, `createdAt`, `updatedAt`) VALUES
	('project-portfolio-template', 'Portfolio Template', 'portfolio-template', 'A quiet, minimal home for selected work and writing, designed to keep the focus on the details that matter.', 'A quiet, minimal home for selected work and writing, designed to keep the focus on the details that matter.', NULL, 'published', 1790856000000, 1790856000000),
	('project-design-system', 'Design System', 'design-system', 'A flexible component library with thoughtful defaults, accessible patterns, and a cohesive visual language.', 'A flexible component library with thoughtful defaults, accessible patterns, and a cohesive visual language.', NULL, 'published', 1790856000000, 1790856000000),
	('project-kathmandu-explorer', 'Kathmandu Explorer', 'kathmandu-explorer', 'A local guide to finding memorable places, independent shops, and new experiences around Kathmandu.', 'A local guide to finding memorable places, independent shops, and new experiences around Kathmandu.', NULL, 'published', 1746100800000, 1746100800000);
