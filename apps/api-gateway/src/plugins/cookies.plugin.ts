import cookie from "@fastify/cookie";
import fp from "fastify-plugin";

const cookiePlugin = fp(async (app) => {
  await app.register(cookie, {
    secret: app.config.env.COOKIE_SIGNATURE,
    algorithm: "sha256",
  });
});

export default cookiePlugin;
