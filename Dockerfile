# ---------------------- BUILDER STAGE ----------------------
FROM node:18-alpine AS builder

# Install required system dependencies
RUN apk add --no-cache python3 make g++

# Set the working directory
WORKDIR /app

# Define build arguments for non-sensitive data
ARG OPENAI_API_KEY
ARG FRONTEND_URL

# Set environment variables for build time
ENV OPENAI_API_KEY=$OPENAI_API_KEY
ENV FRONTEND_URL=$FRONTEND_URL
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with proper flags and error handling
RUN npm install --legacy-peer-deps && \
    npm install -g sharp && \
    npm link sharp && \
    npm audit fix --force || true

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app with explicit sharp installation
RUN npm install sharp --legacy-peer-deps && \
    npm run build

# ---------------------- RUNNER STAGE ----------------------
FROM node:18-alpine AS runner

# Install required system dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Define runtime environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
