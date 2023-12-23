import { serverSupabaseClient } from "#supabase/server";
// import { paginate } from "~/server/utils/paginate";
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from("blogs")
    .select("title,slug,featured_image, created_at")
    .order("created_at", { ascending: false })
    .eq("status", true);
  if (error) return console.log(error);
  console.log(data);

  return data;
});
