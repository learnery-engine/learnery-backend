# Build stage
FROM node:19 AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN sed -i '/provider = "prisma-client-js"/a \ \ binaryTargets = ["native", "linux-musl-openssl-3.0.x"]' prisma/schema.prisma
RUN npx prisma generate
RUN pnpm run build

# Deploy stage
FROM node:19-alpine

LABEL maintainer="Hiro <laciferin@gmail.com>"
#only required for railway deployment
ARG RAILWAY_ENVIRONMENT=""
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT

WORKDIR /app

RUN if [ "$RAILWAY_ENVIRONMENT" != "" ]; then echo $RAILWAY_ENVIRONMENT > ".env"; fi

ENV PORT=8080
ENV NODE_ENV="production"
ENV MODE="prod"
ENV DATABASE_URL=""
ENV JWT_SECRET="Hiro@laciferin"

EXPOSE $PORT

COPY --from=builder /app ./

RUN npm install -g pnpm


CMD ["pnpm","test","&&","pnpm","test:e2e" ]


ENTRYPOINT ["npx","pnpm", "run", "start:prod"]

