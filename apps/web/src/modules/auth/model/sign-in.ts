import { AuthLoginReq } from "@org/contracts";

import { AuthApi } from "../api/auth.api";
import { useSessionStore } from "./use-session-store";

export async function signIn(data: AuthLoginReq) {
  const loginRes = await AuthApi.login(data);

  useSessionStore
    .getState()
    .setData({ accessToken: loginRes.data.accessToken, isAuthenticated: true });
}
