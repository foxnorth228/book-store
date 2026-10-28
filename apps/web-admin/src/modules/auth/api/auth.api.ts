import { SERVICES_ROUTES } from "@app/routing";
import {
  authContracts,
  AuthLoginReq,
  AuthLoginRes,
  AuthRegisterReq,
  VerificationRequestOtpCodeReq,
  VerificationRequestOtpCodeRes,
  VerificationUpdatePasswordReq,
  VerificationUpdatePasswordRes,
  VerificationVerifyOtpCodeReq,
  VerificationVerifyOtpCodeRes,
} from "@org/contracts";
import { HttpClient } from "@org/http";

export const AuthApi = {
  httpClient: new HttpClient({ baseUrl: SERVICES_ROUTES.AUTH }),
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
  async forgotPassword(data: VerificationRequestOtpCodeReq) {
    return this.httpClient.post<VerificationRequestOtpCodeRes>(
      `${authContracts.passwordReset.prefix}${authContracts.passwordReset.requestOtpCode.path}`,
      data,
    );
  },
  async verifyOtpCode(data: VerificationVerifyOtpCodeReq) {
    return this.httpClient.post<VerificationVerifyOtpCodeRes>(
      `${authContracts.passwordReset.prefix}${authContracts.passwordReset.verifyOtpCode.path}`,
      data,
    );
  },
  async updatePassword(data: VerificationUpdatePasswordReq) {
    return this.httpClient.put<VerificationUpdatePasswordRes>(
      `${authContracts.passwordReset.prefix}${authContracts.passwordReset.updatePassword.path}`,
      data,
    );
  },
};
