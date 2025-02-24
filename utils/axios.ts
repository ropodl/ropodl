export const useAxios = async (url:string, opts:any = {}) => {
  // const cookie = useCookie("sb-wuhpdygzsumkrgmakgqr-auth-token");
  const config = useRuntimeConfig();
  try {
    const res = await $fetch(url, {
      key: String(Math.random()),
      method: opts.method || "GET",
      params: opts?.params,
      // query: opts.query,
      query: {
        ...opts?.query,
        ...(opts.query?.sortBy && {
          sortBy: opts.query.sortBy.length? opts.query.sortBy[0].key : "",
          order: opts.query.sortBy.length ? opts.query.sortBy[0].order : "",
        }),
      },
      body: opts?.body,
      headers: {
        ...opts?.headers,
        // authorization: `Bearer ${cookie.value}`,
      },
      immediate: true,
    });
    return res;
  } catch (err) {
    // console.error("Error fetching data:", err);
    throw err;
  }
};