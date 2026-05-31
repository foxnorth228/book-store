FROM node:22.19.0-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

RUN corepack enable

WORKDIR /app

COPY dist .

RUN pnpm ci
RUN pnpm install:shared

CMD [ "node", "main.js" ]
