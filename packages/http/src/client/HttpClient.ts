import { buildUrl } from "../utils/build-url.js";
import { parseResponse } from "../utils/parse-response.js";
import { HttpError } from "./HttpError.js";
import { HttpClientConfig, HttpInterceptor, HttpResponse, RequestOptions } from "./types.js";

export class HttpClient {
  private readonly baseUrl?: string;
  private readonly headers: Record<string, string>;
  private readonly interceptors: HttpInterceptor[];

  constructor(config: HttpClientConfig = {}) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers ?? {};
    this.interceptors = config.interceptors ?? [];
  }

  async request<T>(url: string, options: RequestOptions, retryCount = 0): Promise<HttpResponse<T>> {
    let requestOptions = options;

    for (const interceptor of this.interceptors) {
      requestOptions = (await interceptor.onRequest?.(requestOptions)) ?? requestOptions;
    }

    try {
      let response = await fetch(buildUrl(this.baseUrl, url, requestOptions.query), {
        ...requestOptions,
        headers: {
          "Content-Type": "application/json",
          ...this.headers,
          ...requestOptions.headers,
        },
      });

      const data = (await parseResponse(response)) as T;

      for (const interceptor of this.interceptors) {
        response = (await interceptor.onResponse?.(response)) ?? response;
      }

      if (!response.ok) {
        throw new HttpError(data, response.status, response.headers);
      }

      return {
        ok: response.ok,
        data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      const retry = () => this.request<T>(url, options, retryCount + 1);

      for (const interceptor of this.interceptors) {
        const result = await interceptor.onError?.(error, { retryCount, retry });

        if (result !== undefined) {
          return result as HttpResponse<T>;
        }
      }

      throw error;
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: "GET",
    });
  }

  async post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: "DELETE",
    });
  }
}
