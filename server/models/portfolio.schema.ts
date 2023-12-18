import { defineMongooseModel } from "#nuxt/mongoose";

export const PortfolioSchema = defineMongooseModel({
  name: "Portfolio",
  schema: {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
    },
    featuredImage: {
      type: Object,
      required: true,
      url: String,
      name: String,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
  },
});
