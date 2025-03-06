import { createApiUrl, createRequestOptions } from "./instance";
import { handleResponse, handleError } from "./interceptors";
import { RequestOptions } from "../../types/api";

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  try {
    const url = createApiUrl(endpoint);
    const requestOptions = createRequestOptions(options);
    const response = await fetch(url, requestOptions);
    return await handleResponse<T>(response);
  } catch (error) {
    return handleError(error);
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data: any, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: any, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
