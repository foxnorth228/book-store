FROM node:22.19.0-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

RUN pnpm config set fetch-retries 5
RUN pnpm config set fetch-retry-factor 2
RUN pnpm config set fetch-retry-mintimeout 20000
RUN pnpm config set network-concurrency 5

RUN pnpm config set store-dir /pnpm/store

WORKDIR /app

COPY dist .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store,sharing=locked pnpm i -r

CMD ["sh", "-c", "node server.js"]
