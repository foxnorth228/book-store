import { HttpClient } from "@org/http";

import { ForgotPasswordFormData, ResetPasswordFormData } from "../model/reset-password.schema";

export const AuthApi = {
  httpClient: new HttpClient({ baseUrl: "" }),
  login(data: LoginRequest) {
    return this.httpClient.post("/api/auth/login", data);
  },

  register(data: RegisterRequest) {
    return this.httpClient.post("/api/auth/register", data);
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
