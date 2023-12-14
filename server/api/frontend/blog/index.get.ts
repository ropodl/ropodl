import { paginate } from "~/server/utils/paginate";
export default defineEventHandler(async (event) => {
  const paginatedBlogs = await paginate(
    BlogSchema,
    1,
    10,
    { status: "Published" },
    { createdAt: "-1" }
  );
  const blogs = Promise.all(
    await paginatedBlogs.documents.map(async (blog: any) => {
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
