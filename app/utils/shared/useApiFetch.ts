import type { Ref } from "vue";

type Primitive = string | number | boolean;
export type SearchParam = Primitive | Primitive[] | null | undefined;
export type ValidSearchParam = Exclude<SearchParam, null | undefined>;
export type QueryObject = Record<string, SearchParam | Ref<SearchParam>>;

export interface ApiFetchOptions<Req = unknown, Res = unknown> {
   key?: string;
   method?: string;
   query?: Record<string, SearchParam> | undefined;
   body?: Req;
   headers?: Record<string, string> | undefined;
   auth?: { token?: string } | undefined;
   params?: Record<string, unknown> | undefined;
   baseURL?: string | undefined;
   timeout?: number | undefined;
   responseType?: "json" | "text" | "blob" | string;
   withCredentials?: boolean | undefined;
   immediate?: boolean | undefined;
   onRequest?:
      | ((url: string, opts: ApiFetchOptions<Req, Res>) => void | Promise<void>)
      | null;
   onResponse?: ((res: Res) => Res | Promise<Res>) | null;
   onRequestError?: ((err: unknown) => void | Promise<void>) | null;
   onResponseError?: ((err: unknown) => void | Promise<void>) | null;
   retry?: number | undefined;
   retryDelay?: number | undefined;
}

function removeEmptyKeys<T extends Record<string, unknown>>(
   obj: T,
): Partial<T> {
   return Object.fromEntries(
      Object.entries(obj).filter(
         ([, value]) => value !== null && value !== undefined && value !== "",
      ),
   ) as Partial<T>;
}

export async function useApiFetch<Res = unknown, Req = unknown>(
   url: string,
   opts: ApiFetchOptions<Req, Res> = {},
): Promise<Res> {
   const config = useRuntimeConfig();
   const defaultTimeout = 5000;

   const qCandidate = opts.query as Record<string, unknown> | undefined;

   const fetchOptions = {
      key: opts.key ?? String(Math.random()),
      method: opts.method ?? "GET",
      query: removeEmptyKeys({
         ...qCandidate,
         ...(function () {
            const sortBy = qCandidate?.["sortBy"];
            if (Array.isArray(sortBy) && sortBy.length) {
               const first = sortBy[0] as Record<string, unknown> | undefined;
               if (first && typeof first.key === "string") {
                  return {
                     sortBy: first.key,
                     order:
                        typeof first.order === "string"
                           ? first.order
                           : undefined,
                  } as Record<string, unknown>;
               }
            }
            return {} as Record<string, unknown>;
         })(),
      }),
      body: opts.body,
      headers: {
         "Content-Type": opts.headers?.["Content-Type"] ?? "application/json",
         ...(opts.headers as Record<string, string> | undefined),
         ...(opts.auth?.token
            ? { Authorization: `Bearer ${opts.auth.token}` }
            : {}),
      },
      params: opts.params ?? {},
      baseURL: opts.baseURL ?? config.public?.API_URL ?? "",
      timeout: opts.timeout ?? defaultTimeout,
      responseType: opts.responseType ?? "json",
      withCredentials: opts.withCredentials ?? false,
      immediate: true,
      onRequest: opts.onRequest ?? null,
      onResponse: opts.onResponse ?? null,
      onRequestError: opts.onRequestError ?? null,
      onResponseError: opts.onResponseError ?? null,
      retry: opts.retry ?? 0,
      retryDelay: opts.retryDelay ?? 1000,
   } as const;

   if (typeof fetchOptions.onRequest === "function") {
      // allow interceptor to run before request
      void fetchOptions.onRequest(url, opts);
   }

   let retries = 0;

   const executeRequest = async (): Promise<Res> => {
      try {
         const nitroOpts = fetchOptions as unknown as Parameters<
            typeof $fetch
         >[1];
         const res = await $fetch(url, nitroOpts);

         if (typeof fetchOptions.onResponse === "function") {
            return await fetchOptions.onResponse(res as Res);
         }

         return res as Res;
      } catch (error) {
         if (typeof fetchOptions.onRequestError === "function") {
            void fetchOptions.onRequestError(error);
         }

         if (retries < (fetchOptions.retry ?? 0)) {
            retries += 1;
            await new Promise((r) =>
               setTimeout(r, fetchOptions.retryDelay ?? 1000),
            );
            return executeRequest();
         }

         if (typeof fetchOptions.onResponseError === "function") {
            void fetchOptions.onResponseError(error);
         }

         throw error;
      }
   };

   const response = await executeRequest();

   if (fetchOptions.responseType === "blob") {
      if (typeof response === "string") {
         return new Blob([response]) as unknown as Res;
      }

      if (response instanceof ArrayBuffer) {
         return new Blob([response]) as unknown as Res;
      }

      if (
         typeof response === "object" &&
         response !== null &&
         typeof (response as { byteLength?: number }).byteLength === "number"
      ) {
         return new Blob([
            response as unknown as ArrayBuffer,
         ]) as unknown as Res;
      }

      return response as Res;
   }

   if (fetchOptions.responseType === "text") {
      if (typeof response === "object") {
         return JSON.stringify(response) as unknown as Res;
      }
      return response as Res;
   }
   return response as Res;
}

// Convenience methods
useApiFetch.get = function <R = unknown>(
   url: string,
   opts: ApiFetchOptions<unknown, R> = {},
) {
   return useApiFetch<R, unknown>(url, { ...opts, method: "GET" });
};
useApiFetch.post = function <R = unknown, B = unknown>(
   url: string,
   data: B = {} as B,
   opts: ApiFetchOptions<B, R> = {},
) {
   return useApiFetch<R, B>(url, { ...opts, method: "POST", body: data });
};
useApiFetch.put = function <R = unknown, B = unknown>(
   url: string,
   data: B = {} as B,
   opts: ApiFetchOptions<B, R> = {},
) {
   return useApiFetch<R, B>(url, { ...opts, method: "PUT", body: data });
};
useApiFetch.patch = function <R = unknown, B = unknown>(
   url: string,
   data: B = {} as B,
   opts: ApiFetchOptions<B, R> = {},
) {
   return useApiFetch<R, B>(url, { ...opts, method: "PATCH", body: data });
};
useApiFetch.delete = function <R = unknown>(
   url: string,
   opts: ApiFetchOptions<unknown, R> = {},
) {
   return useApiFetch<R, unknown>(url, { ...opts, method: "DELETE" });
};

export default useApiFetch;
