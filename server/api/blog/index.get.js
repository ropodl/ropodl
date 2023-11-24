import { paginate } from "~/server/utils/paginate";

export default defineEventHandler(async (event) => {
  const paginatedBlogs = await paginate(
    BlogSchema,
    1,
    10,
    {},
    { createdAt: "-1" }
  );
  const blogs = Promise.all(
    await paginatedBlogs.documents.map(async (blog) => {
      const {
        id,
        title,
        slug,
        excerpt,
        featuredImage,
        status,
        createdAt,
        updatedAt,
      } = blog;
      return {
        id,
        title,
        slug,
        excerpt,
        featuredImage,
        status,
        createdAt,
        updatedAt,
      };
    })
  );
  return blogs;
});
