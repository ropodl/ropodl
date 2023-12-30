import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const id = <string>getRouterParam(event, "id");
  console.log(id);

  const client = await serverSupabaseClient(event);

  const { data: portfolio, error } = await client
    .from("portfolios")
    .select()
    .eq("id", parseInt(id))
    .single();

  if (error) return console.log("error" + error.message);

  console.log(portfolio);
  return portfolio;
});
