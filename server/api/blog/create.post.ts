import { serverSupabaseClient } from "#supabase/server";
import { getSlug } from "../../utils/slugify";

export default defineEventHandler(async (event) => {
  const form = <any>await readBody(event);
  const client = <any>await serverSupabaseClient(event);

  const { title, content, featured_image, status, excerpt } = form;

  const slug = getSlug(title);

  const { data, error } = await client
    .from("blogs")
    .insert({
      title,
      slug,
      content,
      excerpt,
      featured_image,
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
