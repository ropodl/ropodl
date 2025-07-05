import { serverSupabaseClient } from "#supabase/server";

// Cache client instance to avoid repeated initialization
let cachedClient: any = null;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Reuse client instance when possible
  if (!cachedClient) {
    cachedClient = await serverSupabaseClient(event);
    console.log("Supabase client initialized", cachedClient);
  }
  const client = cachedClient;

  // Parse and validate parameters with defaults
  const page = Math.max(1, parseInt(query.page as string) || 1);
  const itemsPerPage = Math.min(
    100,
    Math.max(1, parseInt(query.itemsPerPage as string) || 10)
  ); // Cap at 100
  const sortBy = (query.sortBy as string) || "created_at";
  const order = query.order === "asc";
  const search = query.search ? (query.search as string).trim() : null;
  const status = query.status ? (query.status as string).trim() : null;

  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  // Validate sortBy to prevent injection
  const allowedSortFields = ["created_at", "title", "status"];
  const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "created_at";

  try {
    // Build query with optimized select - only fetch what's needed
    let queryBuilder = client.from("blogs").select(
      `
        id,
        created_at,
        title,
        status,
        category!inner(title)
      `,
      { count: "exact" }
    );

    // Apply filters efficiently
    if (search && search.length >= 2) {
      // Minimum search length for performance
      queryBuilder = queryBuilder.ilike("title", `%${search}%`);
    }

    if (status) {
      queryBuilder = queryBuilder.eq("status", status);
    }

    // Apply sorting and pagination
    const {
      data: blogs,
      error,
      count,
    } = await queryBuilder
      .order(safeSortBy, { ascending: order })
      .range(from, to);
    console.log(blogs); // Log the query for debugging

    if (error) {
      throw createError({
        statusCode: error.code ? parseInt(error.code) : 500,
        statusMessage: error.message || "Database query failed",
      });
    }

    // Transform data to match expected format
    const transformedBlogs =
      blogs?.map((blog: any) => ({
        id: blog.id,
        created_at: blog.created_at,
        title: blog.title,
        status: blog.status,
        category: blog.category?.title || null,
      })) || [];

    const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;

    return {
      blogs: transformedBlogs,
      pagination: {
        itemsPerPage,
        currentPage: page,
        totalItems: count || 0,
        totalPages,
      },
    };
  } catch (err: any) {
    // Enhanced error handling
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Internal server error",
    });
  }
});
