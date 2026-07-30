import z from "zod";

export const authSchemas = {
  login: {
    body: z.object({
      email: z.email(),
      password: z.string().min(6),
    }),
    response: z.object({
      id: z.string(),
      email: z.email(),
    }),
  },
};
