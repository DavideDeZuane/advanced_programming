FROM node:alpine AS build
WORKDIR /app
COPY . . 
RUN npm install && npm run build

FROM nginx:alpine AS prod
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/frontend /usr/share/nginx/html



