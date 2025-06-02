import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const client = await serverSupabaseClient(event);

  const page = <number>parseInt(query.page as string) || 1;
  const itemsPerPage = <number>parseInt(query.itemsPerPage as string) || 10;
  const sortBy = <string>(query.sortBy || "created_at");
  const order = query.order === "asc";
  const search = <string>(query.search || null);
  const status = <string>(query.status || null);

  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let call = client
    .from("blogs_tag")
    .select("id, created_at, title, status", { count: "exact" });

  if (search) call = call.ilike("title", `%${search}%`);

  if (status) call = call.eq("status", status);

  call = call.order(sortBy, { ascending: order }).range(from, to);

  const { data: tags, error, count } = await call;

  if (tags && tags.length > 0) {
    const tagIds = tags.map((cat: any) => cat.id);

    // Query to count usage of each category in the "blogs" table (column is "category")
    const { data: usageCounts, error: usageError } = await client
      .from("blogs")
      .select("tag, count:tag", { count: "exact" })
      .in("tag", tagIds);

    if (usageError) {
      throw createError({
        statusCode: parseInt(usageError.code),
        statusMessage: usageError.message,
      });
    }

    // Map category id to count
    const usageMap: Record<number, number> = {};
    (usageCounts || []).forEach((row: any) => {
      usageMap[row.tag] = row.count;
      // If count is returned as a string, convert to number
      if (typeof row.count === "string") {
        usageMap[row.tag] = parseInt(row.count, 10);
      }
    });

    // Add count to each category
    tags.forEach((tag: any) => {
      tag.count = usageMap[tag.id] || 0;
    });
  }

  if (error) {
    throw createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return {
    tags: tags || [],
    pagination: {
      itemsPerPage,
      currentPage: page,
      totalItems: count || 0,
      totalPages: count ? Math.ceil(count / itemsPerPage) : 0,
    },
  };
});
