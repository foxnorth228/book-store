import { authContracts, zodToJsonSchema } from "@org/contracts";

import { accountConfig } from "./account.config";

export const accountLoginReq = {
  $id: accountConfig.schemas.loginReq,
  ...zodToJsonSchema(authContracts.login.body),
};

export const accountLoginRes = {
  $id: accountConfig.schemas.loginRes,
  ...zodToJsonSchema(authContracts.login.response),
};

export const accountSchemas = [accountLoginReq, accountLoginRes];
