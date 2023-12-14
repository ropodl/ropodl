export default defineEventHandler(async (event) => {
  const params = getRouterParam(event, "slug");

  const blog = await BlogSchema.findOne({ slug: params });
  if (!blog) return { status: 404, message: "Blog not found" };

  return blog;
});
