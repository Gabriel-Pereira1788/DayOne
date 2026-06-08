import type { HttpClientImpl, HttpResponse } from "../../types";

export const inAppHttpClient: HttpClientImpl = {
  async get<T>(_url: string): Promise<HttpResponse<T>> {
    return { data: {} as T, status: 200 };
  },
  async post<T>(_url: string, _data?: unknown): Promise<HttpResponse<T>> {
    return { data: {} as T, status: 201 };
  },
  async patch<T>(_url: string, _data?: unknown): Promise<HttpResponse<T>> {
    return { data: {} as T, status: 200 };
  },
  async delete<T>(_url: string): Promise<HttpResponse<T>> {
    return { data: {} as T, status: 204 };
  },
};
