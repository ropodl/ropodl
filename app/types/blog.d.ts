export interface blog {
  id?: number;
  title: string | null;
  excerpt?: string | null;
  slug?: string | null;
  content: string | null;
  featured_image?: featured_image | null;
  created_at?: string | null;
  updated_at?: string | null;
  status?: status | null;
}

enum status {
  draft = 'draft',
  published = 'published',
}

export interface featured_image {
  id: number;
  filename: string;
  mimeType: string;
  fileUrl: string;
  sizeBytes: number;
  altText?: string;
  uploadedBy: number;
  metadata?: image_meta; // Nested here based on your JSON
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface image_meta {
  variants: image_variants;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface image_variants {
  blur?: string;
  card?: string;
  full?: string;
}

export interface category {
  id: number;
  title: string;
}

export interface tag {
  id: number;
  title: number;
}
