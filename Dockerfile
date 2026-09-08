# syntax=docker/dockerfile:1

# ------------------------------------------------------------------------------
# 1. Base stage: Install dependencies and build tools
# ------------------------------------------------------------------------------
FROM node:22-bookworm-slim AS deps
WORKDIR /app

# Install native build tools required for compiling better-sqlite3 if needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install matching pnpm version specified in package.json
RUN npm install -g pnpm@10.28.1

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ------------------------------------------------------------------------------
# 2. Builder stage: Build the Next.js production bundle
# ------------------------------------------------------------------------------
FROM node:22-bookworm-slim AS builder
WORKDIR /app

RUN npm install -g pnpm@10.28.1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN pnpm build

# ------------------------------------------------------------------------------
# 3. Runner stage: Minimal production runtime
# ------------------------------------------------------------------------------
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install curl for health checks (used by Coolify / Docker)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Run as a non-privileged user for security
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 -g nodejs nextjs

# Ensure persistent data directory exists for SQLite
RUN mkdir -p /app/src/data && chown -R nextjs:nodejs /app/src/data

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone build and static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Health check endpoint for Coolify
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/api/courses || exit 1

CMD ["node", "server.js"]
