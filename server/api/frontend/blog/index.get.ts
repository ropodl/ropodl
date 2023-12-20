import { serverSupabaseClient } from "#supabase/server";
// import { paginate } from "~/server/utils/paginate";
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return console.log(error);

  return data;
});
