import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from("portfolios")
    .select("id,title,featured_image,created_at")
    .order("created_at", { ascending: false })
    .eq("status", true);
  if (error) return console.log(error);
  console.log(data);

  return data;
});
