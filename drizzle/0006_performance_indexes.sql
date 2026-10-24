CREATE INDEX `projects_status_type_createdAt_idx` ON `projects` (`status`, `typeId`, `createdAt`);
--> statement-breakpoint
CREATE INDEX `blog_categories_title_idx` ON `blog_categories` (`title`);
--> statement-breakpoint
CREATE INDEX `blog_tags_title_idx` ON `blog_tags` (`title`);
--> statement-breakpoint
CREATE INDEX `blog_tag_links_tagId_idx` ON `blog_tag_links` (`tagId`);
--> statement-breakpoint
CREATE INDEX `project_types_title_idx` ON `project_types` (`title`);
--> statement-breakpoint
CREATE INDEX `contact_messages_createdAt_idx` ON `contact_messages` (`createdAt`);
