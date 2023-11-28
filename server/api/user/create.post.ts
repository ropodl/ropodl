export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password } = body;

  console.log(body);

  const oldUser = await UserSchema.findOne({ email });
  if (oldUser)
    return createError({
      statusCode: 403,
      statusMessage: "User already exists",
    });

  const user = await new UserSchema({ name, email, password, role: "admin" });

  const { id } = await user.save();
  return {
    id,
    success: true,
  };
});
