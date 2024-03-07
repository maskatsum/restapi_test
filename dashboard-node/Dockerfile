FROM node:20-slim AS base
EXPOSE 8000
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
COPY app /app
WORKDIR /app
RUN npm install 
RUN npm run prepare
RUN npm run build

CMD [ "npm", "start" ]
