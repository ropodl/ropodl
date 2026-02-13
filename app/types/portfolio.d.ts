export interface Portfolio {
  id: number;
  title: string;
  slug: string;
  content: string;
  featuredImageId: number;
  workTypeId: number | null;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  workType?: string; // For listing
}

export interface PortfolioType {
  id: number;
  title: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
