import axios, { type AxiosInstance } from "axios";
import type { HttpClientImpl, HttpResponse, RequestConfig } from "../../types";

function createAxiosImpl(baseURL: string): HttpClientImpl {
  const client: AxiosInstance = axios.create({ baseURL });

  async function get<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    const res = await client.get<T>(url, config);
    return { data: res.data, status: res.status };
  }

  async function post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>> {
    const res = await client.post<T>(url, data, config);
    return { data: res.data, status: res.status };
  }

  async function patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>> {
    const res = await client.patch<T>(url, data, config);
    return { data: res.data, status: res.status };
  }

  async function deleteFn<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    const res = await client.delete<T>(url, config);
    return { data: res.data, status: res.status };
  }

  return { get, post, patch, delete: deleteFn };
}

export const axiosHttpClientImpl = createAxiosImpl(
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "",
);
