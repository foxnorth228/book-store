import { z } from "zod";

export const profileSchemas = {
  myProfile: {
    response: z.object({
      firstName: z.string(),
      surname: z.string(),
      nickname: z.string(),
    }),
  },
};

export const profileAdminUserUpdatedSchema = z.object({
  accountId: z.uuid(),
  firstName: z.string().nullable(),
  surname: z.string().nullable(),
  nickname: z.string(),
  profileUpdatedAt: z.coerce.date(),
});
