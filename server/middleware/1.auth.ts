export default defineEventHandler(async (event) => {
  const headers = await getRequestHeaders(event);
  console.log(headers);
});
