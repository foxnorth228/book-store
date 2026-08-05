import { createJwtPlugin } from "@org/fastify-plugins";
import fp from "fastify-plugin";

const jwtPlugin = fp(async (app) => {
  await app.register(
    createJwtPlugin({
      secret: {
        public: app.config.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
        private: app.config.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
      },
      sign: {
        expiresIn: app.config.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      },
    }),
  );
});

export default jwtPlugin;
