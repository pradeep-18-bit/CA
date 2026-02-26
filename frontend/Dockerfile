# Stage 1: Build
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# ✅ Copy your custom nginx config to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React files
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
