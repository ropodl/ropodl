export default (path: string) =>
  process.env.NODE_ENV === "developement" ? path : useStrapiMedia(path);
