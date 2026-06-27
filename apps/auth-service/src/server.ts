import { createLogger, loadServerEnv } from "@org/shared";

import { buildApp } from "./app";
import { AuthServiceEnvConfig, authServiceEnvSchema, PATH_TO_PROJECT } from "./config/config";

export type ServerOptions = ReturnType<typeof getServerOptions>;

function getServerOptions(config: AuthServiceEnvConfig) {
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

  const envConfig = loadServerEnv(authServiceEnvSchema, PATH_TO_PROJECT);
  const serverOptions = getServerOptions(envConfig);

  const app = await buildApp(serverOptions);

  console.log(app.printRoutes());

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
