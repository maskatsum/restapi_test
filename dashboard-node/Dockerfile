FROM node:20-slim AS base
EXPOSE 80
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt update && apt install -y curl
RUN corepack enable

WORKDIR /app
COPY app/package.json .
RUN pnpm i

COPY app/ /app/

RUN mkdir -p /app
RUN npm run prepare
RUN npm run build

CMD [ "npm", "start" ]
