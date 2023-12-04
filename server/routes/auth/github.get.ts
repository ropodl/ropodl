export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    const oldUser = UserSchema.findOne({ email: user.email });
    if (oldUser) {
      setSession(event, oldUser);
    } else {
      if (user.email !== "sarox14@gmail.com") {
        const newUser = new UserSchema({
          name: user.name,
          email: user.email,
          password: "password",
          image: {
            url: user.avatar_url,
            name: user.name,
          },
          role: "user",
        });
      } else {
        const newUser = new UserSchema({
          name: "Saroj Poudel",
          email: "sarox14@gmail.com",
          password: "password",
          image: {
            url: user.avatar_url,
            name: user.name,
          },
          role: "user",
        });
        const { id } = await newUser.save();
        // setSession(event, newUser);
        await setUserSession(event, {
          user: {
            name: user.name,
            email: user.email,
          },
        });
        return sendRedirect(event, "/admin/");
      }
    }
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
const setSession = async (event: any, user: any) => {};
