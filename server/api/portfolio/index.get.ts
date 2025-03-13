import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const client = await serverSupabaseClient(event);

  const page = <number>parseInt(query.page as string) || 1;
  const itemsPerPage = <number>parseInt(query.itemsPerPage as string) || 10;
  const sortBy = <string>(query.sortBy || 'created_at');
  const order = query.order === "asc";
  const search = <string>(query.search || null);
  const status = <string>(query.status || null);

  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let call = client.from("portfolios").select("id, created_at, title, status", { count: "exact" })

  if (search) call = call.ilike('title', `%${search}%`);

  if (status) call = call.eq("status", status)

  call = call.order(sortBy, { ascending: order }).range(from, to)

  const { data: portfolios, error, count } = await call;

  if (error) {
    return createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return {
    portfolios: portfolios || [],
    pagination: {
      itemsPerPage,
      currentPage: page,
      totalItems: count || 0,
      totalPages: count ? Math.ceil(count / itemsPerPage) : 0,
    },
  };
});
