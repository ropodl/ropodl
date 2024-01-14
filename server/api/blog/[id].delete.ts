import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const id = <string>getRouterParam(event, "id");
  console.log(id);

  const { data, error } = await client.from("portfolios").delete().eq("id", id);

  if (error) {
    return createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return data;

  // return { success: true, message: "Blog deleted successfully" };
});
