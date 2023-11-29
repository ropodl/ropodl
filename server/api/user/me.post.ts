export default defineEventHandler(async (event) => {
  console.log(event);

  const body = await readBody(event);
  const { email } = body;
  console.log(body);
  const user = await UserSchema.findOne({ email });
  console.log(user);
  return user;
});
