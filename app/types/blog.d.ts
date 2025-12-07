export interface blog {
  id?: number;
  title?: string|null;
  excerpt?: string|null;
  slug: string|null;
  content: string|null;
  featured_image?: string|null;
  created_at?: string|null;
  updated_at?: string|null;
  status: status|null;
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