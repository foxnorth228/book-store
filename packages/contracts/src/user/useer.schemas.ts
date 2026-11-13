import { TableQuerySchema, TableResponseSchema } from "../table/index.js";
import { z } from "zod";

export const AdminUsersQuerySchema = TableQuerySchema;

export const AdminUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  roles: z.array(z.string()),
  emailVerifiedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
});

export const AdminUsersResponseSchema = TableResponseSchema(AdminUserSchema);
