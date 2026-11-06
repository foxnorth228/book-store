import { SERVICES_ROUTES } from "@app/routing";
import {
  authContracts,
  AuthLoginAdminReq,
  AuthLoginAdminRes,
  AuthLoginRes,
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
  login(data: AuthLoginAdminReq) {
    return this.httpClient.post<AuthLoginAdminRes>(
      `${authContracts.admin.prefix}${authContracts.admin.login.path}`,
      data,
    );
  },
  refreshSession() {
    return this.httpClient.request<AuthLoginRes>(
      `${authContracts.admin.prefix}${authContracts.admin.session.prefix}${authContracts.admin.session.refresh.path}`,
      {
        method: authContracts.admin.session.refresh.method,
        headers: {
          "Content-Type": "text/plain",
        },
      },
    );
  },
  logout() {
    return this.httpClient.request(
      `${authContracts.admin.prefix}${authContracts.admin.session.prefix}${authContracts.admin.session.logout.path}`,
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
