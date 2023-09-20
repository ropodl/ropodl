import jwt from "jsonwebtoken";

const user = {
  id: "64f870233a4be6d760ba0801",
  name: "Saroj Poudel",
  email: "sarox14@gmail.com",
  password: process.env.ADMIN_PASS,
};
export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const user = await UserSchema.findOne({ email });
  if (!user)
    return createError({
      statusCode: 401,
      statusMessage: "Email/Password do not match",
    });

  const matched = await user.comparePassword(password);
  if (!matched)
    return createError({
      statusCode: 401,
      statusMessage: "Email/Password do not match",
    });

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return {
    success: "ok",
    user: { name: user.name, email: user.email, token, role: user.role },
  };
});
