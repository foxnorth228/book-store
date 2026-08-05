import { buildUrl } from "../utils/build-url.js";
import { HttpClientConfig, RequestOptions } from "./types.js";

export class HttpClient {
  private readonly baseUrl?: string;
  private readonly headers: Record<string, string>;

  constructor(config: HttpClientConfig = {}) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers ?? {};
  }

  private async request<T>(url: string, options: RequestOptions): Promise<T> {
    const response = await fetch(buildUrl(this.baseUrl, url, options.query), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
        ...options.headers,
      },
    });

    const data = (await response.json().catch(() => null)) as T;

    if (!response.ok) {
      throw new Error();
    }

    return data;
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "GET",
    });
  }

  async post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "DELETE",
    });
  }
}
