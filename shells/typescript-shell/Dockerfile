# Build stage
FROM node:20-alpine AS builder

# Build arg for API URL (Vite embeds at build time)
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/client/package*.json ./packages/client/
COPY packages/shared/package*.json ./packages/shared/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the client app
RUN npm run build --workspace=packages/client

# Production stage - serve static files
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html

# Copy nginx config for SPA routing
RUN echo 'server { \
    listen 3000; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
