import { serverSupabaseClient } from "#supabase/server";
import { getPagination } from "~/server/utils/paginate";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page, itemsPerPage, sortBy } = query;
  const client = await serverSupabaseClient(event);
  const { from, to } = getPagination(page, itemsPerPage);

  const { data: requests, error } = await client
    .from("contact_request")
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
    requests,
    pagination: {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 100,
      totalPages: 10,
    },
  };
});
