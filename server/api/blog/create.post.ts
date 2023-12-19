import slugify from "slugify";
import { uploadBlogImage } from "~/server/utils/cloudinary";
import objectify from "~/server/utils/objectify";

export default defineEventHandler(async (event) => {
  const form = await readFormData(event);
  console.log("read form data");

  const { title, content, image, status } = await objectify(form);
  console.log("objectify");

  const slug = slugify(title, {
    lower: true,
    trim: true,
  });
  console.log("slugify");

  const featuredImage = await uploadBlogImage(image);
  console.log("uploading done");

  const blog = await new BlogSchema({
    title,
    slug,
    content,
    featuredImage,
    status,
  });
  console.log("new blog");

  const { id } = await blog.save();
  console.log("get id");

  return {
    id,
    success: true,
  };
});
