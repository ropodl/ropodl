interface BreadcrumbItem {
  title: string;
  href: string;
}

interface pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}
