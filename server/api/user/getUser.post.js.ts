export default defineEventHandler(async (event) => {
  const body = readBody(event);
  const { email } = body;
  console.log(email);

  // return "Hello Nitro";
});
