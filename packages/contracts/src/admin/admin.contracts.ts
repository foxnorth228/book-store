import { adminRoutes } from "./admin.routes.js";
import { adminUsersListQuerySchema, adminUsersListResponseSchema } from "./admin.schema.js";

export const adminContracts = {
  usersList: {
    method: "GET",
    path: adminRoutes.usersList,
    query: adminUsersListQuerySchema,
    response: adminUsersListResponseSchema,
  },
};
