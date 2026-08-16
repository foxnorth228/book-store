import { authContracts, AuthLoginReq, AuthLoginRes, AuthRegisterReq } from "@org/contracts";
import { HttpClient } from "@org/http";

import { ForgotPasswordFormData, ResetPasswordFormData } from "../model/reset-password.schema";

export const AuthApi = {
  httpClient: new HttpClient({ baseUrl: import.meta.env.VITE_AUTH_SERVICE_PREFIX }),
  login(data: AuthLoginReq) {
    return this.httpClient.post<AuthLoginRes>(authContracts.login.path, data);
  },
  register(data: AuthRegisterReq) {
    return this.httpClient.post(authContracts.register.path, data);
  },
  refreshSession() {
    return this.httpClient.request<AuthLoginRes>(
      `${authContracts.session.prefix}${authContracts.session.refresh.path}`,
      {
        method: authContracts.session.refresh.method,
        headers: {
          "Content-Type": "text/plain",
        },
      },
    );
  },
  logout() {
    return this.httpClient.request(
      `${authContracts.session.prefix}${authContracts.session.logout.path}`,
      {
        method: authContracts.session.logout.method,
      },
    );
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
