# ---------------------- BUILDER STAGE ----------------------
FROM node:18-alpine AS builder

# Install required system dependencies
RUN apk add --no-cache python3 make g++

# Set the working directory
WORKDIR /app

# Define build arguments for non-sensitive data
ARG OPENAI_API_KEY
ARG FRONTEND_URL
ARG SNOWFLAKE_ACCOUNT
ARG SNOWFLAKE_USERNAME
ARG SNOWFLAKE_DATABASE
ARG SNOWFLAKE_SCHEMA
ARG SNOWFLAKE_WAREHOUSE
ARG SNOWFLAKE_ROLE
ARG SNOWFLAKE_REGION

# Set environment variables for build time
ENV OPENAI_API_KEY=$OPENAI_API_KEY
ENV FRONTEND_URL=$FRONTEND_URL
ENV SNOWFLAKE_ACCOUNT=$SNOWFLAKE_ACCOUNT
ENV SNOWFLAKE_USERNAME=$SNOWFLAKE_USERNAME
ENV SNOWFLAKE_DATABASE=$SNOWFLAKE_DATABASE
ENV SNOWFLAKE_SCHEMA=$SNOWFLAKE_SCHEMA
ENV SNOWFLAKE_WAREHOUSE=$SNOWFLAKE_WAREHOUSE
ENV SNOWFLAKE_ROLE=$SNOWFLAKE_ROLE
ENV SNOWFLAKE_REGION=$SNOWFLAKE_REGION
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies including devDependencies for build
RUN npm install --legacy-peer-deps --include=dev

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Clean up dev dependencies
RUN npm prune --production

# ---------------------- RUNNER STAGE ----------------------
FROM node:18-alpine AS runner

# Install required system dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Set production environment variables
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
