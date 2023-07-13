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

WORKDIR /app

ENV PORT=8080
ENV NODE_ENV="production"
ENV MODE="prod"
ENV DATABASE_URL
ENV JWT_SECRET



ENV ENVFILE=""

EXPOSE $PORT

COPY --from=builder /app ./

RUN echo $envfile > .env

RUN if [ "$ENVFILE" != "" ]; then  \
    echo $ENVFILE > ".env" \
    sed -i 's/ /\n/g' .env \
    source .env \
    ; fi
RUN npm install -g pnpm

CMD ["pnpm","test"]
CMD ["pnpm","test:e2e"]
ENTRYPOINT ["npx","pnpm", "run", "start:prod"]

