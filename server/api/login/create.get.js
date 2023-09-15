export default defineEventHandler(async (event) => {
  const oldUser = await UserSchema.findOne({ email: "hello@ropodl.com" });
  if (oldUser) return createError({ statusCode: 404, statusMessage: "Path Not Found", message: "Cannot find any path matching /api/login/create." });
  const user = new UserSchema({ name: "Saroj Poudel", email: "hello@ropodl.com", password: process.env.ADMIN_PASS, role: "admin" });
  await user.save();
  return {
    success: "ok",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
});
