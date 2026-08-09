import { AuthJwtPayloadUserDto, AuthLoginReq } from "@org/contracts";
import { jwtDecode } from "jwt-decode";

import { AuthApi } from "../api/auth.api";
import { useSessionStore } from "./use-session-store";

export async function signIn(data: AuthLoginReq) {
  const loginRes = await AuthApi.login(data);

  const accessTokenData = jwtDecode<AuthJwtPayloadUserDto>(loginRes.data.accessToken);

  useSessionStore.getState().setData({
    accessToken: loginRes.data.accessToken,
    isAuthenticated: true,
    user: { id: accessTokenData.sub, roles: accessTokenData.roles },
  });
}
