import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const client = await serverSupabaseClient(event);

  // Parse and validate parameters
  const page = Math.max(1, parseInt(query.page as string) || 1);
  const itemsPerPage = Math.min(
    100,
    Math.max(1, parseInt(query.itemsPerPage as string) || 10)
  );
  const sortBy = (query.sortBy as string) || "created_at";
  const order = query.order === "asc";
  const search = query.search ? (query.search as string).trim() : null;
  const status = query.status ? (query.status as string) : null;

  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  try {
    // Single optimized query using LEFT JOIN to get tags with their usage counts
    const queryBuilder = client.from("blogs_tag").select(
      `
        id,
        created_at,
        title,
        status,
        blogs!left(count)
      `,
      { count: "exact" }
    );

    // Apply filters
    if (search) {
      queryBuilder.ilike("title", `%${search}%`);
    }

    if (status) {
      queryBuilder.eq("status", status);
    }

    // Apply sorting and pagination
    const {
      data: tags,
      error,
      count,
    } = await queryBuilder.order(sortBy, { ascending: order }).range(from, to);

    if (error) {
      throw createError({
        statusCode: parseInt(error.code) || 500,
        statusMessage: error.message,
      });
    }

    // Transform the data to include usage counts
    const transformedTags = (tags || []).map((tag: any) => ({
      id: tag.id,
      created_at: tag.created_at,
      title: tag.title,
      status: tag.status,
      count: tag.blogs?.length || 0,
    }));

    return {
      tags: transformedTags,
      pagination: {
        itemsPerPage,
        currentPage: page,
        totalItems: count || 0,
        totalPages: count ? Math.ceil(count / itemsPerPage) : 0,
      },
    };
  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Internal server error",
    });
  }
});
