export default defineEventHandler(async (event) => {
  const form = await readBody(event);
  console.log(form);
  return 'Hello Nitro'
})
