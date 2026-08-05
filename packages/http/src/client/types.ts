export interface HttpClientConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
}

export interface RequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined>;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}
