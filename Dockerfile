FROM node:19-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN pnpm install

COPY . /app

RUN pnpm build
