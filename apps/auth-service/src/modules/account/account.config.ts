export const accountConfig = {
  repositoryName: "accountRepository",
  serviceName: "accountService",
  controllerName: "accountController",
  controllerAdminName: "accountAdminController",
  schemas: {
    loginReq: "loginSchemaReq",
    loginRes: "loginSchemaRes",
    registerReq: "registerSchemaReq",
    registerRes: "registerSchemaRes",
    sessionRefreshRes: "sessionRefreshRes",
    loginAdminReq: "loginAdminReq",
    loginAdminRes: "loginAdminRes",
    sessionRefreshAdminRes: "sessionRefreshAdminRes",
  },
  tags: {
    account: "Account",
    admin: "Admin",
  },
  refreshTokenName: "refreshToken",
};
