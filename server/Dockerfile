FROM node:24-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY server/package.json ./server/

# Installe les dépendances du workspace server
RUN npm ci --workspace=server

COPY server/ ./server/
WORKDIR /app/server
RUN npx esbuild src/server.ts --bundle --platform=node --outfile=dist/index.js --external:better-sqlite3 --minify

FROM node:24-slim AS production
WORKDIR /app
ENV NODE_ENV=production

# Installe uniquement better-sqlite3 et son arbre de dépendances (bindings, prebuild-install, etc.)
RUN npm init -y && npm install better-sqlite3 --omit=dev

COPY --from=builder /app/server/dist/index.js ./dist/

RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 3000
CMD ["node", "dist/index.js"]
