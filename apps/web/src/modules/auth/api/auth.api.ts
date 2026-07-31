import { authContracts, AuthLoginReq, AuthRegisterReq } from "@org/contracts";
import { HttpClient } from "@org/http";

import { ForgotPasswordFormData, ResetPasswordFormData } from "../model/reset-password.schema";

export const AuthApi = {
  httpClient: new HttpClient({ baseUrl: "/api" }),
  login(data: AuthLoginReq) {
    return this.httpClient.post(authContracts.login.path, data);
  },
  register(data: AuthRegisterReq) {
    return this.httpClient.post("/auth/register", data);
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
