# Build stage
FROM node:19 AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN npx prisma generate
RUN pnpm run build

# Deploy stage
FROM node:19-alpine

LABEL maintainer="Hiro <laciferin@gmail.com>"

WORKDIR /app

ENV PORT=8080
ENV NODE_ENV="production"
ENV MODE="prod"
ENV JWT_SECRET=@123
ENV DATABASE_URL=""

ENV ENVFILE=""

EXPOSE $PORT

COPY --from=builder /app ./

RUN echo $envfile > .env

RUN if [ "$ENVFILE" != "" ]; then  \
    echo $ENVFILE > ".env" \
    sed -i 's/ /\n/g' .env \
    ; fi

#CMD ["pnpm","test"] TODO:
#CMD ["pnpm","test:e2e"]
ENTRYPOINT ["pnpm", "run", "start:prod"]
