ALTER TABLE `portfolio_types` RENAME TO `project_types`;
--> statement-breakpoint
ALTER TABLE `portfolios` RENAME TO `projects`;
--> statement-breakpoint
ALTER TABLE `portfolio_type_links` RENAME TO `project_type_links`;
--> statement-breakpoint
ALTER TABLE `project_type_links` RENAME COLUMN `portfolioId` TO `projectId`;
--> statement-breakpoint
DROP INDEX `portfolios_status_createdAt_idx`;
--> statement-breakpoint
CREATE INDEX `projects_status_createdAt_idx` ON `projects` (`status`, `createdAt`);
--> statement-breakpoint
DROP INDEX `portfolios_slug_unique`;
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);
--> statement-breakpoint
DROP INDEX `portfolio_types_slug_unique`;
--> statement-breakpoint
CREATE UNIQUE INDEX `project_types_slug_unique` ON `project_types` (`slug`);
--> statement-breakpoint
DROP INDEX `portfolio_type_links_unique`;
--> statement-breakpoint
CREATE UNIQUE INDEX `project_type_links_unique` ON `project_type_links` (`projectId`, `typeId`);
