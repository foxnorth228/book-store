import {
  adminUsersListQuerySchema,
  adminUsersListResponseSchema,
  zodToJsonSchema,
} from "@org/contracts";

import { accountConfig } from "./account.config";

export const accountUsersListRes = {
  $id: accountConfig.schemas.usersListRes,
  ...zodToJsonSchema(adminUsersListResponseSchema),
};

export const accountUsersListQuery = {
  $id: accountConfig.schemas.usersListQuery,
  ...zodToJsonSchema(adminUsersListQuerySchema),
};

export const accountSchemas = [accountUsersListRes, accountUsersListQuery];
