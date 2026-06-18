import { createLogger } from "@org/shared";
import Fastify from "fastify";

import { app } from "./app";
import { globalConfig } from "./config/config";

const server = Fastify({
  loggerInstance: createLogger({
    level: globalConfig.env.LOG_LEVEL,
    pretty: globalConfig.env.NODE_ENV === "development",
  }),
});

server.register(app, { prefix: globalConfig.env.PATH_PREFIX });

server.listen({ port: globalConfig.env.PORT, host: globalConfig.env.HOST }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${globalConfig.env.HOST}:${globalConfig.env.PORT}`);
  }
});
