import { z } from "zod";
import { adminUsersListQuerySchema, adminUsersListResponseSchema } from "./admin.schema.js";

export type AdminUsersListQuery = z.infer<typeof adminUsersListQuerySchema>;
export type adminUsersListRes = z.infer<typeof adminUsersListResponseSchema>;
