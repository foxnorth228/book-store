import { AuthJwtPayloadUserDto } from "@org/contracts";
import { AppError } from "@org/errors";
import { jwtDecode } from "jwt-decode";

import { AuthApi } from "../api/auth.api";
import { useSessionStore } from "./use-session-store";

export async function restoreSession() {
  try {
    const response = await AuthApi.refreshSession();

    const accessTokenData = jwtDecode<AuthJwtPayloadUserDto>(response.data.accessToken);

    useSessionStore.getState().setData({
      accessToken: response.data.accessToken,
      isAuthenticated: true,
      user: { id: accessTokenData.sub, roles: accessTokenData.roles },
    });
  } catch (e) {
    if (e instanceof AppError && e.code !== 401) {
      console.error(e);
    }
    useSessionStore.getState().setData({ accessToken: undefined, isAuthenticated: false });
  } finally {
    useSessionStore.getState().setData({ isSessionRestored: true });
  }
}
