import { hashPassword } from "@org/shared";
import { FastifyInstance } from "fastify";

export const accountService = {
  async createAccount(
    module: FastifyInstance,
    { email, password }: { email: string; password: string },
  ) {
    const isUserExists = await module.prisma.user.findUnique({
      where: { email },
    });

    if (isUserExists) {
      throw new Error("User already exists");
    }

    const user = await module.prisma.user.create({
      data: {
        email,
        passwordHash: await hashPassword(password),
      },
    });

    return user;
  },
};
