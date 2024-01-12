import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const id = <string>getRouterParam(event, "id");

  const { data, error } = await client
    .from("portfolios")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return data;
});
