FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npx tsc
CMD [ "node", "./build/app.js" ]