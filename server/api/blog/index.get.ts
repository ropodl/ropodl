import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = <object>getQuery(event);
  const client = await serverSupabaseClient(event);

  const page = <number>parseInt(query.page);
  const itemsPerPage = <number>parseInt(query.itemsPerPage);

  // const { page, itemsPerPage, sortBy } = query;
  // const { from, to } = getPagination(page, itemsPerPage);
  // console.log(from, to);

  const { data: blogs, error } = await client
    .from("blogs")
    .select("*")
    .range(0, 10)
    .order("created_at", { ascending: false });

    if (error) {
      return createError({
        statusCode: parseInt(error.code),
        statusMessage: error.message,
      });
    }

  return {
    blogs,
    pagination: {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
    },
  };
});
