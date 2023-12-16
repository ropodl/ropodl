import { isValidObjectId } from "../../utils/mongoose";

export default defineEventHandler(async (event) => {
  // console.log(event);
  const { slug: id } = getRouterParams(event);

  if (!isValidObjectId(id)) return createError("Blog ID not valid");

  const blog = await BlogSchema.findById(id);
  if (!blog) return createError("Blog not found");

  await BlogSchema.findByIdAndDelete(id);

  return { success: true, message: "Blog deleted successfully" };
});
