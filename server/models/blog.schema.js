import { defineMongooseModel } from "#nuxt/mongoose";

export const BlogSchema = defineMongooseModel({
  name: "Blogs",
  schema: {
    title: {
      type: "string",
      required: true,
    },
  },
});
