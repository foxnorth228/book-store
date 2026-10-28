import { HttpAuthClient, HttpClientConfig } from "@org/http";

import { restoreSession } from "./restore-session";
import { useSessionStore } from "./use-session-store";

export const createHttpAuthClient = (config: HttpClientConfig) => {
  return new HttpAuthClient(config, {
    getToken: () => useSessionStore.getState().accessToken,
    refreshToken: async () => {
      await restoreSession();
    },
  });
};
