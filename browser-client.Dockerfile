# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
# start -- for arm64
# FROM --platform=linux/arm64 node:18-alpine3.18 AS builder
# end -- for arm64
# start -- for x86
FROM node:18-alpine3.18 AS builder
# end -- for x86
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN npm i && npm run build

# nginx state for serving content
# start -- for arm64
# FROM --platform=linux/arm64 nginx:alpine
# end -- for arm64
# start -- for x86
FROM nginx:alpine
# end -- for x86
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist/browser-client .
LABEL author="DVermaak"
LABEL description="browser-client"
LABEL version="1.0"
EXPOSE 4200
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]