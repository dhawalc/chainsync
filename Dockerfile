# ---------------------- BUILDER STAGE ----------------------
    FROM node:18-alpine AS base

    # Install dependencies only when needed
    FROM base AS deps
    RUN apk add --no-cache libc6-compat
    WORKDIR /app
    
    # Install dependencies based on the preferred package manager
    COPY package.json package-lock.json* ./
    RUN npm ci --legacy-peer-deps
    
    # Rebuild the source code only when needed
    FROM base AS builder
    WORKDIR /app
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    # Disable Next.js telemetry
    ENV NEXT_TELEMETRY_DISABLED=1
    
    # Generate Prisma client (ensure your Prisma schema is in ./prisma/)
    RUN npx prisma generate
    
    # Build the Next.js app
    RUN npm run build
    
    # ---------------------- RUNNER STAGE (PRODUCTION IMAGE) ----------------------
    FROM base AS runner
    WORKDIR /app
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    
    # Create a system group and user for running the app
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs
    
    # Copy public files
    COPY --from=builder /app/public ./public
    
    # Set the correct permission for prerender cache
    RUN mkdir .next
    RUN chown nextjs:nodejs .next
    
    # Use Next.js output file tracing to reduce image size
    # Copy the standalone output and static assets
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    
    # Copy Prisma files (if needed at runtime)
    COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
    COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
    
    # Switch to non-root user
    USER nextjs
    
    # Set environment variables
    ENV PORT=8080
    ENV HOSTNAME="0.0.0.0"
    
    # Run database migrations (if any) and start the application
    CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
    