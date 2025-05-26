import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const id = <string>getRouterParam(event, "id");
  const form = <any>await readBody(event);

  const client = <any>await serverSupabaseClient(event);

  const { title, content, featured_image, status, excerpt } = form;

  const { error } = await client
    .from("blogs")
    .update({ title, content, excerpt, featured_image, status })
    .eq("id", id)
    .select();

  if (error) {
    return createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return { success: true };
});
