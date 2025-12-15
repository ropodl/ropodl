export interface Portfolio {
  id: number;
  title: string;
  slug: string;
  content?: string;
  status?: string;
  featured_image?: string;
  portfolio_type_id?: number;
  created_at?: Date;
  updated_at?: Date;
  type?: PortfolioType
}

export interface PortfolioType {
  id: number;
  title: string;
  slug: string;
}