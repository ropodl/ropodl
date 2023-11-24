export default defineEventHandler(async (event) => {
  const params = getRouterParam(event, "slug");

  const blog = await BlogSchema.findOne({ slug: params });
  console.log(blog);
  return blog;
});
