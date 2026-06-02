FROM node:22.19.0-alpine

RUN corepack enable

WORKDIR /app

COPY dist .
COPY prisma .
COPY prisma.config.ts .

RUN pnpm i -r
RUN pnpm prisma:generate

CMD [ "node", "main.js" ]
