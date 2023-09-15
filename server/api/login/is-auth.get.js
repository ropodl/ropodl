import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const header = event.req.headers.authorization;
  const token = header.split("Bearer ")[1];

  if (!token)
    return createError({ statusCode: 401, statusMessage: "Invalid Action" });

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { id } = decodedToken;

  const user = await UserSchema.findById(id);
  if (!user)
    return createError({ statusCode: 404, statusMessage: "User not found" });

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
