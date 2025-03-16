import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const id = getRouterParam(event, "id") as string;

  const { data, error } = await client
    .from("blogs")
    .select(`*, category(*)`)
    .eq("id", id)
    .single();


  if (error) {
    return createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return data;
});
