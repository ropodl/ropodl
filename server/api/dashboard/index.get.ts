import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {

  const client = await serverSupabaseClient(event);

  const { count: blogCount } = await client.from("blogs").select("id", { count: "exact" });

  return {
    stats: [
      {
        title: "Blogs",
        // number: blogCount,
        icon: "mdi:newspaper",
        color: "error",
      },
      {
        title: "Portfolio",
        number: 0,
        icon: "mdi:image",
        color: "primary",
      },
      {
        title: "Total",
        number: "0",
        icon: "mdi:user",
        color: "purple",
      },
      {
        title: "Contact Request",
        number: "0",
        icon: "mdi:email",
        color: "warning",
      },
    ],
  };
});
