import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const id = <string>getRouterParam(event, "id");
  console.log(id);

  const client = await serverSupabaseClient(event);

  const { data: portfolio, error } = await client
    .from("portfolios")
    .select("title,content,main_image")
    .eq("id", parseInt(id))
    .single();

    if (error) {
      return createError({
        statusCode: parseInt(error.code),
        statusMessage: error.message,
      });
    }
    
  return portfolio;
});
