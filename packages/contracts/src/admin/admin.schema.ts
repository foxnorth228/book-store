import { z } from "zod";
import { TablePaginationSchema, TableResponseSchema } from "../table/table.schemas.js";

export const adminUsersListQuerySchema = TablePaginationSchema.extend({});

export const adminUsersListResponseSchema = TableResponseSchema(
  z.object({
    accountId: z.uuid(),
    email: z.email().nullable(),
    emailVerifiedAt: z.iso.datetime().nullable(),
    accountCreatedAt: z.iso.datetime().nullable(),
    firstName: z.string().nullable(),
    surname: z.string().nullable(),
    nickname: z.string().nullable(),
  }),
);
