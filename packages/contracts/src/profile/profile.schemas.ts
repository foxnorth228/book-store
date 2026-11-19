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
  firstName: z.string().optional(),
  surname: z.string().optional(),
  nickname: z.string(),
  profileUpdatedAt: z.coerce.date(),
});
