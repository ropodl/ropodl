export default (path: string) =>
  process.env.NODE_ENV === "developement" ? useStrapiMedia(path) : path;
