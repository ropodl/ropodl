import { defineMongooseModel } from "#nuxt/mongoose";

export const UserSchema = defineMongooseModel({
  name: "User",
  schema: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    image: {
      type: Object,
      url: String,
      name: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
  },
});
