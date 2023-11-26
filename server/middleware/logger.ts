export default defineEventHandler(async (event) => {
  return console.log(event + " - " + getResponseStatus(event));
});
