import { authContracts, AuthLoginReq, AuthRegisterReq } from "@org/contracts";
import { HttpClient } from "@org/http";

import { ForgotPasswordFormData, ResetPasswordFormData } from "../model/reset-password.schema";

export const AuthApi = {
  httpClient: new HttpClient({ baseUrl: import.meta.env.VITE_AUTH_SERVICE_PREFIX }),
  login(data: AuthLoginReq) {
    return this.httpClient.post(authContracts.login.path, data);
  },
  register(data: AuthRegisterReq) {
    return this.httpClient.post(authContracts.register.path, data);
  },
  refreshTokens() {
    return this.httpClient.get<string>("");
  },
  async forgotPassword(data: ForgotPasswordFormData) {
    return this.httpClient.post("/auth/password/reset-request", data);
  },
  async resetPassword(
    data: ResetPasswordFormData & {
      token: string;
    },
  ) {
    return this.httpClient.post("/api/auth/password/reset", data);
  },
};
