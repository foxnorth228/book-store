import fp from "fastify-plugin";
import httpProxy from "@fastify/http-proxy";

const proxyPlugin = fp(async (app) => {
  const { env } = app.config;

  await app.register(httpProxy, {
    upstream: `http://${env.AUTH_HOST}:${env.AUTH_PORT}`,
    prefix: env.AUTH_PATH_PREFIX,
    rewritePrefix: env.AUTH_PATH_PREFIX,
  });

  await app.register(httpProxy, {
    upstream: `http://${env.PROFILE_HOST}:${env.PROFILE_PORT}`,
    prefix: env.PROFILE_PATH_PREFIX,
    rewritePrefix: env.PROFILE_PATH_PREFIX,
  });

  await app.register(httpProxy, {
    upstream: `http://${env.CATALOG_HOST}:${env.CATALOG_PORT}`,
    prefix: env.CATALOG_PATH_PREFIX,
    rewritePrefix: env.CATALOG_PATH_PREFIX,
  });

  await app.register(httpProxy, {
    upstream: `http://${env.NOTIFICATION_HOST}:${env.NOTIFICATION_PORT}`,
    prefix: env.NOTIFICATION_PATH_PREFIX,
    rewritePrefix: env.NOTIFICATION_PATH_PREFIX,
  });
});

export default proxyPlugin;
