FROM node:20.2.0-bullseye-slim AS build
WORKDIR /usr/app
COPY . . 
RUN npm i
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/app/dist/frontend /usr/share/nginx/html



