import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from("portfolios")
    .select("id,title,featured_image,slug")
    .order("created_at", { ascending: false })
    .eq("status", true);

  if (error) {
    return createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return data;
});
