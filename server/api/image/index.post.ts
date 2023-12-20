export default defineEventHandler(async (event) => {
  const form = await readBody(event);
  console.log(form);

  const featuredImage = await uploadBlogImage(form.image);
  return featuredImage;
});
