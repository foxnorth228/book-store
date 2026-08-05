import cookie from "@fastify/cookie";
import fp from "fastify-plugin";

const cookiePlugin = fp(async (app) => {
  await app.register(cookie, {
    secret: app.config.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });
});

export default cookiePlugin;
