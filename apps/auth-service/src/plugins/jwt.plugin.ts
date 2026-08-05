import jwt from "@fastify/jwt";
import fp from "fastify-plugin";

const jwtPlugin = fp(async (app) => {
  await app.register(jwt, {
    secret: app.config.env.JWT_ACCESS_TOKEN_SECRET,
    sign: {
      expiresIn: app.config.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    },
  });
});

export default jwtPlugin;
