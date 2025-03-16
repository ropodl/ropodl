import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const id = getRouterParam(event, "id");

  const { data, error } = await client.from("contact_request").select("*").eq("id", id).maybeSingle();

  if (error) return createError({
    statusCode: parseInt(error.code),
    statusMessage: error.message
  })

  return data;
})
