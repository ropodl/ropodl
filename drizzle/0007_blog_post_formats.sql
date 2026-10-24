ALTER TABLE `blogs` ADD `postFormat` text DEFAULT 'standard' NOT NULL;
--> statement-breakpoint
ALTER TABLE `blogs` ADD `formatUrl` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `blogs` ADD `quoteText` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `blogs` ADD `quoteCitation` text DEFAULT '' NOT NULL;
--> statement-breakpoint
UPDATE `site_pages`
SET `content` = json_set(
      `content`,
      '$.blogsHeading', CASE WHEN json_extract(`content`, '$.blogsHeading') = 'Thoughts' THEN 'Blog' ELSE json_extract(`content`, '$.blogsHeading') END,
      '$.blogsEyebrow', CASE WHEN json_extract(`content`, '$.blogsEyebrow') = 'Notes & ideas' THEN 'Blog' ELSE json_extract(`content`, '$.blogsEyebrow') END
    ),
    `updatedAt` = CAST(strftime('%s', 'now') AS INTEGER) * 1000
WHERE `slug` = 'home'
  AND json_valid(`content`)
  AND (json_extract(`content`, '$.blogsHeading') = 'Thoughts' OR json_extract(`content`, '$.blogsEyebrow') = 'Notes & ideas');
--> statement-breakpoint
UPDATE `site_pages`
SET `content` = json_set(
      `content`,
      '$.heading', CASE WHEN json_extract(`content`, '$.heading') = 'Thoughts' THEN 'Blog' ELSE json_extract(`content`, '$.heading') END,
      '$.eyebrow', CASE WHEN json_extract(`content`, '$.eyebrow') = 'Notes & ideas' THEN 'Blog' ELSE json_extract(`content`, '$.eyebrow') END
    ),
    `seoTitle` = replace(`seoTitle`, 'Blogs —', 'Blog —'),
    `updatedAt` = CAST(strftime('%s', 'now') AS INTEGER) * 1000
WHERE `slug` = 'blogs'
  AND json_valid(`content`)
  AND (json_extract(`content`, '$.heading') = 'Thoughts' OR json_extract(`content`, '$.eyebrow') = 'Notes & ideas');