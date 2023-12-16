export default defineEventHandler(async (event) => {
  const params = getRouterParam(event, "id");

  const blog = await BlogSchema.findByIdAndDelete({ id: params });
  console.log(blog);

  return "Hello Nitro";
});
