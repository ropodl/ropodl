import { serverSupabaseClient } from "#supabase/server";
import slugify from "slugify";
// import { uploadBlogImage } from "~/server/utils/cloudinary";
import objectify from "~/server/utils/objectify";

export default defineEventHandler(async (event) => {
  const form = <FormData>await readFormData(event);
  const client = <any>await serverSupabaseClient(event);
  console.log(form);

  const { title, content, image, status, excerpt } = await objectify(form);

  const slug = await slugify(title, {
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
      status,
    })
    .select()
    .single();

  if (error) return console.log(error.message);

  console.log(data);

  return {
    id: data.id,
    success: true,
  };
});
