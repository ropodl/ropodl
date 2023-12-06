export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    const { name, email, avatar_url } = user;
    console.log(user);

    const oldUser = await UserSchema.findOne({ email });
    console.log(oldUser);

    if (oldUser) {
      await setUserSession(event, {
        user: {
          id: oldUser.id,
          name,
          email,
          image: {
            url: avatar_url,
            name,
          },
          role: oldUser.role,
        },
      });
      const route = oldUser.role == "admin" ? "/admin/" : "/";
      return sendRedirect(event, route);
    } else {
      const user = new UserSchema({
        name,
        email,
        image: {
          url: avatar_url,
          name,
        },
        role: email === process.env.ADMIN_USER ? "admin" : "user",
      });
      const { id } = await user.save();
      await setUserSession(event, {
        user: {
          id,
          name,
          email,
          image: {
            url: avatar_url,
            name,
          },
          role: email === process.env.ADMIN_USER ? "admin" : "user",
        },
      });
      return sendRedirect(event, "/admin/");
    }
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
