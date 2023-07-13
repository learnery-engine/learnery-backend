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
WORKDIR /app
COPY --from=builder /app ./
ENTRYPOINT ["pnpm", "run", "start:prod"]
