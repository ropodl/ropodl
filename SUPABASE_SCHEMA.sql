-- Supabase Schema for Ropodl

-- 1. Create Enums
CREATE TYPE "public"."role" AS ENUM('admin', 'writer', 'user');
CREATE TYPE "public"."blog_status" AS ENUM('draft', 'published', 'archived');
CREATE TYPE "public"."portfolio_status" AS ENUM('draft', 'published', 'archived');

-- 2. Create Tables
CREATE TABLE "public"."media" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"filename" varchar(255) NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"file_url" text NOT NULL,
	"size_bytes" integer NOT NULL,
	"alt_text" text,
	"uploaded_by" uuid REFERENCES auth.users(id),
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "public"."blog_categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"category_name" varchar(60) NOT NULL UNIQUE,
	"category_slug" varchar(120) NOT NULL UNIQUE,
	"category_excerpt" varchar(200),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "public"."blog_tags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"tag_name" varchar(60) NOT NULL UNIQUE,
	"tag_slug" varchar(120) NOT NULL UNIQUE,
	"tag_excerpt" varchar(200),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "public"."blogs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"blog_title" varchar(60) NOT NULL UNIQUE,
	"blog_slug" varchar(120) NOT NULL UNIQUE,
	"blog_excerpt" varchar(200),
	"blog_content" text NOT NULL,
	"featured_image" integer REFERENCES media(id),
	"category_id" integer REFERENCES blog_categories(id),
	"blog_status" "blog_status" NOT NULL DEFAULT 'draft',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "public"."blog_to_tags" (
	"blog_id" integer REFERENCES blogs(id) ON DELETE CASCADE,
	"tag_id" integer REFERENCES blog_tags(id) ON DELETE CASCADE,
	PRIMARY KEY ("blog_id", "tag_id")
);

CREATE TABLE "public"."work_types" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"title" varchar(100) NOT NULL UNIQUE,
	"slug" varchar(100) NOT NULL UNIQUE,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "public"."portfolios" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"title" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL UNIQUE,
	"content" text NOT NULL,
	"featured_image_id" integer REFERENCES media(id),
	"work_type_id" integer REFERENCES work_types(id) ON DELETE SET NULL,
	"status" "portfolio_status" NOT NULL DEFAULT 'draft',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "public"."contact_requests" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"name" varchar(120) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"status" varchar(20) DEFAULT 'unread',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "public"."audit_logs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"user_id" uuid REFERENCES auth.users(id),
	"action" varchar(100) NOT NULL,
	"entity_type" varchar(50),
	"entity_id" integer,
	"old_data" jsonb,
	"new_data" jsonb,
	"ip_address" varchar(45),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS and add basic policies
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public blogs are viewable by everyone" ON public.blogs FOR SELECT USING (blog_status = 'published');

ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published portfolios are viewable by everyone" ON public.portfolios FOR SELECT USING (status = 'published');

-- (Add more policies for admins as needed)
