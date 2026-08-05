import { HttpClient } from "./HttpClient.js";
import { HttpError } from "./HttpError.js";
import { HttpClientConfig, HttpInterceptor } from "./types.js";

interface AuthProvider {
  getToken: () => string | undefined;
  refreshToken: () => Promise<void>;
}

export class HttpAuthClient extends HttpClient {
  constructor(config: HttpClientConfig, authProvider: AuthProvider) {
    const interceptors: HttpInterceptor[] = [
      {
        onRequest: async (options) => {
          const token = authProvider.getToken();

          return {
            ...options,
            headers: {
              ...options.headers,
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
          };
        },
        onError: async (error, { retryCount, retry }) => {
          if (error instanceof HttpError && error.status === 401 && retryCount < 1) {
            await authProvider.refreshToken();
            return retry();
          }

          throw error;
        },
      },
      ...(config.interceptors ?? []),
    ];

    super({ ...config, interceptors });
  }
}
