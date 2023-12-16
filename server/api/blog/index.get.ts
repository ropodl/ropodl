import { paginate } from "~/server/utils/paginate";

interface Blog {
  id: String;
  title: String;
  slug: String;
  excerpt: String;
  featuredImage: Object;
  status: String;
  createdAt: String;
  updatedAt: String;
}

export default defineEventHandler(async (event) => {
  const paginatedBlogs = await paginate(
    BlogSchema,
    1,
    8,
    {},
    { createdAt: "-1" }
  );
  console.log(JSON.stringify(paginatedBlogs));
  const blogs = await Promise.all(
    await paginatedBlogs.documents.map(async (blog: Blog) => {
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
  return { blogs, pagination: paginatedBlogs.pagination };
});
