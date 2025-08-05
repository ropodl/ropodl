export default (path: string) =>
  process.env.NODE_ENV === "development" ? useStrapiMedia(path) : path;
