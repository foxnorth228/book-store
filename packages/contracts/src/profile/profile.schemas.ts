import { languageSchema } from "@org/localization";
import { z } from "zod";

export const profileSchemas = {
  myProfile: {
    response: z.object({
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
      nickname: z.string(),
      language: languageSchema,
    }),
  },
};
