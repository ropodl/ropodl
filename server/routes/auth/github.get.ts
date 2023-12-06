export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    const { name, email, avatar_url } = user;
    console.log(name);

    if (email === "sarox14@gmail.com") {
      await setUserSession(event, {
        user: {
          // githubId: user.id,
          name,
          email,
          image: {
            url: avatar_url,
            name,
          },
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
const setSession = async (event: any, user: any) => {};
