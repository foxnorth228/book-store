import { HttpAuthClient, HttpClientConfig } from "@org/http";

import { AuthApi } from "../api/auth.api";
import { useSessionStore } from "./use-session-store";

export const createHttpAuthClient = (config: HttpClientConfig) => {
  return new HttpAuthClient(config, {
    getToken: () => useSessionStore.getState().accessToken,
    refreshToken: async () => {
      const response = await AuthApi.refreshTokens();
      useSessionStore.getState().setData({ accessToken: response.data });
    },
  });
};
