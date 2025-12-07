export interface blog {
  id: number;
  title: string;
  excerpt?: string;
  slug: string;
  content: string;
  featured_image?: string;
  created_at: string;
  updated_at: string;
  status: status;
}

enum status {
  draft = 'draft',
  published = 'published',
}

export interface category {
  id: number;
  title: string;
}

export interface tag {
  id: number;
  title: number;
}