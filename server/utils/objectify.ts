export default async function (body: any) {
  const data: any = {};

  for (const entry of body.entries()) {
    const [key, value] = await entry;
    data[key] = await value;
  }

  return data;
}
