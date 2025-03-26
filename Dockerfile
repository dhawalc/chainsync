# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Install required packages
RUN apk add --no-cache vips-dev

# Install sharp package
RUN npm install --platform=linuxmusl --arch=x64 sharp

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create cache directory and set permissions
RUN mkdir -p .next/cache && chown -R node:node .next

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Switch to non-root user
USER node

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
    