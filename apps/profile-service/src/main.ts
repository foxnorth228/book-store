import { createLogger, loadServerEnv } from "@org/shared";
import Fastify from "fastify";

import { app } from "./app";

const envConfig = loadServerEnv("apps/profile-service");

const server = Fastify({
  loggerInstance: createLogger({
    level: envConfig.LOG_LEVEL,
    pretty: envConfig.NODE_ENV === "development",
  }),
});

server.register(app);

server.listen({ port: envConfig.PORT, host: envConfig.HOST }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${envConfig.HOST}:${envConfig.PORT}`);
  }
});
