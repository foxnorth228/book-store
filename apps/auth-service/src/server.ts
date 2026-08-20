import { createLogger } from "@org/shared";

import { buildApp } from "./app";
import { PATH_TO_PROJECT, serviceEnvConfig, ServiceEnvConfig } from "./config/config";

export type ServerOptions = ReturnType<typeof getServerOptions>;

function getServerOptions(config: ServiceEnvConfig) {
  return {
    fastifyOptions: {
      loggerInstance: createLogger({
        level: config.LOG_LEVEL,
        pretty: config.NODE_ENV === "development",
      }),
    },
    config: { pathToProject: PATH_TO_PROJECT, env: config },
  };
}

async function startServer() {
  console.log(`[ start ] starting server`);

  const serverOptions = getServerOptions(serviceEnvConfig);

  const app = await buildApp(serverOptions);

  app.listen({ port: serviceEnvConfig.PORT, host: serviceEnvConfig.HOST }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    } else {
      console.log(`[ ready ] http://${serviceEnvConfig.HOST}:${serviceEnvConfig.PORT}`);
    }
  });
}

startServer();
