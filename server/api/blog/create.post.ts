import { serverSupabaseClient } from "#supabase/server";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
  const form = <any>await readBody(event);
  const client = <any>await serverSupabaseClient(event);
  console.log(form);

  const { title, content, featured_image, status, excerpt } = form;

  const slug = slugify(title, {
    lower: true,
    trim: true,
  });

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
