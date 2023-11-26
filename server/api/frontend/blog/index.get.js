import { paginate } from "~/server/utils/paginate";
export default defineEventHandler(async (event) => {
  const paginatedBlogs = await paginate(
    BlogSchema,
    1,
    10,
    { status: "Draft" },
    { createdAt: "-1" }
  );
  const blogs = Promise.all(
    await paginatedBlogs.documents.map(async (blog) => {
      console.log(blog.createdAt);
      const { title, slug, featuredImage, createdAt } = blog;
      return {
        title,
        slug,
        featuredImage,
        createdAt,
      };
    })
  );
  return blogs;
});
