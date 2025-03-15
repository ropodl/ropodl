import { serverSupabaseClient } from "#supabase/server";

interface Pagination {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

interface ContactRequest {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface ResponseData {
  requests: ContactRequest[];
  pagination: Pagination;
}

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

  let call = client
    .from("contact_request")
    .select("id, created_at, name, email, message", { count: "exact" })

  if (search) call = call.ilike('name', `%${search}%`);

  call = call.order(sortBy, { ascending: order }).range(from, to)

  const { data: requests, error, count } = await call;

  if (error) {
    throw createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return {
    requests: requests || [],
    pagination: {
      itemsPerPage,
      currentPage: page,
      totalItems: count || 0,
      totalPages: count ? Math.ceil(count / itemsPerPage) : 0,
    },
  };
}
);
