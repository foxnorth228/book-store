import { loadServerEnv } from "@org/shared";

const PATH_TO_PROJECT = "apps/auth-service";

export const globalConfig = {
  pathToProject: PATH_TO_PROJECT,
  env: loadServerEnv(PATH_TO_PROJECT),
};
