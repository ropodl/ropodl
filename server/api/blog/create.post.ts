import { uploadBlogImage } from "~/server/utils/cloudinary";
import objectify from "~/server/utils/objectify";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
  const form = await readFormData(event);

  const { title, image, status } = await objectify(form);

  const slug = slugify(title, {
    lower: true,
    trim: true,
  });

  const featuredImage = await uploadBlogImage(image);

  const blog = await new BlogSchema({
    title,
    slug,
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
  // console.log(id);

  return {
    id,
    success: true,
    // blog: {
    //   title,
    //   // content,
    //   // excerpt,
    //   status,
    //   // slug,
    //   // visibility,
    //   featuredImage,
    //   // categories,
    //   // tags,
    // },
  };
});
