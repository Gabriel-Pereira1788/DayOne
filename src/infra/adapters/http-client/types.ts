export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
}

export interface HttpClientImpl {
  get<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>>;
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>>;
  delete<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;
}
