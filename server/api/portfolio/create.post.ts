import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const form = <any>await readBody(event);
  const client = <any>await serverSupabaseClient(event);

  const { title, content, featured_image, main_image, status } = form;

  const { data, error } = await client
    .from("portfolios")
    .insert({
      title,
      content,
      featured_image,
      main_image,
      status,
    })
    .select()
    .single();

  if (error) {
    return createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return {
    id: data.id,
    success: true,
  };
});
