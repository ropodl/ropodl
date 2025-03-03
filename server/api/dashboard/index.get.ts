import { serverSupabaseClient } from "#supabase/server";
import type { H3Event } from "h3";

interface StatsItem {
  title: string;
  number: number;
  icon: string;
  color: string;
  growth?: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const client = await serverSupabaseClient(event);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Compute previous month details
  const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const prevMonthYear = prevMonthDate.getFullYear();
  const prevMonth = prevMonthDate.getMonth();

  // Format YYYY-MM-DD for queries
  const formatDate = (year: number, month: number): string =>
    `${year}-${String(month + 1).padStart(2, "0")}-01`;

  const currentMonthStart = formatDate(currentYear, currentMonth);
  const prevMonthStart = formatDate(prevMonthYear, prevMonth);

  // Define query result types
  type CountResult = { count: number | null };

  // Fetch data concurrently
  const [
    { count: totalBlogCount },
    { count: currentMonthBlogCount },
    { count: prevMonthBlogCount },
    { count: totalPortfolioCount },
    { count: currentMonthPortfolioCount },
    { count: prevMonthPortfolioCount },
  ] = await Promise.all([
    client.from("blogs").select("id", { count: "exact" }) as Object as Promise<CountResult>,
    client
      .from("blogs")
      .select("id", { count: "exact" })
      .gte("created_at", currentMonthStart) as Object as Promise<CountResult>,
    client
      .from("blogs")
      .select("id", { count: "exact" })
      .gte("created_at", prevMonthStart)
      .lt("created_at", currentMonthStart) as Object as Promise<CountResult>,
    client.from("portfolios").select("id", { count: "exact" }) as Object as Promise<CountResult>,
    client
      .from("portfolios")
      .select("id", { count: "exact" })
      .gte("created_at", currentMonthStart) as Object as Promise<CountResult>,
    client
      .from("portfolios")
      .select("id", { count: "exact" })
      .gte("created_at", prevMonthStart)
      .lt("created_at", currentMonthStart) as Object as Promise<CountResult>,
  ]);

  // Helper function to calculate growth percentages
  const calculateGrowth = (current: number | null, previous: number | null): string => {
    if (!previous || previous === 0) return current && current > 0 ? "100.0" : "0.0";
    return (((current || 0) - previous) / previous * 100).toFixed(1);
  };

  const blogGrowth = calculateGrowth(currentMonthBlogCount, prevMonthBlogCount);
  const portfolioGrowth = calculateGrowth(currentMonthPortfolioCount, prevMonthPortfolioCount);

  // Construct response
  const stats: StatsItem[] = [
    {
      title: "Blogs",
      number: totalBlogCount || 0,
      icon: "mdi:newspaper",
      color: "error",
      growth: blogGrowth,
    },
    {
      title: "Portfolio",
      number: totalPortfolioCount || 0,
      icon: "mdi:image",
      color: "primary",
      growth: portfolioGrowth,
    },
    {
      title: "Total",
      number: 0,
      icon: "mdi:user",
      color: "purple",
    },
    {
      title: "Contact Request",
      number: 0,
      icon: "mdi:email",
      color: "warning",
    },
  ];

  return { stats };
});
