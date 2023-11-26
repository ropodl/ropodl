export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);
  console.log(form);

  let data;
  for (item of form) {
    console.log(item);
  }
  // const { file } = req;

  // let featuredImage = {
  //   url:
  //     (process.env.app_dev ? "http://" : "https://") +
  //     req.hostname +
  //     (process.env.app_port ? `:${process.env.app_port}` : "") +
  //     "/" +
  //     file.path,
  //   name: file.filename,
  // };

  const blog = new BlogSchema({
    // title,
    // content,
    // excerpt,
    // slug,
    // categories,
    // tags,
    // status,
    // visibility,
    // featuredImage,
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

  // await blog.save();

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
  return 0;
});
