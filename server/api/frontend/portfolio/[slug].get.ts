import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const slug = <string>getRouterParam(event, "slug");

  const client = await serverSupabaseClient(event);

  const { data: portfolio, error } = await client
    .from("portfolios")
    .select("title,content,main_image")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return portfolio;
});
