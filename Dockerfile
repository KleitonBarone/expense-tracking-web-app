ARG BUN_VERSION=1.1.29
FROM oven/bun:${BUN_VERSION} AS base

WORKDIR /app

ENV NODE_ENV=production

FROM base AS build

RUN apt-get update -qq && apt-get install --no-install-recommends -y

COPY ./backend/bun.lockb ./backend/package.json ./backend/
COPY ./frontend/bun.lockb ./frontend/package.json ./frontend/
RUN cd backend && bun install --ci && cd ../frontend && bun install --ci && cd ..

COPY . .

RUN cd frontend && bun run build && cd ..

FROM base AS deploy

COPY --from=build /app/frontend/dist /app/frontend/dist
COPY --from=build /app/backend /app/backend

EXPOSE 3000

WORKDIR /app/backend

CMD ["bun", "run", "start"]
