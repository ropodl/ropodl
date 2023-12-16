import { defineMongooseModel } from "#nuxt/mongoose";

export const BlogSchema = defineMongooseModel({
  name: "Blog",
  schema: {
    title: {
      type: String,
      required: true,
      min: [3, "Title must be minimum 3 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      min: [3, "Excerpt must be minimum 3 characters"],
      max: [120, "Excerpt must be maximum 120 characters"],
    },
    featuredImage: { type: Object, required: true, url: String, name: String },
    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
  },
  options: {
    timestamps: true,
  },
});
