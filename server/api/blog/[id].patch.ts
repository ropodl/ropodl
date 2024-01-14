import { serverSupabaseClient } from "#supabase/server";

// import { isValidObjectId } from "../../utils/mongoose";
export default defineEventHandler(async (event) => {
  const id = <string>getRouterParam(event, "id");
  const form = <any>await readBody(event);

  const client = <any>await serverSupabaseClient(event);

  const { title, content, featured_image, status, excerpt } = form;

  // if (!isValidObjectId(id))
  //   return createError({ statusCode: 404, statusMessage: "Blog ID not valid" });
  const { error } = await client
    .from("blogs")
    .update({ title, content, excerpt, featured_image, status })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    return createError({
      statusCode: parseInt(error.code),
      statusMessage: error.message,
    });
  }

  return { success: true };
});
