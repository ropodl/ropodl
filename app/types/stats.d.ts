export interface DashboardStats {
  counts: {
    blogs: number;
    media: number;
    users: number;
  };
  recentBlogs: {
    id: number;
    title: string;
    status: 'draft' | 'published' | 'archieved';
    createdAt: string;
  }[];
}
