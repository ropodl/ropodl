export default defineEventHandler(async (event) => {
  const params = await getRouterParam(event, "slug");
  console.log(params);

  const blog = await BlogSchema.findOne({ slug: params });
  if (!blog) return { status: 404, message: "Blog not found" };

  return blog;
});
