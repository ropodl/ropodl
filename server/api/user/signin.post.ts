import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const user = await UserSchema.findOne({ email });
  if (!user)
    return createError({
      statusCode: 404,
      statusMessage: "Email/Password do not match",
    });

  console.log(user);

  const matched = await user.comparePassword(password);
  if (!matched)
    return createError({
      statusCode: 404,
      statusMessage: "Email/Password do not match",
    });

  const { id, name, role } = user;

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET
    //, {
    //    expiresIn: "1d",
    //}
  );

  return {
    success: true,
    token,
    user: {
      id,
      name,
      email,
      role,
    },
  };
});
