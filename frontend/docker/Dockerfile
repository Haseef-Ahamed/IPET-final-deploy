# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

RUN ls -la /app/dist

# Serve static stage
FROM nginx:1.25-alpine
# COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8070
CMD ["nginx", "-g", "daemon off;"]
