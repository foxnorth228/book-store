FROM node:22.19.0-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# needs for config zod-validation
ENV DB_USER=""
ENV DB_PASSWORD=""
ENV DB_NAME=""

RUN pnpm config set fetch-retries 5
RUN pnpm config set fetch-retry-factor 2
RUN pnpm config set fetch-retry-mintimeout 20000
RUN pnpm config set network-concurrency 5

RUN pnpm config set store-dir /pnpm/store

WORKDIR /app

COPY dist .
COPY prisma ./prisma
COPY prisma.config.ts .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store,sharing=locked pnpm i -r

RUN pnpm prisma:generate

CMD ["sh", "-c", "pnpm run prisma:deploy && node server.js"]
