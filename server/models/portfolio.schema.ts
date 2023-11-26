import { defineMongooseModel } from "#nuxt/mongoose";

export const PortfolioSchema = defineMongooseModel({
  name: "Portfolio",
  schema: {
    title: {
      type: "string",
      required: true,
    },
    slug: {
      type: "string",
      required: true,
      unique: true,
    },
    excerpt: {
      type: "string",
    },
    featuredImage: {},
    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
  },
});
