export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    console.log(user);
    if (user.email !== "sarox14@gmail.com") {
      createError({
        statusCode: 404,
        statusMessage: "Only Admin Users are allowed",
      });
    } else {
      await setUserSession(event, {
        user: {
          name: user.name,
          email: user.email,
        },
      });
      // githubId: user.id,
      return sendRedirect(event, "/admin/");
    }
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
