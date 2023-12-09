import { defineMongooseModel } from "#nuxt/mongoose";

export const BlogSchema = defineMongooseModel({
  name: "Blog",
  schema: {
    title: {
      type: "string",
      required: true,
      min: [3, "Title must be minimum 3 characters"],
    },
    slug: {
      type: "string",
      required: true,
      unique: true,
    },
    excerpt: {
      type: "string",
    },
    // featuredImage: { type: Object, required: true, url: String, name: String },
    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
  },
  options: {
    timestamps: true,
  },
});
