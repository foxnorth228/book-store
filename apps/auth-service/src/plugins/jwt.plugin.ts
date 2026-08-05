import { createJwtPlugin } from "@org/fastify-plugins";
import fp from "fastify-plugin";

const jwtPlugin = fp(async (app) => {
  await app.register(
    createJwtPlugin({
      secret: app.config.env.JWT_ACCESS_TOKEN_SECRET,
      sign: {
        expiresIn: app.config.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      },
    }),
  );
});

export default jwtPlugin;
