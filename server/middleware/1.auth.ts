export default defineEventHandler(async (event) => {
  console.log("rewrite auth properly");
  // const { user } = await requireUserSession(event);
  // setResponseHeaders(event, "Access-Control-Allow-Credentials:true");
  // if (user.role !== "admin") return sendRedirect(event, "/", 401);
});

// res.setHeader('Access-Control-Allow-Credentials', true)
// res.setHeader('Access-Control-Allow-Origin', '*')
// // another common pattern
// // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
// res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
// res.setHeader(
//   'Access-Control-Allow-Headers',
//   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
// )
