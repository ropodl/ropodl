import { serverSupabaseClient } from "#supabase/server";
import type { H3Event } from "h3";

interface Pagination {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
  // total: number;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface ResponseData {
  blogs: Blog[];
  pagination: Pagination;
}

export default defineEventHandler(
  async (event: H3Event): Promise<ResponseData | Error> => {
    const query = getQuery(event);
    const client = await serverSupabaseClient(event);

    const page = <number>parseInt(query.page as string) || 1;
    const itemsPerPage = <number>parseInt(query.itemsPerPage as string) || 10;
    const sortBy = <string>(query.sortBy || 'created_at');
    const order = query.order === "asc";
    const search = <string>(query.search || null);

    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let call = client
      .from("blogs")
      .select("id, created_at, title, status", { count: "exact" })

    if (search) call = call.ilike('title', `%${search}%`);

    call = call.order(sortBy, { ascending: order }).range(from, to)

    const { data: blogs, error, count } = await call;

    if (error) {
      throw createError({
        statusCode: parseInt(error.code),
        statusMessage: error.message,
      });
    }

    return {
      blogs: blogs || [],
      pagination: {
        itemsPerPage,
        currentPage: page,
        totalItems: count || 0,
        totalPages: count ? Math.ceil(count / itemsPerPage) : 0,
      },
    };
  }
);
