import { isValidObjectId } from "../../utils/mongoose";

export default defineEventHandler(async (event) => {
  const id = <string>getRouterParam(event, "id");

  if (!isValidObjectId(id))
    return createError({ statusCode: 404, statusMessage: "Blog ID not valid" });

  const blog = await BlogSchema.findById(id);
  if (!blog)
    return createError({ statusCode: 404, statusMessage: "Blog not found" });

  return blog;
});
