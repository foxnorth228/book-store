import jwt, { FastifyJWTOptions } from "@fastify/jwt";
import { authJwtPayloadSchema, AuthJwtPayloadUserDto } from "@org/contracts";
import { UnauthorizedError } from "@org/errors";
import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export const createJwtPlugin = (options: FastifyJWTOptions) => {
  return fp(async (app) => {
    await app.register(jwt, {
      ...options,
    });

    app.decorate("authenticate", async function (request: FastifyRequest) {
      try {
        await request.jwtVerify();
        authJwtPayloadSchema.parse(request.user);
      } catch (err) {
        request.log.debug({ err }, "authentication failed");
        throw new UnauthorizedError("Unauthorized");
      }
    });
  });
};

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: AuthJwtPayloadUserDto;
    user: AuthJwtPayloadUserDto;
  }
}
