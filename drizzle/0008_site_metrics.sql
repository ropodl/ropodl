CREATE TABLE `site_metrics` (
  `day` text NOT NULL,
  `event` text NOT NULL,
  `slug` text DEFAULT '' NOT NULL,
  `rating` text DEFAULT '' NOT NULL,
  `count` integer DEFAULT 0 NOT NULL,
  `updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `site_metrics_day_event_slug_rating_unique` ON `site_metrics` (`day`, `event`, `slug`, `rating`);