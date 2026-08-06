export interface HttpClientConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
  interceptors?: HttpInterceptor[];
}

export interface RequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined>;
}

export interface HttpResponse<T> {
  ok: boolean;
  data: T;
  status: number;
  headers: Headers;
}

export interface HttpInterceptor {
  onRequest?(options: RequestOptions): Promise<RequestOptions> | RequestOptions;
  onResponse?(response: Response): Promise<Response> | Response;
  onError?(
    error: unknown,
    context: {
      retryCount: number;
      retry: () => Promise<HttpResponse<unknown>>;
    },
  ): Promise<HttpResponse<unknown> | void>;
}
