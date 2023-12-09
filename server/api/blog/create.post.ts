import { uploadBlogImage } from "~/server/utils/cloudinary";
import objectify from "~/server/utils/objectify";

export default defineEventHandler(async (event) => {
  const form = await readFormData(event);
  console.log(form);

  const { title, image, status } = await objectify(form);

  console.log(image);
  const slug = title;

  // cloudify here
  const { secure_url, public_id } = await uploadBlogImage(image);

  console.log(secure_url, public_id);

  // let featuredImage = {
  //   url:
  //     (process.env.app_dev ? "http://" : "https://") +
  //     req.hostname +
  //     (process.env.app_port ? `:${process.env.app_port}` : "") +
  //     "/" +
  //     file.path,
  //   name: file.filename,
  // };

  const blog = await new BlogSchema({
    title,
    slug,
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

  // res.json({
  //   success: true,
  //   blog: {
  //     title,
  //     content,
  //     excerpt,
  //     status,
  //     slug,
  //     visibility,
  //     featuredImage,
  //     categories,
  //     tags,
  //   },
  // });
  return id;
});
