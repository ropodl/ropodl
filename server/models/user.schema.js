import { defineMongooseModel } from "#nuxt/mongoose";
import bcrypt from "bcryptjs";

export const UserSchema = defineMongooseModel({
  name: "Users",
  schema: {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: false,
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      required: true,
    },
  },
  hooks(schema) {
    schema.pre("save", async function (next) {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
      }
      next();
    });
    schema.methods.comparePassword = async function (password) {
      const result = await bcrypt.compare(password, this.password);
      return result;
    };
  },
});
