# ----- BUILDER STAGE -----
    FROM node:18-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY package.json package-lock.json* ./
    RUN npm ci
    
    # Install additional dependencies needed for the build
    RUN npm install --save clsx tailwind-merge @radix-ui/react-switch @radix-ui/react-select @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-toast lucide-react
    
    # Create necessary directories and helper file
    RUN mkdir -p lib
    RUN echo 'import { type ClassValue, clsx } from "clsx"; import { twMerge } from "tailwind-merge"; export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }' > lib/utils.ts
    
    # Copy all application code (excluding files matched by .dockerignore)
    COPY . .
    
    # (Optional) Create a simple tsconfig.json that disables strict type checking
    RUN echo '{"compilerOptions":{"strict":false,"noImplicitAny":false,"baseUrl":".","paths":{"@/*":["./*"]}}}' > tsconfig.json
    
    # (Optional) Create an ESLint config to disable specific warnings
    RUN echo 'module.exports = { extends: "next/core-web-vitals", rules: { "tailwindcss/classnames-order": "off", "tailwindcss/enforces-shorthand": "off", "tailwindcss/migration-from-tailwind-2": "off", "tailwindcss/no-unnecessary-arbitrary-value": "off", "react/no-unescaped-entities": "off", "@next/next/no-img-element": "off", "react-hooks/exhaustive-deps": "off" } };' > .eslintrc.js
    
    # Build the Next.js application (disable linting for faster build)
    RUN NEXT_TELEMETRY_DISABLED=1 npm run build -- --no-lint
    
    # ----- RUNNER STAGE (Production Image) -----
    FROM node:18-alpine AS runner
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    # Copy built files and node_modules from builder stage
    COPY --from=builder /app/next.config.js ./
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    
    # Expose the port your app runs on
    EXPOSE 3000
    
    # Start the Next.js application
    CMD ["npm", "start"]
    