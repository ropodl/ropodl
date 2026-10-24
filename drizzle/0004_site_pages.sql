CREATE TABLE `site_pages` (
	`slug` text PRIMARY KEY NOT NULL,
	`content` text DEFAULT '{}' NOT NULL,
	`seoTitle` text DEFAULT '' NOT NULL,
	`seoDescription` text DEFAULT '' NOT NULL,
	`updatedAt` integer NOT NULL
);
