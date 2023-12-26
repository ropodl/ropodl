import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const id = <string>getRouterParam(event, "id");

  const { data, error } = await client
    .from("blogs")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) return console.log(error);

  return data;
});
