FROM node:22.19.0-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable

ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME

RUN pnpm config set fetch-retries 5
RUN pnpm config set fetch-retry-factor 2
RUN pnpm config set fetch-retry-mintimeout 20000
RUN pnpm config set network-concurrency 5

RUN pnpm config set store-dir /pnpm/store

WORKDIR /app

COPY dist .
COPY prisma ./prisma
COPY prisma.config.ts .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i -r

RUN pnpm prisma:generate

CMD [ "node", "server.js" ]
