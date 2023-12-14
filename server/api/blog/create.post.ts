import { uploadBlogImage } from "~/server/utils/cloudinary";
import objectify from "~/server/utils/objectify";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
  const form = await readFormData(event);

  const { title, content, image, status } = await objectify(form);

  const slug = slugify(title, {
    lower: true,
    trim: true,
  });

  const featuredImage = await uploadBlogImage(image);

  const blog = await new BlogSchema({
    title,
    slug,
    content,
    featuredImage,
    status,
  });

  // if (categories) {
  //   for (let item of categories.split(",")) {
  //     if (!isValidObjectId(item)) {
  //       return sendError(res, "Invalid Category");
  //     }
  //   }
  //   blog.categories = categories.split(",");
  // }

  // if (tags) {
  //   for (let item of tags.split(",")) {
  //     if (!isValidObjectId(item)) {
  //       return sendError(res, "Invalid Tag/s");
  //     }
  //   }
  //   blog.tags = tags.split(",");
  // }

  const { id } = await blog.save();

  return {
    id,
    success: true,
  };
});
