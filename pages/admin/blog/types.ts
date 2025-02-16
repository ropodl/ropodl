export interface BlogPost {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: FeaturedImage;
  status: boolean;
}
interface FeaturedImage {
  id: string;
  url: string;
}
