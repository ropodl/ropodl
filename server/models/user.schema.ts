import { defineMongooseModel } from "#nuxt/mongoose";
import bcrypt from "bcryptjs";

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
    password: {
      type: String,
      required: true,
      // select: false,
    },
  },
  options: {
    methods: {
      async comparePassword(password) {
        // console.log("this", this.pass);

        const result = await bcrypt.compare(password, this.password);
        return result;
      },
    },
  },
  hooks(schema) {
    schema.pre("save", async function (this, next) {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
      }
      next();
    });
  },
});
