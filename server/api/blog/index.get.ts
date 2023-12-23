import { serverSupabaseClient } from "#supabase/server";
import { getPagination } from "~/server/utils/paginate";

interface Blog {
  id: String;
  title: String;
  slug: String;
  excerpt: String;
  featuredImage: Object;
  status: String;
  createdAt: String;
  updatedAt: String;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  // const { page, itemsPerPage, sortBy } = query;
  const client = await serverSupabaseClient(event);
  // const { from, to } = getPagination(page, itemsPerPage);

  const { data: blogs, error } = await client
    .from("blogs")
    .select("*")
    .range(0, 10)
    .order("created_at", { ascending: false });

  // console.log(blogs);

  if (error) {
    console.log(error);
    return error;
  }

  return {
    blogs,
    pagination: {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 100,
      totalPages: 10,
    },
  };
});
