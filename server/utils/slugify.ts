import slugify from "slugify";

export const getSlug = (text: string) => {
  return slugify(text, {
    lower: true,
    trim: true,
  });
};
