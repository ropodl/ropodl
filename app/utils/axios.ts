export const useAxios = async (url: string, opts: any = {}) => {
  const config = useRuntimeConfig();
  const defaultTimeout = 5000; // 5 seconds default timeout
  const removeEmptyKeys = (obj: any) =>
    Object.fromEntries(
      Object.entries(obj).filter(([, value]) => value !== null && value !== undefined && value !== '')
    );

  try {
    // Build fetch options
    const fetchOptions = {
      key: opts.key || String(Math.random()),
      method: opts.method || "GET",
      query: removeEmptyKeys({
        ...opts?.query,
        ...(opts.query?.sortBy &&
          Array.isArray(opts.query.sortBy) &&
          opts.query.sortBy.length && {
          sortBy: opts.query.sortBy[0].key,
          order: opts.query.sortBy[0].order,
        }),
      }),
      body: opts?.body,
      headers: {
        'Content-Type': opts.headers?.['Content-Type'] || 'application/json',
        ...opts?.headers,
        ...(opts.auth?.token && {
          Authorization: `Bearer ${opts.auth.token}`
        }),
      },
      params: opts?.params || {},
      baseURL: opts?.baseURL || config.public.apiBase || '',
      timeout: opts?.timeout || defaultTimeout,
      responseType: opts?.responseType || 'json',
      withCredentials: opts?.withCredentials || false,
      immediate: opts?.immediate !== false, // Default to true
      onRequest: opts?.onRequest || null,
      onResponse: opts?.onResponse || null,
      onRequestError: opts?.onRequestError || null,
      onResponseError: opts?.onResponseError || null,
      retry: opts?.retry || 0,
      retryDelay: opts?.retryDelay || 1000,
    };

    // Custom request interceptor
    if (typeof fetchOptions.onRequest === 'function') {
      await fetchOptions.onRequest(url, fetchOptions);
    }

    let response;
    let retries = 0;

    // Implement retry logic
    const executeRequest = async () => {
      try {
        const res = await $fetch(url, fetchOptions);

        // Custom response interceptor
        if (typeof fetchOptions.onResponse === 'function') {
          return await fetchOptions.onResponse(res);
        }

        return res;
      } catch (error) {
        // Custom request error interceptor
        if (typeof fetchOptions.onRequestError === 'function') {
          await fetchOptions.onRequestError(error);
        }

        if (retries < fetchOptions.retry) {
          retries++;
          // Wait for the retry delay
          await new Promise(resolve => setTimeout(resolve, fetchOptions.retryDelay));
          return executeRequest();
        }

        // Custom response error interceptor
        if (typeof fetchOptions.onResponseError === 'function') {
          await fetchOptions.onResponseError(error);
        }

        throw error;
      }
    };

    response = await executeRequest();

    // Handle different response types if needed
    if (fetchOptions.responseType === 'blob' && response && typeof response !== 'object') {
      return new Blob([response]);
    }

    if (fetchOptions.responseType === 'text' && response && typeof response === 'object') {
      return JSON.stringify(response);
    }

    return response;
  } catch (err: any) {
    // Enhance error object with additional information
    const enhancedError = {
      error: err,
      message: err.message || 'Unknown error occurred',
      status: err.status || err.statusCode || 500,
      url,
      method: opts.method || 'GET',
      timestamp: new Date().toISOString(),
    };

    // Log error if debug mode is enabled
    if (config.public?.debug) {
      console.error('useAxios error:', enhancedError);
    }

    throw enhancedError;
  }
};

// Convenience methods for common HTTP methods
useAxios.get = (url: string, opts: any = {}) => useAxios(url, { ...opts, method: 'GET' });
useAxios.post = (url: string, data: any = {}, opts: any = {}) => useAxios(url, { ...opts, method: 'POST', body: data });
useAxios.put = (url: string, data: any = {}, opts: any = {}) => useAxios(url, { ...opts, method: 'PUT', body: data });
useAxios.patch = (url: string, data: any = {}, opts: any = {}) => useAxios(url, { ...opts, method: 'PATCH', body: data });
useAxios.delete = (url: string, opts: any = {}) => useAxios(url, { ...opts, method: 'DELETE' });

export default useAxios;