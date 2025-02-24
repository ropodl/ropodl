import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const slug = <string>getRouterParam(event, "slug");

  const client = await serverSupabaseClient(event);

  const { data: blog, error } = await client
    .from("blogs")
    .select()
    .eq("slug", slug)
    .maybeSingle();
    console.log(blog)

  if (error) {
    return createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return blog;
});
