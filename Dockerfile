# syntax=docker/dockerfile:1

# --- Build Stage ---
FROM node:18-alpine AS builder
WORKDIR /app
# Install dependencies
COPY package*.json ./
RUN npm install --production=false
# Copy source and build
COPY . .
RUN npm run build

# --- Production Stage ---
FROM nginx:stable-alpine
# Copy static files from build
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port
EXPOSE 80
# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
