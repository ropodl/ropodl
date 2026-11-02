ALTER TABLE `blogs` ADD `publishedAt` integer;
--> statement-breakpoint
ALTER TABLE `projects` ADD `publishedAt` integer;
--> statement-breakpoint
UPDATE `blogs` SET `publishedAt` = `createdAt` WHERE `status` = 'published';
--> statement-breakpoint
UPDATE `projects` SET `publishedAt` = `createdAt` WHERE `status` = 'published';
