import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = <any>await readBody(event);
  const client = <any>await serverSupabaseClient(event);

  const { name, email, message } = body;

  console.log(body);

  const { error } = await client.from("contact_request").insert({
    name,
    email,
    message,
  });
  if (error) return console.log(error);

  return { success: true, message: "Message sent" };
});
