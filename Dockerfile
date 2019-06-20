# Сборка (build stage)
FROM node:lts as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Продакшн (production-stage)
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
#RUN cp -r /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
