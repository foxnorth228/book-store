import { createLogger, EnvServerSchema, loadServerEnv } from "@org/shared";

import { buildApp } from "./app";
import { PATH_TO_PROJECT } from "./config/config";

export type ServerOptions = ReturnType<typeof getServerOptions>;

function getServerOptions<T extends EnvServerSchema>(config: T | EnvServerSchema) {
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

  const envConfig = loadServerEnv(undefined, PATH_TO_PROJECT);
  const serverOptions = getServerOptions(envConfig);

  const app = await buildApp(serverOptions);

  app.listen({ port: envConfig.PORT, host: envConfig.HOST }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    } else {
      console.log(`[ ready ] http://${envConfig.HOST}:${envConfig.PORT}`);
    }
  });
}

startServer();
